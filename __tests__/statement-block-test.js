module.exports = test => {
	test(`
	{
		"hello";
	42;
	}
		`,{
			type: 'Program',
			body: [
				{
					type: 'BlockStatement',
					body: [
						{
							type: 'ExpressionStatement',
							expression: {
								type: 'StringLiteral',
								value: 'hello',
							}
						},
						{
							type: 'ExpressionStatement',
							expression: {
								type: 'NumericLiteral',
								value: 42,
							}
						}

					]
				}
			]
	}),
	// EMPTY BLOCK
	test(
		`{

		}`, {
			type: 'Program',
			body: [
				{
					type: 'BlockStatement',
					body: [],
				}
			]

	}),
	// NESTED BLOCKS
	test(`
	{
	42;
		{
		"hello";
		}
	}
		`, {
			type: 'Program',
			body: [
				{
					type: 'BlockStatement',
					body: [
						{
							type: 'ExpressionStatement',
							expression: {
								type: 'NumericLiteral',
								value: 42,
							}
						},
						{
							type: 'BlockStatement',
							body: [
								{
									type: 'ExpressionStatement',
									expression: {
										type: 'StringLiteral',
										value: 'hello',
									}
								},
							]
						}
					]
				}
			]
	})
}
