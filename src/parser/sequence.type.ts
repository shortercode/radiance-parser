import type { Position } from '../scanner/position.type';

export interface Sequence<T> {
	start: Position;
	end: Position;
	elements: T[];
}