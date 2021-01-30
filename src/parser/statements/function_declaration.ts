import { parse_block_expression } from '../expressions/block_expression';
import { consume_token, ensure_token, match_token } from '../parser_context';
import { parse_sequence } from '../sequence';
import { parse_type_pattern } from '../type_pattern';
import { parse_value_description } from './let_declaration';
import type { ParserContext } from '../parser_context.type';
import type { FunctionDeclaration, ValueDescription } from '../statements.type';
import type { FunctionTypePattern, TypePattern } from '../type_pattern.type';

export function parse_function_declaration (ctx: ParserContext, exported = false): FunctionDeclaration {
	const { start } = ensure_token(ctx, 'identifier', 'fn');
	const name = ensure_token(ctx, 'identifier').value;

	// NOTE these 3 are technically all optional!
	const parameters = parse_parameters(ctx);
	const generics = parse_type_parameters(ctx);
	const result = parse_function_result_type(ctx);
	// NOTE but this isn't (no block, no effect)
	const block = parse_block_expression(ctx);
	const { end } = block;
	const type_pattern: FunctionTypePattern = {
		name,
		type: 'function_type',
		parameters,
		result
	};

	return {
		type: 'function_declaration',
		start,
		end,
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
	if (match_token(ctx, 'symbol', '<') === false) {
		// NOTE early exit to allow the parameter block to be optional
		return [];
	}

	return parse_sequence(ctx, ['<', '>'], ctx => ensure_token(ctx, 'identifier').value).elements;
}

export function parse_parameters (ctx: ParserContext): ValueDescription[] {
	if (match_token(ctx, 'symbol', '(') === false) {
		// NOTE early exit to allow the parameter block to be optional
		return [];
	}

	return parse_sequence(ctx, ['(', ')'], parse_value_description).elements;
}