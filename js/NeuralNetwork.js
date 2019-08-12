class NeuralNetwork {
	constructor(inputNodes, hiddenNodes, outputNodes, learningRate) {
		this.inputNodes = inputNodes;
		this.hiddenNodes = hiddenNodes;
		this.outputNodes = outputNodes;

		this.learningRate = learningRate;

		this.wih = Matrix.random(inputNodes, hiddenNodes, inputNodes);
		this.who = Matrix.random(hiddenNodes, outputNodes, outputNodes);

		this.activationFunction = Matrix.sigmoid;
	}

	train(inputArray, targetArray) {
		const inputs = Matrix.transpose([inputArray]);
		const targets = Matrix.transpose([targetArray]);

		const hiddenInputs = Matrix.dot(this.wih, inputs);
		const hiddenOutputs = this.activationFunction(hiddenInputs);

		const finalInputs = Matrix.dot(this.who, hiddenOutputs);
		const finalOutputs = this.activationFunction(finalInputs);

		const outputErrors = Matrix.subtract(targets, finalOutputs);
		const hiddenErrors = Matrix.dot(Matrix.transpose(this.who), outputErrors);

		const deltaWho = Matrix.multiplyScalar(
			Matrix.dot(
				Matrix.product(
					outputErrors,
					Matrix.product(
						finalOutputs,
						Matrix.addScalar(
							Matrix.multiplyScalar(finalOutputs, -1),
							1
						)
					)
				),
				Matrix.transpose(hiddenOutputs)
			),
			this.learningRate
		);
		// console.table(deltaWho);
 		this.who = Matrix.sum(this.who, deltaWho);

 		const deltaWih = Matrix.multiplyScalar(
			Matrix.dot(
				Matrix.product(
					hiddenErrors,
					Matrix.product(
						hiddenOutputs,
						Matrix.addScalar(
							Matrix.multiplyScalar(hiddenOutputs, -1),
							1
						)
					)
				),
				Matrix.transpose(inputs)
			),
			this.learningRate
		);
		// console.table(deltaWih);
 		this.wih = Matrix.sum(this.wih, deltaWih);
	}

	query(inputArray) {
		const inputs = Matrix.transpose([inputArray]);

		const hiddenInputs = Matrix.dot(this.wih, inputs);
		const hiddenOutputs = this.activationFunction(hiddenInputs);

		const finalInputs = Matrix.dot(this.who, hiddenOutputs);
		const finalOutputs = this.activationFunction(finalInputs);

		return finalOutputs;
	}
}
