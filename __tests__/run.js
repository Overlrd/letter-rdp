// Import the Parser class from the specified path
const { Parser } = require('../src/Parser');

// Create a new instance of the Parser class
const parser = new Parser();

const program = 
	`/**
	  * Documentation comment;
	  */ 
	'hello world!'
	42`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));

