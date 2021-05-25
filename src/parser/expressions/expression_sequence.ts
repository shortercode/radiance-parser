import { parse_expression } from '../expression';
import { parse_sequence } from '../sequence';

import type { ParserContext } from '../parser_context.type';
import type { Expression } from '@radlang/ast';
import type { Sequence } from '../sequence.type';

export function parse_expression_sequence (ctx: ParserContext, delimiter: [string, string], precedence = 0): Sequence<Expression> {
	return parse_sequence(ctx, delimiter, ctx => parse_expression(ctx, precedence));
}