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

	describe('block expression', () => {
		it('parses empty block', () => {
			expect(quic_parse('{}')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'block_expression',
						statements: [],
					}),
				}),
			]));
		});
		it('parses single statement', () => {
			expect(quic_parse('{ 12 }')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'block_expression',
						statements: expect.arrayContaining([
							expect.objectContaining({
								type: 'expression_statement',
								expression: expect.objectContaining({
									type: 'number_expression',
									value: '12',
								}),
							}),
						]),
					}),
				}),
			]));
		});
		it('parses semi-colon delimited statements', () => {
			expect(quic_parse('{ 12; a }')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'block_expression',
						statements: expect.arrayContaining([
							expect.objectContaining({
								type: 'expression_statement',
								expression: expect.objectContaining({
									type: 'number_expression',
									value: '12',
								}),
							}),
							expect.objectContaining({
								type: 'expression_statement',
								expression: expect.objectContaining({
									type: 'identifier_expression',
									value: 'a',
								}),
							}),
						]),
					}),
				}),
			]));
		});
		it('parses newline delimited statements', () => {
			expect(quic_parse('{ 12 \n a }')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'block_expression',
						statements: expect.arrayContaining([
							expect.objectContaining({
								type: 'expression_statement',
								expression: expect.objectContaining({
									type: 'number_expression',
									value: '12',
								}),
							}),
							expect.objectContaining({
								type: 'expression_statement',
								expression: expect.objectContaining({
									type: 'identifier_expression',
									value: 'a',
								}),
							}),
						]),
					}),
				}),
			]));
		});
		it('throws when the curly brace is missing', () => {
			expect(() => quic_parse('{')).toThrow('Unexpected end of input.');
		});
	});
	
	describe('call expression', () => {
		it('parses with no arguments', () => {
			expect(quic_parse('a()')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'call_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [],
						arguments: [],
					}),
				}),
			]));
		});
		it('parses with empty type parameters', () => {
			expect(quic_parse('a:<>()')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'call_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [],
						arguments: [],
					}),
				}),
			]));
		});
		it('parses with a type parameter ( and a trailing comma )', () => {
			expect(quic_parse('a:<A,>()')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'call_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [
							{
								type: 'class_type',
								name: 'A'
							}
						],
						arguments: [],
					}),
				}),
			]));
		});
		it('parses with 2 type parameters', () => {
			expect(quic_parse('a:<A,B>()')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'call_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [
							{
								type: 'class_type',
								name: 'A'
							},
							{
								type: 'class_type',
								name: 'B'
							}
						],
						arguments: [],
					}),
				}),
			]));
		});
		it('parses with 1 arguments ( and trailing comma )', () => {
			expect(quic_parse('a(b,)')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'call_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [],
						arguments: expect.arrayContaining([
							expect.objectContaining({
								type: 'identifier_expression',
								value: 'b',
							})
						]),
					}),
				}),
			]));
		});
		it('parses with 2 arguments', () => {
			expect(quic_parse('a(b,c)')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'call_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [],
						arguments: expect.arrayContaining([
							expect.objectContaining({
								type: 'identifier_expression',
								value: 'b',
							}),
							expect.objectContaining({
								type: 'identifier_expression',
								value: 'c',
							})
						]),
					}),
				}),
			]));
		});
	});

	describe('constructor expression', () => {
		it('parses a generic constructor', () => {
			expect(quic_parse('a:<A>{}')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'constructor_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [
							{
								type: 'class_type',
								name: 'A'
							}
						],
						elements: [],
					}),
				}),
			]));
		});
		it('parses a single element', () => {
			expect(quic_parse('a { b: 10 }')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'constructor_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [],
						elements: expect.arrayContaining([
							expect.objectContaining({
								name: 'b',
								value: expect.objectContaining({
									type: 'number_expression',
									value: '10'
								})
							})
						]),
					}),
				}),
			]));
		});
		it('parses a single element without a value', () => {
			expect(quic_parse('a { b }')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'constructor_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [],
						elements: [
							{
								name: 'b',
								value: null
							}
						],
					}),
				}),
			]));
		});
		it('parses a multiple elements without a value ( and trailing comma )', () => {
			expect(quic_parse('a { b, c: 42, }')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'constructor_expression',
						callee: expect.objectContaining({
							type: 'identifier_expression',
							value: 'a',
						}),
						generics: [],
						elements: expect.arrayContaining([
							expect.objectContaining({
								name: 'b',
								value: null
							}),
							expect.objectContaining({
								name: 'c',
								value: expect.objectContaining({
									type: 'number_expression',
									value: '42',
								})
							}),
						]),
					}),
				}),
			]));
		});
	});

	describe('grouping expression and tuples', () => {
		it('parses empty brackets as en empty tuple', () => {
			expect(quic_parse('()')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'tuple_expression',
						elements: [],
					}),
				}),
			]));
		});
		it('parses single item as grouping ( including trailing comma )', () => {
			expect(quic_parse('(1,)')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'group_expression',
						expression: expect.objectContaining({
							type: 'number_expression',
							value: '1',
						}),
					}),
				}),
			]));
		});
		it('parses 2 items as tuple', () => {
			expect(quic_parse('(1, a)')).toEqual(expect.arrayContaining([
				expect.objectContaining({
					type: 'expression_statement',
					expression: expect.objectContaining({
						type: 'tuple_expression',
						elements: expect.arrayContaining([
							expect.objectContaining({
								type: 'number_expression',
								value: '1',
							}),
							expect.objectContaining({
								type: 'identifier_expression',
								value: 'a',
							}),
						]),
					}),
				}),
			]));
		});
	});

});
