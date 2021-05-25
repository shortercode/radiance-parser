import type { Position } from '@radlang/ast';

export interface Sequence<T> {
	start: Position;
	end: Position;
	elements: T[];
}