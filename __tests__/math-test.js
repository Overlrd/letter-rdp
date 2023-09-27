module.exports = test => {
	// Addition
	test(`2 + 2;`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'BinaryExpression',
					operator: '+',
					left: {
						type: 'NumericLiteral',
						value: 2,
					},
					right: {
						type: 'NumericLiteral',
						value: 2,
					}
				}
			}
		]
	}),
	// NESTED BINARY OPERATIONS
	// LEFT: 3+2 
	// RIGHT: 2
	test(`3 + 2 - 2;`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'BinaryExpression',
					operator: '-',
					left: {
						type: 'BinaryExpression',
						operator: '+',
						left: {
							type: 'NumericLiteral',
							value: 3,
						},
						right: {
							type: 'NumericLiteral',
							value: 2
						}
					},
					right: {
						type: 'NumericLiteral',
						value: 2,
					}
				}
			}
		]
	})
}
