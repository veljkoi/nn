class NeuralNetwork {
	constructor(inputNodes, hiddenNodes, outputNodes, learningRate) {
		this.learningRate = learningRate;

		this.wih = Matrix.random(inputNodes, hiddenNodes);
		this.who = Matrix.random(hiddenNodes, outputNodes);

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

		const whoChanges = this.calcWeightChanges(finalOutputs, outputErrors, hiddenOutputs);
 		this.who = Matrix.sum(this.who, whoChanges);

    const wihChanges = this.calcWeightChanges(hiddenOutputs, hiddenErrors, inputs);
 		this.wih = Matrix.sum(this.wih, wihChanges);
	}

	query(inputArray) {
		const inputs = Matrix.transpose([inputArray]);

		const hiddenInputs = Matrix.dot(this.wih, inputs);
		const hiddenOutputs = this.activationFunction(hiddenInputs);

		const finalInputs = Matrix.dot(this.who, hiddenOutputs);
		const finalOutputs = this.activationFunction(finalInputs);

		return finalOutputs;
	}

	calcWeightChanges(outputs, errors, prevOutputs) {
    return Matrix.multiplyScalar(
      Matrix.dot(
        Matrix.product(
          errors,
          Matrix.product(
            outputs,
            Matrix.addScalar(
              Matrix.multiplyScalar(outputs, -1),
              1
            )
          )
        ),
        Matrix.transpose(prevOutputs)
      ),
      this.learningRate
    );
	}
}
