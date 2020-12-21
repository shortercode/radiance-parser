import type { Position } from '../scanner/position.type';
import type { Token } from '../scanner/token.type';
import type { Module } from './ast.type';
import { create_parser_context, tokens_remaining } from './parser_context';
import { parse_statement } from './statement';
import type { Statement } from './statements.type';

export function parse(tokens: Token[]): Module {
	const ctx = create_parser_context(tokens);
	const body: Statement[] = []; 

	while (tokens_remaining(ctx)) {
		body.push(parse_statement(ctx));
	}

	if (body.length === 0) {
		const pos: Position = {
			column: 1, row: 1
		};
		return { type: 'module', start: pos, end: pos, body };
	}
	else {
		const start = body[0].start;
		const end = body[body.length - 1].end;
		return { type: 'module', start, end, body };
	}
}