import { unexpected_end_of_input } from '../scanner/error';
import { Token } from '../scanner/token.type';
import { ParserContext } from './parser_context.type';

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