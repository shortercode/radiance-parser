import { parse_expression } from '../expression';
import { ensure_token } from '../parser_context';
import { end_statement, should_end_statement } from '../statement';

import type { ParserContext } from '../parser_context.type';
import type { ReturnStatement } from '../statements.type';

export function parse_return_statement (ctx: ParserContext): ReturnStatement {
	const { start } = ensure_token(ctx, 'identifier', 'return');
	let expression = null;

	if (!should_end_statement(ctx)) {
		expression = parse_expression(ctx, 1);		
	}

	const end = end_statement(ctx);
	return {
		type: 'return_statement',
		expression,
		start,
		end
	};
}