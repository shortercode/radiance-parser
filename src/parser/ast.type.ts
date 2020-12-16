import { Position } from '../scanner/position.type';

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

export interface ModuleStatement extends Statement {
	type: 'module_statement';
	body: Statement[];
}