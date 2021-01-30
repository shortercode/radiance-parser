import type { Position } from '../scanner/position.type';
import type { Statement } from './statements.type';

export interface Module {
	start: Position;
	end: Position;
	type: 'module';
	body: Statement[];
}