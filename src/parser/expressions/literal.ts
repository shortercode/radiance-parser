import type { BooleanLiteralExpression, IdentifierLiteralExpression, LiteralExpression, NumberLiteralExpression, StringLiteralExpression } from '../expression.type';
import { consume_token } from '../parser_context';
import type { ParserContext } from '../parser_context.type';

export function parse_literal_expression<T extends string> (type: T, ctx: ParserContext): LiteralExpression<T> {
	const { start, value, end } = consume_token(ctx);

	return {
		type, value, start, end
	};
}

export function parse_number_expression (ctx: ParserContext): NumberLiteralExpression {
	return parse_literal_expression('number_expression', ctx);
}

export function parse_boolean_expression (ctx: ParserContext): BooleanLiteralExpression {
	return parse_literal_expression('boolean_expression', ctx);
}

export function parse_string_expression (ctx: ParserContext): StringLiteralExpression {
	return parse_literal_expression('string_expression', ctx);
}

export function parse_identifier_expression (ctx: ParserContext): IdentifierLiteralExpression {
	return parse_literal_expression('identifier_expression', ctx);
}