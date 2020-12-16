import { unexpected_token, unsupported_escape_sequence } from './error';
import { is_identifier, is_number, is_string, is_symbol, is_whitespace } from './is_type';
import { create_scanner_context, characters_remaining, peek_char, current_position, consume_char } from './scan_context';
import { buffer_append, buffer_consume, buffer_start } from './text_buffer';

import type { ScanContext } from './scan_context.type';
import type { TextBuffer } from './text_buffer.type';
import type { IdentifierToken, NumberToken, StringToken, SymbolToken, Token } from './token.type';

export function scan(source: string): Token[] {
	const ctx = create_scanner_context(source);
	const buffer: TextBuffer = { start: 0, length: 0 };
	const tokens: Token[] = [];
	while (characters_remaining(ctx)) {
		const token = scan_token(ctx, buffer);
		if (token) {
			tokens.push(token);
		}
	}
	return tokens;
}

export function scan_token(ctx: ScanContext, buffer: TextBuffer): IdentifierToken | NumberToken | StringToken | SymbolToken | void {
	if (is_identifier(ctx)) {
		return scan_identifier(ctx, buffer);
	}
	if (is_number(ctx)) {
		return scan_number(ctx, buffer);
	}
	if (is_string(ctx)) {
		return scan_string(ctx, buffer);
	}
	if (is_symbol(ctx)) {
		return scan_symbol(ctx);
	}
	if (is_whitespace(ctx)) {
		return scan_whitespace(ctx);
	}

	unexpected_token(peek_char(ctx) ?? 'EOF');
}

export function scan_identifier(ctx: ScanContext, buffer: TextBuffer): IdentifierToken {
	const start = current_position(ctx);
	buffer_start(buffer, ctx);
	while (characters_remaining(ctx)) {
		buffer_append(buffer, ctx);
		if (is_identifier(ctx) === false && is_number(ctx) === false) {
			break;
		}
	}
	const end = current_position(ctx);
	const value = buffer_consume(buffer, ctx);
	return { start, end, value, type: 'identifier' };
}

export function scan_number(ctx: ScanContext, buffer: TextBuffer): NumberToken {
	const start = current_position(ctx);
	buffer_start(buffer, ctx);
	while (characters_remaining(ctx)) {
		buffer_append(buffer, ctx);
		if (is_number(ctx) === false) {
			break;
		}
	}
	if (peek_char(ctx) === '.' && is_number(ctx, 1)) {
		buffer_append(buffer, ctx);
		while (characters_remaining(ctx)) {
			buffer_append(buffer, ctx);
			if (is_number(ctx) === false) {
				break;
			}
		}
	}
	const end = current_position(ctx);
	const value = buffer_consume(buffer, ctx);
	return { start, end, value, type: 'number' };
}

export function scan_string(ctx: ScanContext, buffer: TextBuffer): StringToken {
	const start = current_position(ctx);
	consume_char(ctx); // consume starting quote mark
	buffer_start(buffer, ctx);
	let is_character_escaped = false;
	while (characters_remaining(ctx)) {
		if (is_character_escaped) {
			const ch = peek_char(ctx);
			if (ch && ch !== '"' && ch !== '\\') {
				unsupported_escape_sequence(ch);
			}
			buffer_append(buffer, ctx);
			is_character_escaped = false;
		}
		else {
			const ch = peek_char(ctx);
			if (ch === '"') {
				consume_char(ctx);
				break;
			}
			else if (ch === '\\') {
				is_character_escaped = true;
			}
			else {
				buffer_append(buffer, ctx);
			}
		}
	}
	const end = current_position(ctx);
	const value = buffer_consume(buffer, ctx);
	return { start, end, value, type: 'string' };
}

export function scan_line_comment(ctx: ScanContext): void {
	consume_char(ctx);
	consume_char(ctx);
	while (characters_remaining(ctx)) {
		if (consume_char(ctx) === '\n') {
			break;
		}
	}
}

export function scan_comment(ctx: ScanContext): void {
	consume_char(ctx);
	consume_char(ctx);
	while (characters_remaining(ctx)) {
		if (consume_char(ctx) === '*' && peek_char(ctx) === '/') {
			consume_char(ctx);
			break;
		}
	}
	return;
}

export function scan_symbol(ctx: ScanContext): SymbolToken | void {
	if (peek_char(ctx) === '/' && peek_char(ctx, 1) === '*') {
		return scan_comment(ctx);
	}
	if (peek_char(ctx) === '/' && peek_char(ctx, 1) === '/') {
		return scan_line_comment(ctx);
	}
	const start = current_position(ctx);
	const value = consume_char(ctx);
	const end = current_position(ctx);
	return { start, end, value, type: 'symbol' };
}

export function scan_whitespace(ctx: ScanContext): void {
	while (characters_remaining(ctx)) {
		consume_char(ctx);
		if (is_whitespace(ctx) === false) {
			break;
		}
	}
	return;
}