// Import the Parser class from the specified path
const { Parser } = require('../src/Parser');
const assert = require('assert');

/**
 * List of tests
 */
const tests = [require('./literals-test.js')];

const parser = new Parser();

/**
 * For manual tests
 */
function exec() {
	const program = 
		`/**
		* Documentation comment;
		*/ 
		'hello world!';
		// number
		42;`;
	const ast = parser.parse(program);
	console.log(JSON.stringify(ast, null, 2));
}
/** 
 * test function 
 */
function test(program, expected) {
	const ast = parser.parse(program);
	assert.deepEqual(ast, expected)
}

// Run all tests

tests.forEach(testRun => testRun(test));
console.log("All assertions passed")
