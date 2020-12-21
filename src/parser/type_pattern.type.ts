export interface TypePattern {
	type: `${string}_type`;
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