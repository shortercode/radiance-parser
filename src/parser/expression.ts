import { unexpected_end_of_input, unexpected_token } from '../scanner/error';
import { get_infix_parselet, get_prefix_parselet } from './parselets';
import { peek_token, tokens_remaining } from './parser_context';
import type { Expression } from './expression.type';
import type { ParserContext } from './parser_context.type';

export function parse_expression(ctx: ParserContext, precedence = 0): Expression {
	let left = parse_prefix_expression(ctx);

	while (tokens_remaining(ctx)) {
		const next = parse_infix_expression(ctx, left, precedence);
		if (next) {
			left = next;
		}
		else {
			break;
		}
	}

	return left;
}

export function parse_prefix_expression(ctx: ParserContext): Expression {
	const token = peek_token(ctx);
	if (!token) {
		unexpected_end_of_input();
	}
	const parselet_info = get_prefix_parselet(token);
	if (!parselet_info) {
		unexpected_token(token.value);
	}
	const { precedence, parselet } = parselet_info;

	return parselet(ctx, precedence);
}

export function parse_infix_expression(ctx: ParserContext, left: Expression, parent_precedence: number): Expression | null {
	const token = peek_token(ctx);
	if (!token) {
		return null;
	}
	const parselet_info = get_infix_parselet(token, ctx);
	if (!parselet_info) {
		return null;
	}
	
	const { precedence, parselet } = parselet_info;
	return parent_precedence < precedence ? parselet(ctx, left, precedence) : null;
}