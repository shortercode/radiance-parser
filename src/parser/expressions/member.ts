import { consume_token, ensure_token, match_token } from '../parser_context';

import type { Expression, MemberExpression } from '@radlang/ast';
import type { ParserContext } from '../parser_context.type';

export function parse_member_expression (ctx: ParserContext, left: Expression): MemberExpression {
	const { start } = ensure_token(ctx, 'symbol', '.');
	if (match_token(ctx, 'identifier')) {
		const { value, end } = consume_token(ctx);
		return {
			type:'member_expression',
			start,
			end,
			expression: left,
			member: value,
		};
	} else {
		const { value, end } = ensure_token(ctx, 'number');
		// NOTE in the case of something like a.0.0 it will be read as 3 tokens
		// 'a' '.' '0.0' as the last is interpretted as a float. This cannot easily
		// be changed, so in this case we attempt to detect it here and split the
		// float
		if (value.includes('.')) {
			const [a, b] = value.split('.');
			const end_a = {
				column: end.column,
				row: end.row - (1 + b.length)
			};
			const inner: MemberExpression = {
				start,
				end: end_a,
				type: 'member_expression',
				expression: left,
				member: a,
			};
			return {
				type: 'member_expression',
				start,
				end,
				expression: inner,
				member: b,
			};
		}

		return {
			type:'member_expression',
			start,
			end,
			expression: left,
			member: value,
		};
	}
}