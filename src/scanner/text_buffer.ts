import { consume_char } from './scan_context';
import { ScanContext } from './scan_context.type';
import { TextBuffer } from './text_buffer.type';

export function buffer_start(buffer: TextBuffer, ctx: ScanContext): void {
	buffer.start = ctx.index;
	buffer.length = 0;
}

export function buffer_append(buffer: TextBuffer, ctx: ScanContext): void {
	consume_char(ctx);
	buffer.length += 1;
}

export function buffer_consume(buffer: TextBuffer, ctx: ScanContext): string {
	const { start, length } = buffer;
	const value = ctx.source.slice(start, start + length).join('');
	buffer.length = 0;
	return value;
}