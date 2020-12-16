# Radiance Parser

A parser for the Radiance programming language. Transforms a string into it's equivilent abstract syntax tree (AST).

Composed of 2 key parts: the scanner and the parser. The scanner breaks the string into easily consumable tokens, and the parser interprets those tokens to produce the AST. 

Both parts are publically exposed to be utilised as required. Although this library is primarily intended to be used by the compiler.