import { unexpected_end_of_input } from '../../scanner/error';
import { ensure_token, match_token, tokens_remaining } from '../parser_context';
import { parse_statement } from '../statement';
import type { BlockExpression } from '../ast.type';
import type { ParserContext } from '../parser_context.type';
import type { Statement } from '../statements.type';

export function parse_block_expression (ctx: ParserContext): BlockExpression {
	const { start } = ensure_token(ctx, 'symbol', '{');
	const statements: Statement[] = [];
	while (match_token(ctx, 'symbol', '}') === false) { 
		if (tokens_remaining(ctx) === false) {
			unexpected_end_of_input();
		}
		statements.push(parse_statement(ctx));
	}
	const { end } = ensure_token(ctx, 'symbol', '}');
	return {
		start,
		end,
		type: 'block_expression',
		statements
	};
}