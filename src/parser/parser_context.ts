import { unexpected_end_of_input, unexpected_token } from '../scanner/error';
import type { Token, TokenTypes } from '../scanner/token.type';
import type { ParserContext } from './parser_context.type';

export function peek_token(ctx: ParserContext, offset = 0): Token | undefined {
	return ctx.source[ctx.index + offset];
}

export function consume_token(ctx: ParserContext): Token {
	if (tokens_remaining(ctx) === false) {
		unexpected_end_of_input();
	}
	const ch = ctx.source[ctx.index];
	ctx.index += 1;
	return ch;
}

export function tokens_remaining(ctx: ParserContext): boolean {
	return ctx.index < ctx.length;
}

export function create_parser_context (source: Token[]): ParserContext {
	return {
		source,
		index: 0,
		length: source.length
	};
}

export function match_token(ctx: ParserContext, type: TokenTypes, value: string, offset = 0): boolean {
	const token = peek_token(ctx, offset);
	return !!token && token.type === type && token.value === value;
}

export function ensure_token(ctx: ParserContext, type: TokenTypes, value?: string): Token {
	const token = consume_token(ctx);
	if (!token) {
		unexpected_end_of_input();
	}
	const correct_type = token.type === type;
	const correct_value = !value || token.value === value;
	if (correct_type && correct_value) {
		return token;
	}
	unexpected_token(token.value);
}