module.exports = test => {
	// Addition
	// Left: 2
	// Right: 2
	test(`2 + 2;`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'BinaryExpression',
					operator: '+',
					left: { type: 'NumericLiteral', value: 2 },
					right: { type: 'NumericLiteral', value: 2 }
				}
			}
		]
	}),
	// Addition
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
						left: { type: 'NumericLiteral', value: 3 },
						right: { type: 'NumericLiteral', value: 2 }
					},
					right: { type: 'NumericLiteral', value: 2 }
				}
			}
		]
	}
	);
	//Precedence od operation 
	test(`2 + 2 * 2;`, {
		type: 'Program',
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'BinaryExpression',
					operator: '+',
					left: { type: 'NumericLiteral', value: 2 },
					right: {
						type: 'BinaryExpression',
						operator: '*',
						left: { type: 'NumericLiteral', value: 2 },
						right: { type: 'NumericLiteral', value: 2 }
					}
				}
			}
		]
	});
	
	// Precedence of operation
	test(`(2 + 2) * 2;`, {
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'BinaryExpression',
        operator: '*',
        left: {
          type: 'BinaryExpression',
          operator: '+',
          left: { type: 'NumericLiteral', value: 2 },
          right: { type: 'NumericLiteral', value: 2 }
        },
        right: { type: 'NumericLiteral', value: 2 }
      }
    }
  ]
});

}
