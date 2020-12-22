import type { LetDeclaration } from '../statements.type';
import { parse_expression } from '../expression';
import { consume_token, ensure_token, match_token } from '../parser_context';
import type { ParserContext } from '../parser_context.type';
import { end_statement } from '../statement';
import { parse_type_pattern } from '../type_pattern';

export function parse_let_declaration (ctx: ParserContext): LetDeclaration {
	const start = ensure_token(ctx, 'identifier', 'let').start;
	const name = ensure_token(ctx, 'identifier').value;
	let type_pattern = null;
	let initial = null;

	if (match_token(ctx, 'symbol', ':')) {
		consume_token(ctx);
		type_pattern = parse_type_pattern(ctx);
	}

	if (match_token(ctx, 'symbol', '=')) {
		consume_token(ctx);
		initial = parse_expression(ctx, 1);
	}

	const end = end_statement(ctx);

	return {
		type: 'let_declaration',
		type_pattern,
		name,
		start, 
		end,
		initial,
	};
}