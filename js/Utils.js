class Utils {
	static roundTo(num, dec) {
		const n = Math.pow(10, dec);
		return Math.round(num * n) / n;
	};

	static roundTo6(num) {
		return Utils.roundTo(num, 6);
	}

	static drawNumber(input) {
		const canvas = document.createElement('canvas');
		canvas.width = 28;
		canvas.height = 28;
		// canvas.id = canvasId;
		document.body.appendChild(canvas);

		// const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		const arr = new Uint8ClampedArray(784 * 4);

		let j = 0;
		let value;

		// Iterate through every pixel
		for (let i = 0; i < input.length; i++) {
			j = i * 4;
			value = input[i];

		  	arr[j] = value;
		  	arr[j + 1] = value;
		  	arr[j + 2] = value;
		  	arr[j + 3] = 255;
		}

		// Initialize a new ImageData object
		let imageData = new ImageData(arr, 28, 28);

		// Draw image data to the canvas
		ctx.putImageData(imageData, 0, 0);
	}
}