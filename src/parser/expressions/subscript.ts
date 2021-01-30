import { parse_expression } from '../expression';
import type { Expression, SubscriptExpression } from '../expression.type';
import { ensure_token } from '../parser_context';
import type { ParserContext } from '../parser_context.type';

export function parse_subscript_expression (ctx: ParserContext, left: Expression): SubscriptExpression {
	const { start } = ensure_token(ctx, 'symbol', '[');
	const member = parse_expression(ctx, 0);
	const { end } = ensure_token(ctx, 'symbol', ']');
	return {
		type: 'subscript_expression',
		start,
		end,
		expression: left,
		member,
	};
}