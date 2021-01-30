import { parse_expression } from '../expression';
import type { GroupExpression, TupleExpression } from '../expression.type';
import type { ParserContext } from '../parser_context.type';
import { parse_sequence } from '../sequence';

export function parse_grouping_expression (ctx: ParserContext): GroupExpression | TupleExpression {	
	const { start, end, elements } = parse_sequence(ctx, ['(', ')'], parse_expression);

	if (elements.length === 1) {
		return {
			type: 'group_expression',
			expression: elements[0],
			start,
			end,
		}; 
	}
	// WARN this does not allow for single element tuples in the form (0,)
	return {
		type: 'tuple_expression',
		elements,
		start,
		end
	};
}