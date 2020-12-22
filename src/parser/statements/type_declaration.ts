import { ensure_token } from '../parser_context';
import type { ParserContext } from '../parser_context.type';
import { end_statement } from '../statement';
import type { TypeDeclaration } from '../statements.type';
import { parse_type_pattern } from '../type_pattern';

export function parse_type_declaration (ctx: ParserContext): TypeDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'type');
	const name = ensure_token(ctx, 'identifier').value;
	ensure_token(ctx, 'symbol', '=');
	const type_pattern = parse_type_pattern(ctx);
	const end = end_statement(ctx);

	return {
		start,
		end,
		name,
		type: 'type_declaration',
		type_pattern
	};
}