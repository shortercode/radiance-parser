import type { ValueDescription } from '@radlang/ast';

export interface TypePattern {
	type: string;
}

export interface ClassTypePattern extends TypePattern {
	type: 'class_type';
	name: string;
}

export interface ArrayTypePattern extends TypePattern {
	type: 'array_type';
	subtype: TypePattern;
	count: number;
}

export interface MemberTypePattern extends TypePattern {
	type: 'member_type';
	object: TypePattern;
	member: string; 
}

export interface TupleTypePattern extends TypePattern {
	type: 'tuple_type';
	subtypes: TypePattern[];
}

export interface GenericTypePattern extends TypePattern {
	type: 'generic_type';
	object: TypePattern;
	subtypes: TypePattern[];
}

export interface FunctionParameter {
	name: string;
	type_pattern: TypePattern;
}

export interface FunctionTypePattern extends TypePattern {
	type: 'function_type';
	name: string;
	parameters: ValueDescription[];
	result: TypePattern | null;
}