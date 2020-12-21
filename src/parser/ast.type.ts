import type { Position } from '../scanner/position.type';

export interface Expression {
	start: Position;
	end: Position;
	type: `${string}_expression`;
}

export interface Statement {
	start: Position;
	end: Position;
	type: `${string}_statement`;
}

export interface ExpressionStatement extends Statement {
	type: 'expression_statement';
	expression: Expression;
}

export interface Module {
	start: Position;
	end: Position;
	type: 'module';
	body: Statement[];
}

export interface FunctionStatement extends Statement {
	type: 'function_statement';
	type_pattern: TypePattern;
	body: Statement[];
	generics: string[];
}

export interface StructStatement extends Statement {
	type: 'struct_statement';
}

export interface EnumStatement extends Statement {
	type: 'enum_statement';
}

export interface ExportStatement extends Statement {
	type: 'export_statement';
}

export interface ImportStatement extends Statement {
	type: 'import_statement';
}

export interface TypeStatement extends Statement {
	type: 'type_statement';
}

export interface LetStatement extends Statement {
	type: 'let_statement';
}

export interface ReturnStatement extends Statement {
	type: 'return_statement';
}

export interface ConstructorExpression extends Expression {
	type: 'constructor_expression';
}

export interface AssignmentExpression extends Expression {
	type: 'assignment_expression';
}

export interface LogicalAndExpression extends Expression {
	type: 'logical_and_expression';
}

export interface LogicalOrExpression extends Expression {
	type: 'logical_or_expression';
}

export interface EqualsExpression extends Expression {
	type: 'equals_expression';
}

export interface NotEqualsExpression extends Expression {
	type: 'not_equals_expression';
}

export interface LessThanExpression extends Expression {
	type: 'less_than_expression'
}

export interface GreaterThanExpression extends Expression {
	type: 'greater_than_expression'
}

export interface LessThanOrEqualsExpression extends Expression {
	type: 'less_than_or_equals_expression'
}

export interface GreaterThanOrEqualsExpression extends Expression {
	type: 'greater_than_or_equals_expression'
}

export interface AddExpression extends Expression {
	type: 'add_expression'
}

export interface SubtractExpression extends Expression {
	type: 'subtract_expression'
}

export interface BitwiseOrExpression extends Expression {
	type: 'bitwise_or_expression'
}

export interface MultiplyExpression extends Expression {
	type: 'multiply_expression'
}

export interface DivideExpression extends Expression {
	type: 'divide_expression'
}

export interface RemainderExpression extends Expression {
	type: 'remainder_expression'
}

export interface BitwiseAndExpression extends Expression {
	type: 'bitwise_and_expression'
}

export interface BitshiftLeftExpression extends Expression {
	type: 'bitshift_left_expression'
}

export interface BitshiftRightExpression extends Expression {
	type: 'bitshift_right_expression'
}

export interface NotExpression extends Expression {
	type: 'not_expression'
}

export interface IfExpression extends Expression {
	type: 'if_expression'
}

export interface BlockExpression extends Expression {
	type: 'block_expression'
}

export interface ArrayLiteralExpression extends Expression {
	type: 'array_literal_expression'
}

export interface WhileExpression extends Expression {
	type: 'while_expression'
}

export interface UnsafeExpression extends Expression {
	type: 'unsafe_expression'
}

export interface SwitchExpression extends Expression {
	type: 'switch_expression'
}

export interface CallExpression extends Expression {
	type: 'call_expression'
}

export interface SubscriptExpression extends Expression {
	type: 'subscript_expression'
}

export interface MemberExpression extends Expression {
	type: 'member_expression'
}

export interface GroupExpression extends Expression {
	type: 'group_expression'
}

export interface CastExpression extends Expression {
	type: 'cast_expression'
}

export interface NumberLiteralExpression extends Expression {
	type: 'number_literal_expression'
}

export interface StringLiteralExpression extends Expression {
	type: 'string_literal_expression'
}

export interface IdentifierExpression extends Expression {
	type: 'identifier_expression'
}

export interface BooleanLiteralExpression extends Expression {
	type: 'boolean_literal_expression'
}