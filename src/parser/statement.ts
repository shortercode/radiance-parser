import type { Position } from '../scanner/position.type';
import type { ParserContext } from './parser_context.type';
import { unexpected_end_of_input, unexpected_token } from '../scanner/error';
import { parse_expression } from './expression';
import { consume_token, match_token, peek_token } from './parser_context';
import type { ExpressionStatement, Statement } from './statements.type';
import { parse_let_declaration } from './statements/let_declaration';
import { parse_type_declaration } from './statements/type_declaration';
import { parse_return_statement } from './statements/return_statement';
import { parse_function_declaration } from './statements/function_declaration';
import { parse_export_declaration } from './statements/export_declaration';
import { parse_import_declaration } from './statements/import_declaration';

export function parse_statement(ctx: ParserContext): Statement {
	const token = peek_token(ctx);
	if (!token) {
		unexpected_end_of_input();
	}
	const { type, value } = token;
	if (type === 'identifier') {
		switch (value) {
		case 'export': return parse_export_declaration(ctx);
		case 'import': return parse_import_declaration(ctx);
		case 'fn': return parse_function_declaration(ctx);
		case 'struct': return parse_struct_statement(ctx);
		case 'enum': return parse_enum_statement(ctx);
		case 'let': return parse_let_declaration(ctx);
		case 'return': return parse_return_statement(ctx);
		case 'type': return parse_type_declaration(ctx);
		}
	}
	return parse_expression_statement(ctx);
}

function parse_expression_statement(ctx: ParserContext): ExpressionStatement {
	const expression = parse_expression(ctx);
	const start = expression.start;
	const end = end_statement(ctx);
	return { start, end, type: 'expression_statement', expression };
}

export function end_statement(ctx: ParserContext): Position {
	// standard semi-colon termination
	if (match_token(ctx, 'symbol', ';')) {
		return consume_token(ctx).end;
	}

	const previous = peek_token(ctx, -1);
	const current = peek_token(ctx);

	if (previous) {
		// either end of file or next token is on a different line
		if (!current || current.start.row > previous.end.row) {
			return previous.end;
		}
		unexpected_token(current.value);
	}
	else {
		throw new Error('Unreachable: end statement should not be called if we haven\'t processed any tokens.');
	}
}

export function should_end_statement(ctx: ParserContext): boolean {
	// standard semi-colon termination
	if (match_token(ctx, 'symbol', ';')) {
		return true;
	}

	const previous = peek_token(ctx, -1);
	const current = peek_token(ctx);

	if (previous) {
		// either end of file or next token is on a different line
		return !current || current.start.row > previous.end.row;
	}
	else {
		throw new Error('Unreachable: end statement should not be called if we haven\'t processed any tokens.');
	}
}