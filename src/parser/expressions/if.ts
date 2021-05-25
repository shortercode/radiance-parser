import { parse_expression } from '../expression';
import { consume_token, ensure_token, match_token, previous_token } from '../parser_context';
import { parse_block_expression } from './block_expression';

import type { IfExpression, IfLetExpression } from '@radlang/ast';
import type { ParserContext } from '../parser_context.type';

export function parse_if_expresson (ctx: ParserContext): IfExpression | IfLetExpression {
	const { start } = ensure_token(ctx, 'identifier', 'if');
	let variable_name = null;

	if (match_token(ctx, 'identifier', 'let')) {
		consume_token(ctx);
		variable_name = ensure_token(ctx, 'identifier').value;
		ensure_token(ctx, 'symbol', '=');
	}

	const condition = parse_expression(ctx, 1);

	const then_block = parse_block_expression(ctx);
	let else_block = null;

	if (match_token(ctx, 'identifier', 'else')) {
		consume_token(ctx);
		// NOTE detect `else if` block and nest it into the else expression
		const is_elif = match_token(ctx, 'identifier', 'if');
		else_block = is_elif ? parse_if_expresson(ctx) : parse_block_expression(ctx);
	}

	const { end } = previous_token(ctx);

	if (variable_name) {
		return {
			type: 'if_let_expression',
			start,
			end,
			variable_name,
			condition,
			then_block,
			else_block
		};
	}

	return {
		type: 'if_expression',
		start,
		end,
		condition,
		then_block,
		else_block
	};
}