import { parse_expression } from '../expression';
import { consume_token, ensure_token, match_token } from '../parser_context';
import { parse_sequence } from '../sequence';
import type { ParserContext } from '../parser_context.type';
import type { TypePattern } from '../type_pattern.type';
import type { ConstructorExpression, Expression } from '../expression.type';

export function parse_constructor_expression (ctx: ParserContext, callee: Expression, generics: TypePattern[] = []): ConstructorExpression {
	const { start } = callee;
	const { elements, end } = parse_sequence(ctx, ['{', '}'], ctx => {
		const name = ensure_token(ctx, 'identifier').value;
		let value = null;
		if (match_token(ctx, 'symbol', ':')) {
			consume_token(ctx);
			value = parse_expression(ctx); 
		}
		return {
			name,
			value
		};
	});
	return {
		type: 'constructor_expression',
		generics,
		callee,
		elements,
		start,
		end,
	};
}