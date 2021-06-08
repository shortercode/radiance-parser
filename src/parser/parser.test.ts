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

	describe('if expression', () => {
		it('parses with a then clause', () => {
			expect(quic_parse('if a == b {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'if_expression',
							condition: expect.objectContaining({
								type: 'equals_expression',
								left: expect.objectContaining({
									type: 'identifier_expression',
									value: 'a',
								}),
								right: expect.objectContaining({
									type: 'identifier_expression',
									value: 'b',
								})
							}),
							then_block: expect.objectContaining({
								type: 'block_expression',
								statements: []
							}),
							else_block: null,
						})
					})
				])
			);
		});
		it('parses an if let', () => {
			expect(quic_parse('if let a = 12 {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'if_let_expression',
							condition: expect.objectContaining({
								type: 'number_expression',
								value: '12',
							}),
							variable_name: 'a',
							then_block: expect.objectContaining({
								type: 'block_expression',
								statements: []
							}),
							else_block: null,
						})
					}),
				])
			);
		});
		it('parses an else clause', () => {
			expect(quic_parse('if a == b {} else {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'if_expression',
							condition: expect.objectContaining({
								type: 'equals_expression',
								left: expect.objectContaining({
									type: 'identifier_expression',
									value: 'a',
								}),
								right: expect.objectContaining({
									type: 'identifier_expression',
									value: 'b',
								})
							}),
							then_block: expect.objectContaining({
								type: 'block_expression',
								statements: []
							}),
							else_block: expect.objectContaining({
								type: 'block_expression',
								statements: []
							}),
						})
					})
				]),
			);
		});
		it('parses an else if clause', () => {
			expect(quic_parse('if a == b {} else if a == c {} else {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'if_expression',
							condition: expect.objectContaining({
								type: 'equals_expression',
								left: expect.objectContaining({
									type: 'identifier_expression',
									value: 'a',
								}),
								right: expect.objectContaining({
									type: 'identifier_expression',
									value: 'b',
								})
							}),
							then_block: expect.objectContaining({
								type: 'block_expression',
								statements: []
							}),
							else_block: expect.objectContaining({
								type: 'if_expression',
								condition: expect.objectContaining({
									type: 'equals_expression',
									left: expect.objectContaining({
										type: 'identifier_expression',
										value: 'a',
									}),
									right: expect.objectContaining({
										type: 'identifier_expression',
										value: 'c',
									})
								}),
								then_block: expect.objectContaining({
									type: 'block_expression',
									statements: []
								}),
								else_block: expect.objectContaining({
									type: 'block_expression',
									statements: []
								}),
							})
						})
					})
				])
			);
		});
	});

	describe('literal expression', () => {
		it('parses true as a boolean literal', () => {
			expect(quic_parse('true')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'boolean_expression',
							value: 'true',
						})
					})
				])
			);
		});
		it('parses false as a boolean literal', () => {
			expect(quic_parse('false')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'boolean_expression',
							value: 'false',
						})
					})
				])
			);
		});
		it('parses a number as a number literal', () => {
			expect(quic_parse('12')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'number_expression',
							value: '12',
						})
					})
				])
			);
		});
		it('parses a string as a string literal', () => {
			expect(quic_parse('"Hello world!"')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'string_expression',
							value: 'Hello world!',
						})
					})
				])
			);
		});
		it('parses an identifier as a identifier literal', () => {
			expect(quic_parse('hello_world')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'identifier_expression',
							value: 'hello_world',
						})
					})
				])
			);
		});
	});
	
	describe('member expression', () => {
		it('parses a named field', () => {
			expect(quic_parse('alpha.beta')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'member_expression',
							expression: expect.objectContaining({
								type: 'identifier_expression',
								value: 'alpha'
							}),
							member: 'beta'
						})
					})
				])
			);
		});
		it('parses a numerical field', () => {
			expect(quic_parse('alpha.0')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'member_expression',
							expression: expect.objectContaining({
								type: 'identifier_expression',
								value: 'alpha'
							}),
							member: '0'
						})
					})
				])
			);
		});
		it('parses multiple numerical fields', () => {
			expect(quic_parse('alpha.0.1')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'member_expression',
							expression: expect.objectContaining({
								type: 'member_expression',
								expression: expect.objectContaining({
									type: 'identifier_expression',
									value: 'alpha'
								}),
								member: '0'
							}),
							member: '1'
						}),
					})
				])
			);
		});

	});

	describe('not expression', () => {
		it('parses not expression', () => {
			expect(quic_parse('not true')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'not_expression',
							expression: expect.objectContaining({
								type: 'boolean_expression',
								value: 'true',
							})
						})
					})
				])
			);
		});
	});

	describe('subscript expression', () => {
		it('parses subscript expression', () => {
			expect(quic_parse('alpha[12]')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'subscript_expression',
							expression: expect.objectContaining({
								type: 'identifier_expression',
								value: 'alpha',
							}),
							member: expect.objectContaining({
								type: 'number_expression',
								value: '12',
							})
						})
					})
				])
			);
		});
	});

	describe('switch expression', () => {
		it('parses empty switch expression', () =>{
			expect(quic_parse('switch 42 {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'switch_expression',
							parameter: expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
							cases: [],
							default_case: null
						})
					})
				])
			);
		});
		it('parses a default case', () =>{
			expect(quic_parse('switch 42 { default {} }')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'switch_expression',
							parameter: expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
							cases: [],
							default_case: expect.objectContaining({
								type: 'block_expression',
								statements: [],
							})
						})
					})
				])
			);
		});
		it('does not accept multiple default cases', () =>{
			expect(() => quic_parse('switch 42 { default {}, default {} }')).toThrow('Cannot define more than 1 default case');
		});
		it('can parse a simple case', () =>{
			expect(quic_parse('switch 42 { case 42 {} }')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'switch_expression',
							parameter: expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
							cases: expect.arrayContaining([
								expect.objectContaining({
									conditions: expect.arrayContaining([
										expect.objectContaining({
											type: 'number_expression',
											value: '42',
										})
									]),
									style: 'match',
									block: expect.objectContaining({
										type: 'block_expression',
										statements: [],
									})
								})
							]),
							default_case: null
						})
					})
				])
			);
		});
		it('can parse a multiple cases', () =>{
			expect(quic_parse('switch 42 { case 42, 64 {} }')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'switch_expression',
							parameter: expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
							cases: expect.arrayContaining([
								expect.objectContaining({
									conditions: expect.arrayContaining([
										expect.objectContaining({
											type: 'number_expression',
											value: '42',
										}),
										expect.objectContaining({
											type: 'number_expression',
											value: '64',
										})
									]),
									style: 'match',
									block: expect.objectContaining({
										type: 'block_expression',
										statements: [],
									})
								})
							]),
							default_case: null
						})
					})
				])
			);
		});
		it('throws if no tokens after case', () =>{
			expect(() => quic_parse('switch 42 { case')).toThrow('Unexpected end of input.');
		});
		it('throws if invalid case value', () =>{
			expect(() => quic_parse('switch 42 { case () }')).toThrow('Unexpected expression type for switch case condition.');
		});
		it('can parse a casting case', () =>{
			expect(quic_parse('switch 42 { case 42 as n {} }')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'switch_expression',
							parameter: expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
							cases: expect.arrayContaining([
								expect.objectContaining({
									conditions: expect.arrayContaining([
										expect.objectContaining({
											type: 'number_expression',
											value: '42',
										})
									]),
									style: 'cast',
									identifier: 'n',
									block: expect.objectContaining({
										type: 'block_expression',
										statements: [],
									})
								})
							]),
							default_case: null
						})
					})
				])
			);
		});
		it('can parse a casting case', () =>{
			expect(quic_parse('switch 42 { case 42 as { n, b } {} }')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'switch_expression',
							parameter: expect.objectContaining({
								type: 'number_expression',
								value: '42',
							}),
							cases: expect.arrayContaining([
								expect.objectContaining({
									conditions: expect.arrayContaining([
										expect.objectContaining({
											type: 'number_expression',
											value: '42',
										})
									]),
									style: 'destructure',
									fields: ['n', 'b'],
									block: expect.objectContaining({
										type: 'block_expression',
										statements: [],
									})
								})
							]),
							default_case: null
						})
					})
				])
			);
		});

	});

	describe('type cast expression', () => {
		it('parses cast expression', () => {
			expect(quic_parse('alpha as Type')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'cast_expression',
							expression: expect.objectContaining({
								type: 'identifier_expression',
								value: 'alpha',
							}),
							type_pattern: expect.objectContaining({
								type: 'class_type',
								name: 'Type',
							})
						})
					})
				])
			);
		});
	});

	describe('unsafe expression', () => {
		it('parses unsafe expression', () => {
			expect(quic_parse('unsafe {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'unsafe_expression',
							block: expect.objectContaining({
								type: 'block_expression',
								statements: [],
							}),
						})
					})
				])
			);
		});
	});

	describe('while expression', () => {
		it('parses while expression', () => {
			expect(quic_parse('while true {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'expression_statement',
						expression: expect.objectContaining({
							type: 'while_expression',
							condition: expect.objectContaining({
								type: 'boolean_expression',
								value: 'true',
							}),
							block: expect.objectContaining({
								type: 'block_expression',
								statements: [],
							}),
						})
					})
				])
			);
		});
	});

	describe('enum declaration', () => {
		it('parses empty enum declaration', () => {
			expect(quic_parse('enum Alpha {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'enum_declaration',
						name: 'Alpha',
						generics: [],
						variants: [],
					})
				]),
			);
		});

		it('parses enum declaration with multiple variants', () => {
			expect(quic_parse('enum Beta { first, second (Value), third { b: Other } }')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'enum_declaration',
						name: 'Beta',
						generics: [],
						variants: [
							{
								name: 'first',
								fields: []
							},
							{
								name: 'second',
								fields: [
									{
										name: '0',
										initial: null,
										type_pattern: {
											type: 'class_type',
											name: 'Value',
										}
									}
								]
							},
							{
								name: 'third',
								fields: [
									{
										name: 'b',
										initial: null,
										type_pattern: {
											type: 'class_type',
											name: 'Other',
										}
									}
								]
							},
						],
					})
				]),
			);
		});
	});

	describe('export declaration', () => {
		it('parses simple export declaration', () => {
			expect(quic_parse('export Alpha')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'export_declaration',
						name: 'Alpha',
					})
				]),
			);
		});
		it('parses function export declaration', () => {
			expect(quic_parse('export fn alpha {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'function_declaration',
						name: 'alpha',
						exported: true,
						generics: [],
						block: expect.objectContaining({
							type: 'block_expression',
							statements: []
						}),
						type_pattern: {
							name: 'alpha',
							type: 'function_type',
							parameters: [],
							result: null,
						}
					})
				]),
			);
		});
	});

	describe('function declaration', () => {
		it('parses function declaration with no parameters or return type', () => {
			expect(quic_parse('fn alpha {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'function_declaration',
						name: 'alpha',
						exported: false,
						generics: [],
						block: expect.objectContaining({
							type: 'block_expression',
							statements: []
						}),
						type_pattern: {
							name: 'alpha',
							type: 'function_type',
							parameters: [],
							result: null,
						}
					})
				]),
			);
		});

		it('parses function declaration with type parameters', () => {
			expect(quic_parse('fn alpha<alpha> {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'function_declaration',
						name: 'alpha',
						exported: false,
						generics: ['alpha'],
						block: expect.objectContaining({
							type: 'block_expression',
							statements: []
						}),
						type_pattern: {
							name: 'alpha',
							type: 'function_type',
							parameters: [],
							result: null,
						}
					})
				]),
			);
		});

		it('parses function declaration with no parameters and a return type', () => {
			expect(quic_parse('fn alpha -> u32 {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'function_declaration',
						name: 'alpha',
						exported: false,
						generics: [],
						block: expect.objectContaining({
							type: 'block_expression',
							statements: []
						}),
						type_pattern: {
							name: 'alpha',
							type: 'function_type',
							parameters: [],
							result: {
								type: 'class_type',
								name: 'u32',
							},
						}
					})
				]),
			);
		});

		it('parses function declaration with and a return type', () => {
			expect(quic_parse('fn alpha (a: u32, b: Alpha){}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'function_declaration',
						name: 'alpha',
						exported: false,
						generics: [],
						block: expect.objectContaining({
							type: 'block_expression',
							statements: []
						}),
						type_pattern: {
							name: 'alpha',
							type: 'function_type',
							parameters: [
								{
									name: 'a',
									initial: null,
									type_pattern: {
										type: 'class_type',
										name: 'u32',
									}
								}, {
									name: 'b',
									initial: null,
									type_pattern: {
										type: 'class_type',
										name: 'Alpha',
									}
								}],
							result: null,
						}
					})
				]),
			);
		});
	});

	describe('import declaration', () => {
		it('parses a void function import', () => {
			expect(quic_parse('import fn Alpha')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'import_function_declaration',
						name: 'Alpha',
						generics: [],
						type_pattern: {
							name: 'Alpha',
							type: 'function_type',
							parameters: [],
							result: null,
						}
					})
				]),
			);
		});
		it('throws for anything non-fn', () => {
			expect(() => quic_parse('import alpha')).toThrow('Invalid or unexpected token "alpha".');
		});
		it('throws for unexpected end of input', () => {
			expect(() => quic_parse('import')).toThrow('Unexpected end of input.');
		});
	});

	describe('let declaration', () => {
		it('parses a let declaration with no type', () => {
			expect(quic_parse('let a = 1')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'let_declaration',
						description: expect.objectContaining({
							name: 'a',
							initial: expect.objectContaining({
								type: 'number_expression',
								value: '1'
							}),
							type_pattern: null
						})
					})
				]),
			);
		});
	});

	describe('return statement', () => {
		it('parses a return statement with an expression', () => {
			expect(quic_parse('return 1')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'return_statement',
						expression: expect.objectContaining({
							type: 'number_expression',
							value: '1',
						})
					})
				]),
			);
		});
		it('parses a return statement with no expression', () => {
			expect(quic_parse('return')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'return_statement',
						expression: null,
					})
				]),
			);
		});
	});

	describe('struct declaration', () => {
		it('parses an empty struct declaration', () => {
			expect(quic_parse('struct Al {}')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'struct_declaration',
						name: 'Al',
						generics: [],
						fields: [],
					})
				]),
			);
		});
	});

	describe('type declaration', () => {
		it('parses a simple type alias', () => {
			expect(quic_parse('type N = B')).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: 'type_declaration',
						name: 'N',
						type_pattern: {
							type: 'class_type',
							name: 'B',
						}
					})
				]),
			);
		});
	});
});
