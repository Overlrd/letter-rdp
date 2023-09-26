/**
 * Letter parser: recursive descent implementation
 */

const {Tokenizer} = require('./Tokenizer');

class Parser {
	/**
	 * Parses a string into an AST 
	 */
	constructor() {
		this._string = '';
		this._tokenizer = new Tokenizer();
	}
	parse(string){
		this._string = string; 
		this._tokenizer.init(string);
		this._lookahead = this._tokenizer.getNextToken()
		// Prime the tokennizer to obtain the first token
		// which is our lookahaead. The lookahead is used for predictive parsing.

		return this.Program();
	}
	/**
	 *Main entry point
	 * Program
	 * 	: Literal
	 */
	Program() {
		return {
			type : 'program',
			body : this.Literal()
		}
	}
	/**
	* Literal
	*	:NumericLiteral
	*	:StringLiteral
	*/
	Literal() {
		switch (this._lookahead.type) {
			case 'NUMBER': return this.NumericLiteral();
			case 'STRING': return this.StringLiteral();
		}
		throw new SyntaxError(`Literal: unexpected literal production`);
	}
	/** NummericLiteral
	* 	: Number
	*/
	NumericLiteral() {
		// eat will consume the current token an advance the tokenizer to the next token
		const token = this._eat('NUMBER');
		return {
			type: 'NumericLiteral',
			value: Number(token.value),
		}
	}
	/** NummericLiteral
	* 	: Number
	*/
	StringLiteral() {
		// eat will consume the current token an advance the tokenizer to the next token
		const token = this._eat('STRING');
		return {
			type: 'StingLiteral',
			value: token.value.slice(1, -1),
		};
	}
	/** 
	* Expects a token of a given type
	*/
	_eat(tokenType) {
		const token = this._lookahead;

		if (token == null) {
			throw new SyntaxError(
				`Unexpected end of input , expected "${tokenType}"`,
			);
		}
		if (token.type !== tokenType) {
			throw new SyntaxError(
				`Unexpected token "${token.value}", expected "${tokenType}" ` 
			);
		}
		// Advance to the next token
		this._lookahead = this._tokenizer.getNextToken();
		// return the current token
		return token;
	}
}

module.exports = {
	Parser,
};
