import { parse } from './parser';

describe('parser', () => {
	it('parses an empty module', () => {
		expect(parse([])).toEqual({
			type: 'module',
			start: {
				column: 1,
				row: 1,
			},
			end: {
				column: 1,
				row: 1,
			},
			body: [],
		});
	});
});
