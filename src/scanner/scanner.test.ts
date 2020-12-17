import { create_scanner_context } from './scan_context';
import { scan_comment, scan_identifier, scan_line_comment, scan_number, scan_string } from './scanner';

import type { TextBuffer } from './text_buffer.type';

describe('scan identifier', () => {
	it('updates index', () => {
		const ctx = create_scanner_context('hello');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(ctx).toEqual({
			source: [...'hello'],
			index: 0,
			length: 5,
			column: 1,
			row: 1
		});
		scan_identifier(ctx, buffer);
		expect(ctx).toEqual({
			source: [...'hello'],
			index: 5,
			length: 5,
			column: 6,
			row: 1
		});
	});
	it('emits identifier token', () => {
		const ctx = create_scanner_context('h3ll0');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(scan_identifier(ctx, buffer)).toEqual({
			type: 'identifier',
			start: { column: 1, row: 1},
			end: { column: 6, row: 1 },
			value: 'h3ll0'
		});
	});
	it('can have numbers after first character', () => {
		const ctx = create_scanner_context('h3ll0');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(scan_identifier(ctx, buffer)).toEqual({
			type: 'identifier',
			start: { column: 1, row: 1},
			end: { column: 6, row: 1 },
			value: 'h3ll0'
		});
	});
});

describe('scan number', () => {
	it('updates index', () => {
		const ctx = create_scanner_context('314');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(ctx).toEqual({
			source: [...'314'],
			index: 0,
			length: 3,
			column: 1,
			row: 1
		});
		scan_number(ctx, buffer);
		expect(ctx).toEqual({
			source: [...'314'],
			index: 3,
			length: 3,
			column: 4,
			row: 1
		});
	});
	it('emits number token', () => {
		const ctx = create_scanner_context('314');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(scan_number(ctx, buffer)).toEqual({
			type: 'number',
			start: { column: 1, row: 1},
			end: { column: 4, row: 1 },
			value: '314'
		});
	});
});

describe('scan string', () => {
	it('updates index', () => {
		const ctx = create_scanner_context('"314"');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(ctx).toEqual({
			source: [...'"314"'],
			index: 0,
			length: 5,
			column: 1,
			row: 1
		});
		scan_string(ctx, buffer);
		expect(ctx).toEqual({
			source: [...'"314"'],
			index: 5,
			length: 5,
			column: 6,
			row: 1
		});
	});
	it('emits string token', () => {
		const ctx = create_scanner_context('"314"');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(scan_string(ctx, buffer)).toEqual({
			type: 'string',
			start: { column: 1, row: 1},
			end: { column: 6, row: 1 },
			value: '314'
		});
	});
	it('parses empty string', () => {
		const ctx = create_scanner_context('""');
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(scan_string(ctx, buffer)).toEqual({
			type: 'string',
			start: { column: 1, row: 1},
			end: { column: 3, row: 1 },
			value: ''
		});
	});
	it('correctly escapes', () => {
		const ctx = create_scanner_context(String.raw`"\n"`);
		const buffer: TextBuffer = { start: 0, length: 0 };
		expect(scan_string(ctx, buffer)).toEqual({
			type: 'string',
			start: { column: 1, row: 1},
			end: { column: 5, row: 1 },
			value: String.raw`\n`
		});
	});
});

describe('scan line comment', () => {
	it('updates index', () => {
		const ctx = create_scanner_context('// test');
		scan_line_comment(ctx);
		expect(ctx).toEqual({
			source: [...'// test'],
			index: 7,
			length: 7,
			column: 8,
			row: 1
		});
	});
	it('terminates on newline', () => {
		const ctx = create_scanner_context('// test\nalpha');
		scan_line_comment(ctx);
		expect(ctx).toEqual({
			source: [...'// test\nalpha'],
			index: 8,
			length: 13,
			column: 1,
			row: 2
		});
	});
});

describe('scan comment', () => {
	it('updates index', () => {
		const ctx = create_scanner_context('/**/');
		scan_comment(ctx);
		expect(ctx).toEqual({
			source: [...'/**/'],
			index: 4,
			length: 4,
			column: 5,
			row: 1
		});
	});
	it('can consume multiple lines', () => {
		const ctx = create_scanner_context('/*\n\n\n*/');
		scan_comment(ctx);
		expect(ctx).toEqual({
			source: [...'/*\n\n\n*/'],
			index: 7,
			length: 7,
			column: 3,
			row: 4
		});
	});
});