import type { Position } from '../scanner/position.type';
import type { Statement } from './statements.type';
import type { TypePattern } from './type_pattern.type';

export interface BasicExpression {
	start: Position;
	end: Position;
	type: string;
}

export interface BinaryExpression<T extends string> extends BasicExpression {
	type: T;
	left: Expression;
	right: Expression;
}

export type AddExpression = BinaryExpression<'add_expression'>;
export type SubtractExpression = BinaryExpression<'subtract_expression'>;
export type MultiplyExpression = BinaryExpression<'multiply_expression'>;
export type DivideExpression = BinaryExpression<'divide_expression'>;
export type AssignmentExpression = BinaryExpression<'assignment_expression'>;
export type LogicalAndExpression = BinaryExpression<'logical_and_expression'>;
export type LogicalOrExpression = BinaryExpression<'logical_or_expression'>;
export type EqualsExpression = BinaryExpression<'equals_expression'>;
export type NotEqualsExpression = BinaryExpression<'not_equals_expression'>;
export type LessThanExpression = BinaryExpression<'less_than_expression'>;
export type GreaterThanExpression = BinaryExpression<'greater_than_expression'>;
export type LessThanOrEqualsExpression = BinaryExpression<'less_than_or_equals_expression'>;
export type GreaterThanOrEqualsExpression = BinaryExpression<'greater_than_or_equals_expression'>;
export type BitwiseOrExpression = BinaryExpression<'bitwise_or_expression'>;
export type RemainderExpression = BinaryExpression<'remainder_expression'>;
export type BitwiseAndExpression = BinaryExpression<'bitwise_and_expression'>;
export type BitshiftLeftExpression = BinaryExpression<'bitshift_left_expression'>;
export type BitshiftRightExpression = BinaryExpression<'bitshift_right_expression'>;

export interface LiteralExpression<T extends string> extends BasicExpression {
	type: T;
	value: string;
}

export type NumberLiteralExpression = LiteralExpression<'number_expression'>;
export type StringLiteralExpression = LiteralExpression<'string_expression'>;
export type BooleanLiteralExpression = LiteralExpression<'boolean_expression'>;
export type IdentifierLiteralExpression = LiteralExpression<'identifier_expression'>;

export interface ConstructorExpression extends BasicExpression {
	type: 'constructor_expression';
	elements: { name: string; value: Expression | null }[];
	generics: TypePattern[];
	callee: Expression;
}

export interface NotExpression extends BasicExpression {
	type: 'not_expression';
	expression: Expression;
}

export interface IfExpression extends BasicExpression {
	type: 'if_expression';
	condition: Expression;
	then_block: BlockExpression;
	else_block: BlockExpression | IfExpression | IfLetExpression | null;
}

export interface IfLetExpression extends BasicExpression {
	type: 'if_let_expression';
	variable_name: string;
	condition: Expression;
	then_block: BlockExpression;
	else_block: BlockExpression | IfExpression | IfLetExpression | null;
}

export interface BlockExpression extends BasicExpression {
	type: 'block_expression';
	statements: Statement[];
}

export interface ArrayLiteralExpression extends BasicExpression {
	type: 'array_literal_expression';
	elements: Expression[];
}

export interface WhileExpression extends BasicExpression {
	type: 'while_expression';
	condition: Expression;
	block: BlockExpression;
}

export interface UnsafeExpression extends BasicExpression {
	type: 'unsafe_expression';
	block: BlockExpression;
}

export interface SwitchExpressionCaseBase {
	block: BlockExpression;
	conditions: LiteralExpression<'number_expression' | 'identifier_expression' | 'boolean_expression' | 'string_expression'>[];
	style: string;
}

export interface SwitchExpressionCaseMatch extends SwitchExpressionCaseBase {
	style: 'match';
}

export interface SwitchExpressionCaseCast extends SwitchExpressionCaseBase {
	style: 'cast';
	identifier: string;
}

export interface SwitchExpressionCaseDestructure extends SwitchExpressionCaseBase {
	style: 'destructure';
	fields: string[]
}

export type SwitchExpressionCase = SwitchExpressionCaseMatch | SwitchExpressionCaseCast | SwitchExpressionCaseDestructure;

export interface SwitchExpression extends BasicExpression {
	type: 'switch_expression';
	parameter: Expression;
	default_case: BlockExpression | null;
	cases: SwitchExpressionCase[];
}

export interface CallExpression extends BasicExpression {
	type: 'call_expression';
	callee: Expression;
	generics: TypePattern[];
	arguments: Expression[];
}

export interface SubscriptExpression extends BasicExpression {
	type: 'subscript_expression';
	expression: Expression;
	member: Expression;
}

export interface MemberExpression extends BasicExpression {
	type: 'member_expression';
	expression: Expression;
	member: string;
}

export interface GroupExpression extends BasicExpression {
	type: 'group_expression';
	expression: Expression;
}

export interface CastExpression extends BasicExpression {
	type: 'cast_expression';
	expression: Expression;
	type_pattern: TypePattern;
}

export interface TupleExpression extends BasicExpression {
	type: 'tuple_expression';
	elements: Expression[];
}

export type Expression = AddExpression
	| SubtractExpression
	| MultiplyExpression
	| DivideExpression
	| AssignmentExpression
	| LogicalAndExpression
	| LogicalOrExpression
	| EqualsExpression
	| NotEqualsExpression
	| LessThanExpression
	| GreaterThanExpression
	| LessThanOrEqualsExpression
	| GreaterThanOrEqualsExpression
	| BitwiseOrExpression
	| RemainderExpression
	| BitwiseAndExpression
	| BitshiftLeftExpression
	| BitshiftRightExpression
	| NumberLiteralExpression
	| StringLiteralExpression
	| BooleanLiteralExpression
	| IdentifierLiteralExpression
	| ConstructorExpression
	| NotExpression
	| IfExpression
	| IfLetExpression
	| BlockExpression
	| ArrayLiteralExpression
	| WhileExpression
	| UnsafeExpression
	| SwitchExpression
	| CallExpression
	| SubscriptExpression
	| MemberExpression
	| GroupExpression
	| CastExpression
	| TupleExpression;