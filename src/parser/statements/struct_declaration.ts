import { ensure_token, previous_token } from '../parser_context';
import { parse_sequence } from '../sequence';
import { parse_type_parameters } from './function_declaration';
import { parse_value_description } from './let_declaration';
import type { ParserContext } from '../parser_context.type';
import type { StructDeclaration, ValueDescription } from '../statements.type';

export function parse_struct_declaration (ctx: ParserContext): StructDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'struct');
	const name = ensure_token(ctx, 'identifier').value;
	const generics = parse_type_parameters(ctx);
	const fields = parse_struct_body(ctx);
	const { end } = previous_token(ctx);

	return {
		type: 'struct_declaration',
		name,
		generics,
		fields,
		start,
		end
	};
}

export function parse_struct_body(ctx: ParserContext): ValueDescription[] {
	return parse_sequence(ctx, ['{', '}'], parse_value_description).elements;
}