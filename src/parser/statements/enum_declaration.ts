import { unexpected_end_of_input } from '../../scanner/error';
import { consume_token, ensure_token, match_token, previous_token, tokens_remaining } from '../parser_context';
import type { ParserContext } from '../parser_context.type';
import type { EnumDeclaration, EnumVariantDescription } from '../statements.type';
import { parse_type_parameters } from './function_declaration';
import { parse_struct_body } from './struct_declaration';

export function parse_enum_declaration (ctx: ParserContext): EnumDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'enum');
	const name = ensure_token(ctx, 'identifier').value;
	const generics = parse_type_parameters(ctx);
	const variants = [];
	ensure_token(ctx, 'symbol', '{');

	while (match_token(ctx, 'symbol', '}') === false) {
		if (tokens_remaining(ctx) === false) {
			unexpected_end_of_input();
		}
		const variant = parse_enum_variant(ctx);
		variants.push(variant);
		if (match_token(ctx, 'symbol', ',') === false) {
			break;
		}
		consume_token(ctx);
	}

	ensure_token(ctx, 'symbol', '}');

	const { end } = previous_token(ctx);
	return {
		type: 'enum_declaration',
		name,
		generics,
		variants,
		start,
		end
	};
}

export function parse_enum_variant (ctx: ParserContext): EnumVariantDescription {
	const name = ensure_token(ctx, 'identifier').value;
	const fields = match_token(ctx, 'symbol', '{') ? parse_struct_body(ctx) : [];
	return {
		name,
		fields
	};
}