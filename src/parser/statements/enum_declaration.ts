import { ensure_token, match_token } from '../parser_context';
import { parse_sequence } from '../sequence';
import { parse_type_parameters } from './function_declaration';
import { parse_struct_body } from './struct_declaration';
import { parse_tuple_type_pattern } from '../type_pattern';

import type { EnumDeclaration, EnumVariantDescription, ValueDescription } from '@radlang/ast';
import type { ParserContext } from '../parser_context.type';

export function parse_enum_declaration (ctx: ParserContext): EnumDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'enum');
	const name = ensure_token(ctx, 'identifier').value;
	const generics = parse_type_parameters(ctx);
	const { elements, end } = parse_sequence(ctx, ['{', '}'], parse_enum_variant);
	
	return {
		type: 'enum_declaration',
		name,
		generics,
		variants: elements,
		start,
		end
	};
}

export function parse_enum_variant (ctx: ParserContext): EnumVariantDescription {
	const name = ensure_token(ctx, 'identifier').value;
	let fields: ValueDescription[];
	if (match_token(ctx, 'symbol', '{')) {
		fields = parse_struct_body(ctx);
	}
	else if (match_token(ctx, 'symbol', '(')) {
		fields = parse_tuple_type_pattern(ctx).subtypes.map((type_pattern, index) => {
			return {
				type_pattern,
				name: index.toString(),
				initial: null,
			};
		});
	}
	else {
		fields = [];
	}
	return {
		name,
		fields
	};
}