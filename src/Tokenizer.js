// It's goal is to extract stream of tokens of different types

class Tokenizer {
	init(string) {
		this._string = string,
		this._cursor = 0;
	}

	isEOF(){
		return this._curosr === this._string.length;
	}

	// whether we have more tokens
	hasMoreTokens() {
		return this._cursor < this._string.length;
	}
	getNextToken() {
		if (!this.hasMoreTokens()){
			return null;

		}

		const string = this._string.slice(this._cursor);

		//Numbers
		//if char at index cursor is not nan , loop on next numbers until a non numeric token
		if (!Number.isNaN(Number(string[0]))) {
			let number = ''
			while (!Number.isNaN(Number(string[this._cursor]))) {
				number += string[this._cursor++];
			}
			return {
				type: 'NUMBER',
				value: number
			}
		}
		if (string[0] == '"' || string[0] == "'") {
			let mark = `${string[0]}`;
			let s = '';
			do {
			s += string[this._cursor++];
			}while (string[this._cursor] !== mark && !this.isEOF()); 
			s += string[this._cursor++];
			return {
				type: 'STRING',
				value: s,
			}
		}
		return null
	}
}

module.exports = {
	Tokenizer,
};
