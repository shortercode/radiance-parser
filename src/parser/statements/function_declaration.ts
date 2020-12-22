import { unexpected_end_of_input } from '../../scanner/error';
import { parse_block_expression } from '../expressions/block_expression';
import { consume_token, ensure_token, match_token, tokens_remaining } from '../parser_context';
import type { ParserContext } from '../parser_context.type';
import type { FunctionDeclaration } from '../statements.type';
import { parse_type_pattern } from '../type_pattern';
import type { FunctionParameter, FunctionTypePattern, TypePattern } from '../type_pattern.type';

export function parse_function_declaration (ctx: ParserContext, exported = false): FunctionDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'fn');
	const name = ensure_token(ctx, 'identifier').value;

	// NOTE these 3 are technically all optional!
	const parameters = parse_parameters(ctx);
	const generics = parse_type_parameters(ctx);
	const result = parse_function_result_type(ctx);
	// NOTE but this isn't (no block, no effect)
	const block = parse_block_expression(ctx);

	const type_pattern: FunctionTypePattern = {
		name,
		type: 'function_type',
		parameters,
		result
	};

	return {
		type: 'function_declaration',
		start,
		end: block.end,
		name,
		exported,
		generics,
		block,
		type_pattern
	};
}

export function parse_function_result_type (ctx: ParserContext): TypePattern | null {
	if (match_token(ctx, 'symbol', '-') && match_token(ctx, 'symbol', '>')) {
		consume_token(ctx);
		consume_token(ctx);
		return parse_type_pattern(ctx);
	}
	return null;
}

// NOTE we could potentially extend the grammer of these parameters to contain
// things such as default values and contraints in future
export function parse_type_parameters (ctx: ParserContext): string[] {
	const parameters: string[] = [];
	if (match_token(ctx, 'symbol', '<') === false) {
		// NOTE early exit to allow the parameter block to be optional
		return parameters;
	}

	ensure_token(ctx, 'symbol', '<');

	while (match_token(ctx, 'symbol', '>') === false) {
		if (tokens_remaining(ctx) === false) {
			unexpected_end_of_input();
		}
		const name = ensure_token(ctx, 'identifier').value;
		parameters.push(name);
		if (match_token(ctx, 'symbol', ',') === false) {
			break;
		}
		consume_token(ctx);
	}

	ensure_token(ctx, 'symbol', '>');

	return parameters;
}

export function parse_parameters (ctx: ParserContext): FunctionParameter[] {
	const parameters: FunctionParameter[] = [];
	if (match_token(ctx, 'symbol', '(') === false) {
		// NOTE early exit to allow the parameter block to be optional
		return parameters;
	}

	ensure_token(ctx, 'symbol', '(');

	while (match_token(ctx, 'symbol', ')') === false) {
		if (tokens_remaining(ctx) === false) {
			unexpected_end_of_input();
		}
		const name = ensure_token(ctx, 'identifier').value;
		ensure_token(ctx, 'symbol', ':');
		const type_pattern = parse_type_pattern(ctx);
		parameters.push({
			name,
			type_pattern
		});
		if (match_token(ctx, 'symbol', ',') === false) {
			break;
		}
		consume_token(ctx);
	}

	ensure_token(ctx, 'symbol', ')');

	return parameters;
}