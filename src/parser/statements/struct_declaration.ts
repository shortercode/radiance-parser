import { unexpected_end_of_input } from '../../scanner/error';
import { consume_token, ensure_token, match_token, tokens_remaining } from '../parser_context';
import type { ParserContext } from '../parser_context.type';
import { previous_token } from '../statement';
import type { StructDeclaration, ValueDescription } from '../statements.type';
import { parse_type_parameters } from './function_declaration';
import { parse_value_description } from './let_declaration';

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
	const descriptions: ValueDescription[] = [];

	ensure_token(ctx, 'symbol', '{');

	while (match_token(ctx, 'symbol', '}') === false) {
		if (tokens_remaining(ctx) === false) {
			unexpected_end_of_input();
		}

		const description = parse_value_description(ctx);
		descriptions.push(description);

		if (match_token(ctx, 'symbol', ',') === false) {
			break;
		}
		consume_token(ctx);
	}

	ensure_token(ctx, 'symbol', '}');

	return descriptions;
}