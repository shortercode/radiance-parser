import { ensure_token, match_token } from '../parser_context';
import { end_statement } from '../statement';
import { parse_function_declaration } from './function_declaration';

import type { ExportDeclaration, FunctionDeclaration } from '@radlang/ast';
import type { ParserContext } from '../parser_context.type';

export function parse_export_declaration (ctx: ParserContext): ExportDeclaration | FunctionDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'export');

	if (match_token(ctx, 'identifier', 'fn')) {
		return parse_function_declaration(ctx, true);
	}

	const name = ensure_token(ctx, 'identifier').value;
	const end = end_statement(ctx);

	return {
		type: 'export_declaration',
		name,
		start,
		end,
	};
}