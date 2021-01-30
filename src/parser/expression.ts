import { unexpected_end_of_input, unexpected_token } from '../scanner/error';
import { add_infix_parselet, add_prefix_parselet, get_infix_parselet, get_prefix_parselet } from './parselets';
import { peek_token, tokens_remaining } from './parser_context';
import type { Expression } from './expression.type';
import type { ParserContext } from './parser_context.type';
import { parse_constructor_expression } from './expressions/constructor';
import {
	parse_add_expression,
	parse_assignment_expression,
	parse_bitshift_left_expression,
	parse_bitshift_right_expression,
	parse_bitwise_and_expression,
	parse_bitwise_or_expression,
	parse_divide_expression,
	parse_equals_expression,
	parse_greater_than_expression,
	parse_greater_than_or_equals_expression,
	parse_less_than_expression,
	parse_less_than_or_equals_expression,
	parse_logical_and_expression,
	parse_logical_or_expression,
	parse_multiply_expression,
	parse_not_equals_expression,
	parse_remainder_expression
} from './expressions/binary';
import { parse_subscript_expression } from './expressions/subscript';
import { parse_not_expression } from './expressions/not';
import { parse_if_expresson } from './expressions/if';
import { parse_block_expression } from './expressions/block_expression';
import { parse_array_expression } from './expressions/array';
import { parse_while_expression } from './expressions/while';
import { parse_unsafe_expression } from './expressions/unsafe';
import { parse_switch_expression } from './expressions/switch';
import { parse_call_expression, parse_generic_call_expression } from './expressions/call';
import { parse_member_expression } from './expressions/member';
import { parse_grouping_expression } from './expressions/grouping';
import { parse_type_cast_expression } from './expressions/type_cast';
import { parse_boolean_expression, parse_identifier_expression, parse_number_expression, parse_string_expression } from './expressions/literal';

add_infix_parselet('symbol:{', 1, parse_constructor_expression);

add_infix_parselet('symbol:=', 2, parse_assignment_expression);

add_infix_parselet('identifier:and', 3, parse_logical_and_expression);
add_infix_parselet('identifier:or', 3, parse_logical_or_expression);

add_infix_parselet('symbol:==', 4, parse_equals_expression);
add_infix_parselet('symbol:!=', 4, parse_not_equals_expression);

add_infix_parselet('symbol:<', 5, parse_less_than_expression);
add_infix_parselet('symbol:>', 5, parse_greater_than_expression);
add_infix_parselet('symbol:<=', 5, parse_less_than_or_equals_expression);
add_infix_parselet('symbol:>=', 5, parse_greater_than_or_equals_expression);

add_infix_parselet('symbol:+', 6, parse_add_expression);
add_infix_parselet('symbol:-', 6, parse_subscript_expression);
add_infix_parselet('symbol:|', 6, parse_bitwise_or_expression);

add_infix_parselet('symbol:*', 7, parse_multiply_expression);
add_infix_parselet('symbol:/', 7, parse_divide_expression);
add_infix_parselet('symbol:%', 7, parse_remainder_expression);
add_infix_parselet('symbol:&', 7, parse_bitwise_and_expression);

add_infix_parselet('symbol:<<', 8, parse_bitshift_left_expression);
add_infix_parselet('symbol:>>', 8, parse_bitshift_right_expression);

add_prefix_parselet('identifier:not', 9, parse_not_expression);
add_prefix_parselet('identifier:if', 9, parse_if_expresson);
add_prefix_parselet('symbol:{', 9, parse_block_expression);
add_prefix_parselet('symbol:[', 9, parse_array_expression);
add_prefix_parselet('identifier:while', 9, parse_while_expression);
add_prefix_parselet('identifier:unsafe', 9, parse_unsafe_expression);
add_prefix_parselet('identifier:switch', 9, parse_switch_expression);

add_infix_parselet('symbol:(', 10, parse_call_expression);
add_infix_parselet('symbol:[', 10, parse_subscript_expression);
add_infix_parselet('symbol:.', 10, parse_member_expression);
add_infix_parselet('symbol::', 10, parse_generic_call_expression);

add_prefix_parselet('symbol:(', 11, parse_grouping_expression);

add_infix_parselet('identifier:as', 12, parse_type_cast_expression);
add_prefix_parselet('number', 12, parse_number_expression);
add_prefix_parselet('string', 12, parse_string_expression);
add_prefix_parselet('identifier', 12, parse_identifier_expression);
add_prefix_parselet('identifier:true', 12, parse_boolean_expression);
add_prefix_parselet('identifier:false', 12, parse_boolean_expression);

export function parse_expression(ctx: ParserContext, precedence = 0): Expression {
	let left = parse_prefix_expression(ctx);

	while (tokens_remaining(ctx)) {
		const next = parse_infix_expression(ctx, left, precedence);
		if (next) {
			left = next;
		}
		else {
			break;
		}
	}

	return left;
}

export function parse_prefix_expression(ctx: ParserContext): Expression {
	const token = peek_token(ctx);
	if (!token) {
		unexpected_end_of_input();
	}
	const parselet_info = get_prefix_parselet(token);
	if (!parselet_info) {
		unexpected_token(token.value);
	}
	const { precedence, parselet } = parselet_info;

	return parselet(ctx, precedence);
}

export function parse_infix_expression(ctx: ParserContext, left: Expression, parent_precedence: number): Expression | null {
	const token = peek_token(ctx);
	if (!token) {
		return null;
	}
	const parselet_info = get_infix_parselet(token, ctx);
	if (!parselet_info) {
		return null;
	}
	
	const { precedence, parselet } = parselet_info;
	return parent_precedence < precedence ? parselet(ctx, left, precedence) : null;
}