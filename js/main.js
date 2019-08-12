const nn = new NeuralNetwork(784, 100, 10, 0.3);

// console.table(nn.wih);
// console.table(nn.who);

/*
let testData = testCSV.split("\n").map(i => i.split(',').map(j => Number(j)));

testData.forEach((item) => {
	console.log(item.shift());

	Utils.drawNumber(item);

	const inputs = item.map(j => (j * 0.99 / 255) + 0.01);

	console.table(nn.query(inputs));
});
*/

const trainData = trainCSV.split("\n").map(i => i.split(',').map(j => Number(j)));

const start = Date.now();

const epochs = 2;

// for (let i = 0; i < epochs; i++) {
	trainData.forEach((item) => {
		const targets = new Array(10).fill(0.01);
		targets[item.shift()] = 0.99;

		const inputs = item.map(j => (j * 0.99 / 255) + 0.01);

		nn.train(inputs, targets);
	});
// }

const end = Date.now();

console.log('duration: ', (end - start) / 1000);


const results = [];

testData = testCSV.split("\n").map(i => i.split(',').map(j => Number(j)));

testData.forEach((item) => {
	// const div = document.createElement('<div/>');
	// div.innerHTML = item.shift();
	// document.body.appendChild(div);
	const correctValue = item.shift();

	Utils.drawNumber(item);

	const inputs = item.map(j => (j * 0.99 / 255) + 0.01);

	const outputs = Matrix.transpose(nn.query(inputs))[0];
	const maxValue = Math.max(...outputs);
	const index = outputs.findIndex(o => o === maxValue);

	const div = document.createElement('div');
	div.innerHTML = index + ' - ' + maxValue;
	document.body.appendChild(div);

	const correctAnswer = correctValue === index ? 1 : 0;
	results.push(correctAnswer);

	console.table(outputs);
});

const successRate = results.filter(i => i).length * 100 / results.length;

const res = document.createElement('div');
res.innerHTML = successRate + '%';
document.body.appendChild(res);

/*
const item = trainData[0];
const targets = new Array(10).fill(0.01);
targets[item.shift()] = 0.99;

const inputs = item.map(j => Utils.roundTo6((j * 0.99 / 255) + 0.01));

nn.train(inputs, targets);
*/

// console.table(nn.wih);
// console.table(nn.who);
