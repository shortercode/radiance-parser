import { ensure_token } from '../parser_context';
import { parse_block_expression } from './block_expression';

import type { ParserContext } from '../parser_context.type';
import type { UnsafeExpression } from '@radlang/ast';

export function parse_unsafe_expression (ctx: ParserContext): UnsafeExpression {
	const { start } = ensure_token(ctx, 'identifier', 'unsafe');
	const block = parse_block_expression(ctx);
	const { end } = block;
	return {
		type: 'unsafe_expression',
		start,
		end,
		block
	};
}