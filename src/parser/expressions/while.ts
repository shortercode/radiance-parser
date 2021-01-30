import { parse_expression } from '../expression';
import type { WhileExpression } from '../expression.type';
import { ensure_token } from '../parser_context';
import type { ParserContext } from '../parser_context.type';
import { parse_block_expression } from './block_expression';

export function parse_while_expression (ctx: ParserContext): WhileExpression {
	const { start } = ensure_token(ctx, 'identifier', 'while');
	const condition = parse_expression(ctx, 1);
	const block = parse_block_expression(ctx);
	const { end } = block;
	return {
		type: 'while_expression',
		start,
		end,
		condition,
		block,
	};
}