import { parse_expression } from '../expression';

import type {
	AddExpression,
	AssignmentExpression,
	BinaryExpression,
	BitshiftLeftExpression,
	BitshiftRightExpression,
	BitwiseAndExpression,
	BitwiseOrExpression,
	DivideExpression,
	EqualsExpression,
	Expression,
	GreaterThanExpression,
	GreaterThanOrEqualsExpression,
	LessThanExpression,
	LessThanOrEqualsExpression,
	LogicalAndExpression,
	LogicalOrExpression,
	MultiplyExpression,
	NotEqualsExpression,
	RemainderExpression,
	SubtractExpression
} from '@radlang/ast';
import type { ParserContext } from '../parser_context.type';
import { ensure_token } from '../parser_context';

export function parse_binary_expression<T extends `${string}_expression`> (type: T, ctx: ParserContext, left: Expression, precedence: number): BinaryExpression<T> {
	const { start } = left;
	const right = parse_expression(ctx, precedence);
	const { end } = right;

	return {
		type, left, right, start, end
	};
}

export function parse_add_expression (ctx: ParserContext, left: Expression, precedence: number): AddExpression {
	ensure_token(ctx, 'symbol', '+');
	
	return parse_binary_expression('add_expression', ctx, left, precedence);
}

export function parse_subtract_expression (ctx: ParserContext, left: Expression, precedence: number): SubtractExpression {
	ensure_token(ctx, 'symbol', '-');

	return parse_binary_expression('subtract_expression', ctx, left, precedence);
}

export function parse_multiply_expression (ctx: ParserContext, left: Expression, precedence: number): MultiplyExpression {
	ensure_token(ctx, 'symbol', '*');

	return parse_binary_expression('multiply_expression', ctx, left, precedence);
}

export function parse_divide_expression (ctx: ParserContext, left: Expression, precedence: number): DivideExpression {
	ensure_token(ctx, 'symbol', '/');

	return parse_binary_expression('divide_expression', ctx, left, precedence);
}

export function parse_assignment_expression (ctx: ParserContext, left: Expression, precedence: number): AssignmentExpression {
	ensure_token(ctx, 'symbol', '=');

	// NOTE modify precedence to change association
	return parse_binary_expression('assignment_expression', ctx, left, precedence - 1);
}
export function parse_logical_and_expression (ctx: ParserContext, left: Expression, precedence: number): LogicalAndExpression {
	ensure_token(ctx, 'identifier', 'and');

	return parse_binary_expression('logical_and_expression', ctx, left, precedence);
}

export function parse_logical_or_expression (ctx: ParserContext, left: Expression, precedence: number): LogicalOrExpression {
	ensure_token(ctx, 'identifier', 'or');

	return parse_binary_expression('logical_or_expression', ctx, left, precedence);
}

export function parse_equals_expression (ctx: ParserContext, left: Expression, precedence: number): EqualsExpression {
	ensure_token(ctx, 'symbol', '=');
	ensure_token(ctx, 'symbol', '=');

	return parse_binary_expression('equals_expression', ctx, left, precedence);
}

export function parse_not_equals_expression (ctx: ParserContext, left: Expression, precedence: number): NotEqualsExpression {
	ensure_token(ctx, 'symbol', '!');
	ensure_token(ctx, 'symbol', '=');

	return parse_binary_expression('not_equals_expression', ctx, left, precedence);
}

export function parse_less_than_expression (ctx: ParserContext, left: Expression, precedence: number): LessThanExpression {
	ensure_token(ctx, 'symbol', '<');

	return parse_binary_expression('less_than_expression', ctx, left, precedence);
}

export function parse_greater_than_expression (ctx: ParserContext, left: Expression, precedence: number): GreaterThanExpression {
	ensure_token(ctx, 'symbol', '>');

	return parse_binary_expression('greater_than_expression', ctx, left, precedence);
}

export function parse_less_than_or_equals_expression (ctx: ParserContext, left: Expression, precedence: number): LessThanOrEqualsExpression {
	ensure_token(ctx, 'symbol', '<');
	ensure_token(ctx, 'symbol', '=');

	return parse_binary_expression('less_than_or_equals_expression', ctx, left, precedence);
}

export function parse_greater_than_or_equals_expression (ctx: ParserContext, left: Expression, precedence: number): GreaterThanOrEqualsExpression {
	ensure_token(ctx, 'symbol', '>');
	ensure_token(ctx, 'symbol', '=');

	return parse_binary_expression('greater_than_or_equals_expression', ctx, left, precedence);
}

export function parse_bitwise_or_expression (ctx: ParserContext, left: Expression, precedence: number): BitwiseOrExpression {
	ensure_token(ctx, 'symbol', '|');

	return parse_binary_expression('bitwise_or_expression', ctx, left, precedence);
}

export function parse_remainder_expression (ctx: ParserContext, left: Expression, precedence: number): RemainderExpression {
	ensure_token(ctx, 'symbol', '%');

	return parse_binary_expression('remainder_expression', ctx, left, precedence);
}

export function parse_bitwise_and_expression (ctx: ParserContext, left: Expression, precedence: number): BitwiseAndExpression {
	ensure_token(ctx, 'symbol', '&');

	return parse_binary_expression('bitwise_and_expression', ctx, left, precedence);
}

export function parse_bitshift_left_expression (ctx: ParserContext, left: Expression, precedence: number): BitshiftLeftExpression {
	ensure_token(ctx, 'symbol', '<');
	ensure_token(ctx, 'symbol', '<');
	
	return parse_binary_expression('bitshift_left_expression', ctx, left, precedence);
}

export function parse_bitshift_right_expression (ctx: ParserContext, left: Expression, precedence: number): BitshiftRightExpression {
	ensure_token(ctx, 'symbol', '>');
	ensure_token(ctx, 'symbol', '>');

	return parse_binary_expression('bitshift_right_expression', ctx, left, precedence);
}