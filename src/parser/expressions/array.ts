import { parse_expression_sequence } from './expression_sequence';
import type { ArrayLiteralExpression } from '../expression.type';
import type { ParserContext } from '../parser_context.type';

export function parse_array_expression (ctx: ParserContext): ArrayLiteralExpression {
	return {
		type: 'array_literal_expression',
		...parse_expression_sequence(ctx, ['[', ']'], 0),
	};
}