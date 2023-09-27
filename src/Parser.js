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
	 * 	: StatementList
	 * The preogram return now a StatementList which is a List of statements
	 */
	Program() {
		return {
			type : 'Program',
			body : this.StatementList(),
		}
	}
	/**
	 * StatementList
	 *	:Statement 
	 *	:StatementList
	 * A statement can contain one or many statements
	 *
	 */
	
	StatementList(stopLookahead = null) {
		const statementList = [this.Statement()];
		while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
			statementList.push(this.Statement());
		}
		return statementList;
	}

	/**
	 * Statement 
	 *	:ExpressionStatement
	 *	:BlockStatement
	 *	:EmptyStatement
	*/

	Statement() {
		switch (this._lookahead.type) {
			case ';': return this.EmptyStatement();
			case '{': return this.BlockStatement();
			default: return this.ExpressionStatement();
		}
	}

	/**
	 * EmptyStatement
	 */
	EmptyStatement() {
		this._eat(';');
		return {
			type: 'EmptyStatement',
		}
	}
	/**
	 * BlockStatement
	 *	:'{' OptStatementList '}'
	 */
	BlockStatement() {
		this._eat('{');
		const body = this._lookahead.type !== '}' ? this.StatementList('}'): [];
		this._eat('}')
		return {
			type: 'BlockStatement',
			body,
		}
	}


	/**
	 * ExpressionStatement
	 *	:Expression ';'
	 * An expression statement is a statement followed by a ';'
	 * To do so , we return the current Expression (assuming the statement won't start with a ';')
	 * and eat() the ';' which will have the effect of confirming we reach the end of new statement so we can return it 
	 * or signal if there's another value at the place of the ';' or there's no more tokens
	 */

	ExpressionStatement() {
		const expression = this.Expression();
		this._eat(';');
		return {
			type: 'ExpressionStatement',
			expression,
		};
	}

	/*
	 * Expression
	 *	:Literal
	 * After we eat the ';'(skipped it), we call the Literal to return the current token,
	 * remenber we loop until there's no more tokens, or the eat() function encounter throw an error
	 */
	Expression () {
		return this.AdditiveExpression();
	}
	/**
	 * AdditiveExpression
	 *	:Literal
	 *	:AdditiveExpression ADDITIVE_OPERATOR Literal => Literal ADDITIVE_OPERATOR Literal ADDITIVE_OPERATOR Literal
	 */
	AdditiveExpression() {
		let left = this.Literal();
		while (this._lookahead.type === 'ADDITIVE_OPERATOR') {
			const operator = this._eat('ADDITIVE_OPERATOR').value;
			const right = this.Literal();

			left = {
				type: 'BinaryExpression',
				operator,
				left,
				right,
			};
		}
		return left;
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
			type: 'StringLiteral',
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
