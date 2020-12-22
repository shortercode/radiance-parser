import { unexpected_end_of_input } from '../scanner/error';
import { consume_token, ensure_token, match_token, tokens_remaining } from './parser_context';
import type { ArrayTypePattern, ClassTypePattern, FunctionParameter, FunctionTypePattern, GenericTypePattern, MemberTypePattern, TupleTypePattern, TypePattern } from './type_pattern.type';
import type { ParserContext } from './parser_context.type';

export function parse_type_pattern (ctx: ParserContext): TypePattern {
	if (tokens_remaining(ctx)) {
		unexpected_end_of_input();
	}
	let root_type: TypePattern;
	if (match_token(ctx, 'symbol', '(')) {
		root_type = parse_tuple_type_pattern(ctx);
		if (match_token(ctx, 'symbol', '-') && match_token(ctx, 'symbol', '>', 1)) {
			// root_type will always be a TupleTypePattern here
			root_type = parse_function_type_pattern(ctx, root_type as TupleTypePattern);
		}
	}
	else {
		root_type = parse_class_type_pattern(ctx);
		if (match_token(ctx, 'symbol', '.')) {
			root_type = parse_member_type_pattern(ctx, root_type);
		}
		if (match_token(ctx, 'symbol', ':')) {
			root_type = parse_generic_type_pattern(ctx, root_type);
		}
	}

	while (match_token(ctx, 'symbol', '[')) {
		root_type = parse_array_type_pattern(ctx, root_type);
	}
	
	return root_type;
}

export function parse_class_type_pattern (ctx: ParserContext): ClassTypePattern {
	const class_name = ensure_token(ctx, 'identifier');
	return {
		type: 'class_type',
		name: class_name.value,
	};
}

export function parse_tuple_type_pattern (ctx: ParserContext): TupleTypePattern {
	const subtypes = [];

	ensure_token(ctx, 'symbol', '(');

	while (match_token(ctx, 'symbol', ')') === false) {
		if (!tokens_remaining(ctx)) {
			unexpected_end_of_input();
		}
		subtypes.push(parse_type_pattern(ctx));
		if (!match_token(ctx, 'symbol', ',')) {
			break;
		}
		consume_token(ctx);
	}

	ensure_token(ctx, 'symbol', ')');

	return {
		type: 'tuple_type',
		subtypes,
	};
}

export function parse_function_type_pattern (ctx: ParserContext, left: TupleTypePattern): FunctionTypePattern {
	ensure_token(ctx, 'symbol', '-');
	ensure_token(ctx, 'symbol', '>');
	const result = parse_type_pattern(ctx);
	const parameters: FunctionParameter[] = left.subtypes.map((type_pattern, index) => ({
		name: index.toString(),
		type_pattern
	}));

	return {
		type: 'function_type',
		name: '(unknown)',
		parameters,
		result
	};
}

export function parse_array_type_pattern (ctx: ParserContext, left: TypePattern): ArrayTypePattern {
	ensure_token(ctx, 'symbol', '[');
	let count = -1;
	if (match_token(ctx, 'number')) {
		const count_str = ensure_token(ctx, 'number').value;
		count = parseFloat(count_str);
		if (count_str.includes('.') || isNaN(count) || count < 0) {
			throw new Error(`Invalid array length ${count_str}`);
		}
	}
	ensure_token(ctx, 'symbol', ']');
	return {
		subtype: left,
		count,
		type: 'array_type',
	};
}

export function parse_member_type_pattern (ctx: ParserContext, left: TypePattern): MemberTypePattern {
	ensure_token(ctx, 'symbol', '.');
	const member = ensure_token(ctx, 'identifier').value;
	return {
		type: 'member_type',
		object: left,
		member,
	};
}

export function parse_generic_type_pattern (ctx: ParserContext, left: TypePattern): GenericTypePattern {
	ensure_token(ctx, 'symbol', ':');
	ensure_token(ctx, 'symbol', '<');
	const subtypes = [];

	ensure_token(ctx, 'symbol', '<');

	while (match_token(ctx, 'symbol', '>') === false) {
		if (!tokens_remaining(ctx)) {
			unexpected_end_of_input();
		}
		subtypes.push(parse_type_pattern(ctx));
		if (!match_token(ctx, 'symbol', ',')) {
			break;
		}
		consume_token(ctx);
	}

	ensure_token(ctx, 'symbol', '>');

	return {
		type: 'generic_type',
		object: left,
		subtypes,
	};
}