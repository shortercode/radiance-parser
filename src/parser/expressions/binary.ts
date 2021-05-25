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

export function parse_binary_expression<T extends `${string}_expression`> (type: T, ctx: ParserContext, left: Expression, precedence: number): BinaryExpression<T> {
	const { start } = left;
	const right = parse_expression(ctx, precedence);
	const { end } = right;

	return {
		type, left, right, start, end
	};
}

export function parse_add_expression (ctx: ParserContext, left: Expression, precedence: number): AddExpression {
	return parse_binary_expression('add_expression', ctx, left, precedence);
}

export function parse_subtract_expression (ctx: ParserContext, left: Expression, precedence: number): SubtractExpression {
	return parse_binary_expression('subtract_expression', ctx, left, precedence);
}

export function parse_multiply_expression (ctx: ParserContext, left: Expression, precedence: number): MultiplyExpression {
	return parse_binary_expression('multiply_expression', ctx, left, precedence);
}

export function parse_divide_expression (ctx: ParserContext, left: Expression, precedence: number): DivideExpression {
	return parse_binary_expression('divide_expression', ctx, left, precedence);
}

export function parse_assignment_expression (ctx: ParserContext, left: Expression, precedence: number): AssignmentExpression {
	// NOTE modify precedence to change association
	return parse_binary_expression('assignment_expression', ctx, left, precedence - 1);
}
export function parse_logical_and_expression (ctx: ParserContext, left: Expression, precedence: number): LogicalAndExpression {
	return parse_binary_expression('logical_and_expression', ctx, left, precedence);
}

export function parse_logical_or_expression (ctx: ParserContext, left: Expression, precedence: number): LogicalOrExpression {
	return parse_binary_expression('logical_or_expression', ctx, left, precedence);
}

export function parse_equals_expression (ctx: ParserContext, left: Expression, precedence: number): EqualsExpression {
	return parse_binary_expression('equals_expression', ctx, left, precedence);
}

export function parse_not_equals_expression (ctx: ParserContext, left: Expression, precedence: number): NotEqualsExpression {
	return parse_binary_expression('not_equals_expression', ctx, left, precedence);
}

export function parse_less_than_expression (ctx: ParserContext, left: Expression, precedence: number): LessThanExpression {
	return parse_binary_expression('less_than_expression', ctx, left, precedence);
}

export function parse_greater_than_expression (ctx: ParserContext, left: Expression, precedence: number): GreaterThanExpression {
	return parse_binary_expression('greater_than_expression', ctx, left, precedence);
}

export function parse_less_than_or_equals_expression (ctx: ParserContext, left: Expression, precedence: number): LessThanOrEqualsExpression {
	return parse_binary_expression('less_than_or_equals_expression', ctx, left, precedence);
}

export function parse_greater_than_or_equals_expression (ctx: ParserContext, left: Expression, precedence: number): GreaterThanOrEqualsExpression {
	return parse_binary_expression('greater_than_or_equals_expression', ctx, left, precedence);
}

export function parse_bitwise_or_expression (ctx: ParserContext, left: Expression, precedence: number): BitwiseOrExpression {
	return parse_binary_expression('bitwise_or_expression', ctx, left, precedence);
}

export function parse_remainder_expression (ctx: ParserContext, left: Expression, precedence: number): RemainderExpression {
	return parse_binary_expression('remainder_expression', ctx, left, precedence);
}

export function parse_bitwise_and_expression (ctx: ParserContext, left: Expression, precedence: number): BitwiseAndExpression {
	return parse_binary_expression('bitwise_and_expression', ctx, left, precedence);
}

export function parse_bitshift_left_expression (ctx: ParserContext, left: Expression, precedence: number): BitshiftLeftExpression {
	return parse_binary_expression('bitshift_left_expression', ctx, left, precedence);
}

export function parse_bitshift_right_expression (ctx: ParserContext, left: Expression, precedence: number): BitshiftRightExpression {
	return parse_binary_expression('bitshift_right_expression', ctx, left, precedence);
}