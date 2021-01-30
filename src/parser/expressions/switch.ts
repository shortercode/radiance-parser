import { parse_expression } from '../expression';
import { consume_token, ensure_token, match_token, tokens_remaining } from '../parser_context';
import { parse_sequence } from '../sequence';
import { parse_block_expression } from './block_expression';
import type { ParserContext } from '../parser_context.type';
import type { BlockExpression, SwitchExpression, SwitchExpressionCase } from '../expression.type';

export function parse_switch_expression (ctx: ParserContext): SwitchExpression {
	const { start } = ensure_token(ctx, 'identifier', 'switch');
	const parameter = parse_expression(ctx, 2);
	let default_case: BlockExpression | null = null;

	const { end, elements } = parse_sequence<SwitchExpressionCase>(ctx, ['{', '}'], (ctx: ParserContext) => {

		if (match_token(ctx, 'identifier', 'default')) {
			consume_token(ctx);
			if (default_case) {
				throw new Error('Cannot define more than 1 default case');
			}
			default_case = parse_block_expression(ctx);
			return null;
		} else {
			const conditions = [];
			ensure_token(ctx, 'identifier', 'case');
		
			while (tokens_remaining(ctx)) {
				const condition = parse_expression(ctx, 12); // should limit this to number, string, bool, identifier
				switch (condition.type) {
				case 'number_expression':
				case 'string_expression':
				case 'boolean_expression':
				case 'identifier_expression':
					conditions.push(condition);
					break;
				default:
					throw new Error('Unexpected expression type for switch case condition');
				}
				if (match_token(ctx, 'symbol', ',')) {
					consume_token(ctx);
				} else {
					break;
				}
			}
		
			if (match_token(ctx, 'identifier', 'as')) {
				consume_token(ctx);
				if (match_token(ctx, 'symbol', '{')) {
					const { elements: fields } = parse_sequence(ctx, ['{', '}'], ctx => 
						ensure_token(ctx, 'identifier').value
					);
					const block = parse_block_expression(ctx);
					return {
						style: 'destructure',
						conditions,
						fields,
						block,
					};
				} else {
					const identifier = ensure_token(ctx, 'identifier').value;
					const block = parse_block_expression(ctx);
					return {
						style: 'cast',
						conditions,
						identifier,
						block,
					};
				}
			}
			else {
				const block = parse_block_expression(ctx);
				return { conditions, style: 'match', block };
			}
		}
	});

	return {
		type: 'switch_expression',
		start,
		end,
		parameter,
		cases: elements,
		default_case
	};
}