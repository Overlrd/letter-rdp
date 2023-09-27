/**
 * Tokenizer Spec
 */

const Spec = [
	// --------------
	// WHITESPACES
	[/^\s+/, null],
	// ---------------
	// COMMENTS
	[/^\/\/.*/, null],
	[/^\/\*[\s\S]*?\*\//, null],
	// --------------
	// SYMBOLS
	[/^;/, ';'],
	[/^\{/, '{'],
	[/^\}/, '}'],
	[/^\(/, '('],
	[/^\)/, ')'],

	// ---------------
	// MATH OPERATORS + , -, * , /
	[/^[+\-]/, 'ADDITIVE_OPERATOR'],
	[/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
	// --------------
	// NUMBERS
	[/^\d+/, 'NUMBER'],
	// --------------
	// STRINGS
	[/^"[^"]*"/, 'STRING'],
	[/^'[^']*'/, 'STRING']
];


/**
	* Tokenizer Class
	* Lazily pulls a token from a stream
*/

class Tokenizer {
	init(string) {
		this._string = string;
		this._cursor = 0;
	}

	isEOF(){
		return this._curosr === this._string.length;
	}

	/** 
	 * whether we have more tokens
	 */
	hasMoreTokens() {
		return this._cursor < this._string.length;
	}
	/**
	 * Obtains the next token
	 */
	getNextToken() {
		if (!this.hasMoreTokens()){
			return null;

		}
		const string = this._string.slice(this._cursor);
		for (const [regexp, tokenType] of Spec) {
			const tokenValue = this._match(regexp, string);

			// If no match, continue 
			if (tokenValue == null) {
				continue;
			}
			// we skip whitespaces
			if (tokenType == null) {
				return this.getNextToken()
			}

			return {
				type: tokenType,
				value: tokenValue,
			};
			
		}
		throw new SyntaxError(`Unexpected token  "${string[0]}" `);
	}

	_match(regexp, string) {
		const matched = regexp.exec(string);
		if (matched == null) {
			return null
		}
		this._cursor += matched[0].length;
		return matched[0];
	}

}

module.exports = {
	Tokenizer,
};
