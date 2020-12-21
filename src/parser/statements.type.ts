import type { Position } from '../scanner/position.type';
import type { Expression } from './ast.type';
import type { TypePattern } from './type_pattern.type';

export interface BaseStatement {
	start: Position;
	end: Position;
	type: `${string}_statement` | `${string}_declaration`;
}

export interface ExpressionStatement extends BaseStatement {
	type: 'expression_statement';
	expression: Expression;
}

export interface ReturnStatement extends BaseStatement {
	type: 'return_statement';
	expression: Expression;
}

export interface FunctionDeclaration extends BaseStatement {
	type: 'function_declaration';
	type_pattern: TypePattern;
	body: BaseStatement[];
	generics: string[];
}

export interface StructDeclaration extends BaseStatement {
	type: 'struct_declaration';
	// TODO
}

export interface EnumDeclaration extends BaseStatement {
	type: 'enum_declaration';
	// TODO
}

export interface ExportDeclaration extends BaseStatement {
	type: 'export_declaration';
	// TODO
}

export interface ImportDeclaration extends BaseStatement {
	type: 'import_declaration';
	// TODO
}

export interface TypeDeclaration extends BaseStatement {
	type: 'type_declaration';
	type_pattern: TypePattern;
	name: string;
}

export interface LetDeclaration extends BaseStatement {
	type: 'let_declaration';
	type_pattern: TypePattern | null;
	name: string;
	initial: Expression | null;
}

export type Statement = BaseStatement
	| ExpressionStatement
	| ReturnStatement
	| FunctionDeclaration
	| StructDeclaration
	| EnumDeclaration
	| ExportDeclaration
	| ImportDeclaration
	| TypeDeclaration
	| LetDeclaration;
	