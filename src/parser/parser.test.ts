import { parse } from './parser';
import { scan } from '../scanner/scanner';

function quic_parse(src: string) {
	// NOTE strips the module wrapper to simplify match
	return parse(scan(src)).body;
}

describe('parser', () => {
	it('parses an empty module', () => {
		expect(parse([])).toEqual(expect.objectContaining({
			type: 'module',
			body: [],
		}));
	});
	describe('array', () => {
		it('parses an empty array', () => {
			expect(quic_parse('[]')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'array_literal_expression',
						elements: [],
					}),
				}),
			]));
		});
		it('parses an array with a single item', () => {
			expect(quic_parse('[42]')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'array_literal_expression',
						elements: expect.arrayContaining([
							expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
						]),
					})
				})
			]));
		});
		it('parses an array with more than 1 item', () => {
			expect(quic_parse('[42, 0.1]')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'array_literal_expression',
						elements: expect.arrayContaining([
							expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
							expect.objectContaining({
								type: 'number_expression',
								value: '0.1',
							}),
						]),
					})
				})
			]));
		});
	});
	describe('binary', () => {
		it('add', () => {
			expect(quic_parse('left + right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'add_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('subtract', () => {
			expect(quic_parse('left - right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'subtract_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('multiply', () => {
			expect(quic_parse('left * right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'multiply_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('divide', () => {
			expect(quic_parse('left / right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'divide_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('assignment', () => {
			expect(quic_parse('left = right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'assignment_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('logical and', () => {
			expect(quic_parse('left and right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'logical_and_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('logical or', () => {
			expect(quic_parse('left or right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'logical_or_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('equals', () => {
			expect(quic_parse('left == right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'equals_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('not equals', () => {
			expect(quic_parse('left != right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'not_equals_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('less than', () => {
			expect(quic_parse('left < right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'less_than_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('greater than', () => {
			expect(quic_parse('left > right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'greater_than_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('less than or equals', () => {
			expect(quic_parse('left <= right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'less_than_or_equals_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('greater than or equals', () => {
			expect(quic_parse('left >= right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'greater_than_or_equals_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('bitwise or', () => {
			expect(quic_parse('left | right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'bitwise_or_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('remainder', () => {
			expect(quic_parse('left % right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'remainder_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('bitwise and', () => {
			expect(quic_parse('left & right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'bitwise_and_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('bitshift left', () => {
			expect(quic_parse('left << right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'bitshift_left_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});
		it('bitshift right', () => {
			expect(quic_parse('left >> right')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'bitshift_right_expression',
						left: expect.objectContaining({
							type: 'identifier_expression',
							value: 'left',
						}),
						right: expect.objectContaining({
							type: 'identifier_expression',
							value: 'right',
						}),
					})
				})
			]));
		});

	});
});
