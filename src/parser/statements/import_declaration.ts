import { unexpected_end_of_input, unexpected_token } from '../../scanner/error';
import { ensure_token, match_token, peek_token, previous_token } from '../parser_context';
import { parse_function_result_type, parse_parameters, parse_type_parameters } from './function_declaration';
import type { ParserContext } from '../parser_context.type';
import type { ImportFunctionDeclaration } from '../statements.type';
import type { FunctionTypePattern } from '../type_pattern.type';

export function parse_import_declaration (ctx: ParserContext): ImportFunctionDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'import');

	if (match_token(ctx, 'identifier', 'fn')) {
		const name = ensure_token(ctx, 'identifier').value;
		// NOTE these 3 are technically all optional!
		const parameters = parse_parameters(ctx);
		const generics = parse_type_parameters(ctx);
		const result = parse_function_result_type(ctx);

		const type_pattern: FunctionTypePattern = {
			name,
			type: 'function_type',
			parameters,
			result
		};

		const { end } = previous_token(ctx);

		return {
			type: 'import_function_declaration',
			start,
			end,
			name,
			generics,
			type_pattern
		};
	}
	else {
		const token = peek_token(ctx);
		if (token) {
			unexpected_token(token.value);
		} else {
			unexpected_end_of_input();
		}
	}
}