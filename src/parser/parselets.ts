import type { Token } from '../scanner/token.type';
import type { InfixParselet, InfixParseletTrieNode, ParseletInfo, PrefixParselet, PrefixParseletTrieNode, TokenPattern } from './parser.type';
import type { ParserContext } from './parser_context.type';
import { peek_token } from './parser_context';
import { read_pattern } from './token_pattern';
import { unexpected_token } from '../scanner/error';

const INFIX_PARSELET_ROOT: Map<TokenPattern, InfixParseletTrieNode> = new Map;
const PREFIX_PARSELET_ROOT: Map<TokenPattern, PrefixParseletTrieNode> = new Map;

export function add_prefix_parselet (pattern: TokenPattern, precedence: number, parselet: PrefixParselet): void {
	if (PREFIX_PARSELET_ROOT.has(pattern)) {
		throw new Error(`A prefix parselet with the pattern ${pattern} has already been registered`);
	}
	// NOTE we only ever match prefix on 1 token, so we can get away with this simpler version for now
	// see add_infix_parselet for the more complex variant
	PREFIX_PARSELET_ROOT.set(pattern, {
		parselet,
		precedence
	});
}

export function add_infix_parselet (pattern: TokenPattern, precedence: number, parselet: InfixParselet): void {
	const { type, value } = read_pattern(pattern);
	const patterns = type !== 'symbol' ? [ pattern ] : (value?.split('').map(ch => `symbol:${ch}` as TokenPattern) ?? [ 'symbol' ]); 
	
	const last = patterns.pop();

	if (!last) {
		throw new Error(`Invalid pattern ${pattern}`);
	}

	let current_node = INFIX_PARSELET_ROOT;
	// construct the non-leaf nodes
	for (const pattern of patterns) {
		let next_node = current_node.get(pattern);
		if (!next_node) {
			next_node = {};
			current_node.set(pattern, next_node);
		}
		if (!next_node.children) {
			next_node.children = new Map();
		}
		current_node = next_node.children;
	}

	if (current_node.has(last)) {
		throw new Error(`A parselet already exists for pattern ${pattern}`);
	}

	const parselet_info = {
		precedence,
		parselet
	};
	current_node.set(last, {
		parselet_info
	});
}

export function get_prefix_parselet (token: Token): ParseletInfo<PrefixParselet> | null {
	const { type, value } = token;
	// NOTE pattern matches TokenPattern, but is resolved as string, so it must be cast
	// hopefully in future TS will fix this and we can ditch the cast.
	const pattern = `${type}:${value}` as TokenPattern;
	
	const node = PREFIX_PARSELET_ROOT.get(pattern) ?? PREFIX_PARSELET_ROOT.get(type);

	return node ? node : null;
}

export function get_infix_parselet (token: Token, ctx: ParserContext): ParseletInfo<InfixParselet> | null {
	const { type, value } = token;
	// NOTE pattern matches TokenPattern, but is resolved as string, so it must be cast
	// hopefully in future TS will fix this and we can ditch the cast.
	const pattern = `${type}:${value}` as TokenPattern;
	const node = INFIX_PARSELET_ROOT.get(pattern) ?? INFIX_PARSELET_ROOT.get(type);

	if (!node) {
		return null;
	}

	const { children, parselet_info } = node;

	// limited to matching 2 tokens for the time being
	if (children) {
		const token = peek_token(ctx, 1);
		if (token) {
			// repeat matching check for second token
			const { type, value } = token;
			const pattern = `${type}:${value}` as TokenPattern;
			const subnode = children.get(pattern) ?? children.get(type);
			if (subnode && subnode.parselet_info) {
				return subnode.parselet_info;
			}
		}
	}

	if (parselet_info) {
		return parselet_info;
	}
	
	unexpected_token(token.value);
}