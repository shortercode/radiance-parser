import type { CastExpression, Expression } from '../expression.type';
import { ensure_token, previous_token } from '../parser_context';
import type { ParserContext } from '../parser_context.type';
import { parse_type_pattern } from '../type_pattern';

export function parse_type_cast_expression (ctx: ParserContext, left: Expression): CastExpression {
	const { start } = ensure_token(ctx, 'identifier', 'as');
	const type_pattern = parse_type_pattern(ctx);
	const { end } = previous_token(ctx);
	return {
		type: 'cast_expression',
		expression: left,
		start,
		end,
		type_pattern
	};
}