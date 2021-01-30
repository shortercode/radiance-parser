import { ensure_token, match_token } from '../parser_context';
import { parse_sequence } from '../sequence';
import { parse_type_pattern } from '../type_pattern';
import { parse_constructor_expression } from './constructor';
import { parse_expression_sequence } from './expression_sequence';
import type { ParserContext } from '../parser_context.type';
import type { TypePattern } from '../type_pattern.type';
import type { CallExpression, ConstructorExpression, Expression } from '../expression.type';

export function parse_call_expression (ctx: ParserContext, callee: Expression, type_arguments: TypePattern[] = []): CallExpression {
	const { start } = callee;
	const { elements, end } = parse_expression_sequence(ctx, ['(', ')']);
	return {
		type: 'call_expression',
		start,
		end,
		callee: callee,
		generics: type_arguments,
		arguments: elements,
	};
}

export function parse_generic_call_expression (ctx: ParserContext, left: Expression): CallExpression | ConstructorExpression {
	ensure_token(ctx, 'symbol', ':');
	const { elements } = parse_sequence(ctx, ['<', '>'], ctx => parse_type_pattern(ctx));

	if (match_token(ctx, 'symbol', '{')) {
		return parse_constructor_expression(ctx, left, elements);
	} else {
		return parse_call_expression(ctx, left, elements);
	}
}