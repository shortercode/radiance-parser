import { parse_type_pattern } from './type_pattern';
import { scan } from '../scanner/scanner';
import { create_parser_context } from './parser_context';
import type { TypePattern } from './type_pattern.type';

function simple_parse_type (source: string): TypePattern {
	const tokens = scan(source);
	const ctx = create_parser_context(tokens);
	return parse_type_pattern(ctx);
}

describe('type parsing', () => {
	test('empty input', () => {
		expect(() => simple_parse_type('')).toThrow('Unexpected end of input.');
	});
	test('void function', () => {
		const type = simple_parse_type('() -> void');
		expect(type).toStrictEqual({
			type: 'function_type',
			name: '(unknown)',
			parameters: [],
			result: {
				type: 'class_type',
				name: 'void'
			}
		});
	});
	test('simple function', () => {
		const type = simple_parse_type('(i32) -> i32');
		expect(type).toStrictEqual({
			type: 'function_type',
			name: '(unknown)',
			parameters: [
				{
					name: '0',
					type_pattern: {
						type: 'class_type',
						name: 'i32'
					}
				}
			],
			result: {
				type: 'class_type',
				name: 'i32'
			}
		});
	});
	test('parse basic class', () => {
		const type = simple_parse_type('void');
		expect(type).toStrictEqual({
			type: 'class_type',
			name: 'void'
		});
	});
	test('parse basic tuple', () => {
		const type = simple_parse_type('(void, void)');

		expect(type).toStrictEqual({
			type: 'tuple_type',
			subtypes: [
				{
					type: 'class_type',
					name: 'void'
				},
				{
					type: 'class_type',
					name: 'void'
				}
			]
		});
	});
	test('parse basic unsized array', () => {
		const type = simple_parse_type('void[]');
		expect(type).toStrictEqual({
			type: 'array_type',
			subtype: {
				type: 'class_type',
				name: 'void'
			},
			count: -1
		});
	});
	test('parse basic sized array', () => {
		const type = simple_parse_type('void[42]');
		expect(type).toStrictEqual({
			type: 'array_type',
			subtype: {
				type: 'class_type',
				name: 'void'
			},
			count: 42
		});
	});
	test('parse nested tuple', () => {
		const type = simple_parse_type('((void, void), void)');
		expect(type).toStrictEqual({
			type: 'tuple_type',
			subtypes: [
				{
					type: 'tuple_type',
					subtypes: [
						{
							type: 'class_type',
							name: 'void'
						},
						{
							type: 'class_type',
							name: 'void'
						}
					]
				},
				{
					type: 'class_type',
					name: 'void'
				}
			]
		});
	});
	test('parse unsized tuple array', () => {
		const type = simple_parse_type('(void, void)[]');
		expect(type).toStrictEqual({
			type: 'array_type',
			subtype: {
				type: 'tuple_type',
				subtypes: [
					{
						type: 'class_type',
						name: 'void'
					},
					{
						type: 'class_type',
						name: 'void'
					}
				]
			},
			count: -1
		});
	});
	test('parse unsized array of array', () => {
		const type = simple_parse_type('void[][]');
		expect(type).toStrictEqual({
			type: 'array_type',
			subtype: {
				type: 'array_type',
				subtype: { type: 'class_type', name: 'void' },
				count: -1
			},
			count: -1
		});
	});
	test('parse empty tuple', () => {
		const type = simple_parse_type('()');
		expect(type).toStrictEqual({
			type: 'tuple_type',
			subtypes: []
		});
	});
	test('parse array floating point size', () => {
		expect(() => simple_parse_type('void[1.1]')).toThrowError('Invalid array length 1.1');
	});
	test('parse enum variant', () => {
		expect(simple_parse_type('type.variant')).toStrictEqual({
			type: 'member_type',
			object: {
				type: 'class_type',
				name: 'type'
			},
			member: 'variant'
		});
	});
	test('parse generic single type', () => {
		expect(simple_parse_type('Vec3:<f32>')).toStrictEqual({
			type: 'generic_type',
			object: {
				type: 'class_type',
				name: 'Vec3'
			},
			subtypes: [
				{
					type: 'class_type',
					name: 'f32'
				}
			]
		});
	});
	test('parse generic multiple type', () => {
		expect(simple_parse_type('Vec3:<f32, i32, void>')).toStrictEqual({
			type: 'generic_type',
			object: {
				type: 'class_type',
				name: 'Vec3'
			},
			subtypes: [
				{
					type: 'class_type',
					name: 'f32'
				},
				{
					type: 'class_type',
					name: 'i32'
				},
				{
					type: 'class_type',
					name: 'void'
				}
			]
		});
	});
	test('parse generic no type', () => {
		expect(simple_parse_type('Vec3:<>')).toStrictEqual({
			type: 'generic_type',
			object: {
				type: 'class_type',
				name: 'Vec3'
			},
			subtypes: []
		});
	});
	test('parse variant generic', () => {
		expect(simple_parse_type('enum.type:<T>')).toStrictEqual({
			type: 'generic_type',
			object: {
				type: 'member_type',
				object: {
					type: 'class_type',
					name: 'enum'
				},
				member: 'type'
			},
			subtypes: [{
				type: 'class_type',
				name: 'T'
			}]
		});
	});
	test('parse generic nested type', () => {
		expect(simple_parse_type('Vec:<Map:<K, V> >')).toStrictEqual({
			type: 'generic_type',
			object: {
				type: 'class_type',
				name: 'Vec'
			},
			subtypes: [{
				type: 'generic_type',
				object: {
					type: 'class_type',
					name: 'Map'
				},
				subtypes: [
					{
						type: 'class_type',
						name: 'K'
					},
					{
						type: 'class_type',
						name: 'V'
					}
				]
			}]
		});
	});
});