import { parse_expression } from '../expression';
import type { NotExpression } from '../expression.type';
import { ensure_token } from '../parser_context';
import type { ParserContext } from '../parser_context.type';

export function parse_not_expression (ctx: ParserContext, precedence: number): NotExpression {
	const { start } = ensure_token(ctx, 'identifier', 'not');
	const expression = parse_expression(ctx, precedence);
	const { end } = expression;
	return {
		type: 'not_expression',
		start,
		end,
		expression,
	};
}