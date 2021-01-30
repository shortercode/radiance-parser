import type { Position } from '../scanner/position.type';
import type { BlockExpression, Expression } from './expression.type';
import type { FunctionTypePattern, TypePattern } from './type_pattern.type';

export interface BaseStatement {
	start: Position;
	end: Position;
	type: string;
}

export interface ValueDescription {
	type_pattern: TypePattern | null;
	name: string;
	initial?: Expression | null;
}

export interface ExpressionStatement extends BaseStatement {
	type: 'expression_statement';
	expression: Expression;
}

export interface ReturnStatement extends BaseStatement {
	type: 'return_statement';
	expression: Expression | null;
}

export interface FunctionDeclaration extends BaseStatement {
	type: 'function_declaration';
	name: string;
	type_pattern: FunctionTypePattern;
	generics: string[];
	block: BlockExpression;
	exported: boolean;
}

export interface StructDeclaration extends BaseStatement {
	type: 'struct_declaration';
	name: string;
	generics: string[];
	fields: ValueDescription[];
}

export interface EnumVariantDescription {
	name: string;
	fields: ValueDescription[];
}

export interface EnumDeclaration extends BaseStatement {
	type: 'enum_declaration';
	name: string;
	generics: string[];
	variants: EnumVariantDescription[];
}

export interface ExportDeclaration extends BaseStatement {
	type: 'export_declaration';
	name: string;
}

export interface ImportFunctionDeclaration extends BaseStatement {
	type: 'import_function_declaration';
	name: string;
	generics: string[];
	type_pattern: FunctionTypePattern;
}

export interface TypeDeclaration extends BaseStatement {
	type: 'type_declaration';
	type_pattern: TypePattern;
	name: string;
}

export interface LetDeclaration extends BaseStatement {
	type: 'let_declaration';
	description: ValueDescription;
}

export type Statement = ExpressionStatement
	| ReturnStatement
	| FunctionDeclaration
	| StructDeclaration
	| EnumDeclaration
	| ExportDeclaration
	| ImportFunctionDeclaration
	| TypeDeclaration
	| LetDeclaration;
	