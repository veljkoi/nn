class Matrix {
	static create(rows, columns) {
		const matrix = [];

		for (let i = 0; i < rows; i++) {
			matrix[i] = [];

			for (let j = 0; j < columns; j++) {
				matrix[i].push(0);
			}
		}

		return matrix;		
	}

	static apply(matrix, func) {
		const [rows, cols] = Matrix.getDimensions(matrix);

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				matrix[i][j] = func(i, j);
			}
		}

		return matrix;
	}

	static getDimensions(matrix) {
		return [matrix.length, matrix[0].length];
	}

	static random(columns, rows) {
		const deviation = 1 / Math.sqrt(columns);

		const matrix = Matrix.create(rows, columns);

		Matrix.apply(matrix, () => deviation * (2 * Math.random() - 1));

		return matrix;
	}

	static transpose(matrix) {
		const rows = matrix.length;
		const columns = matrix[0].length;

		const transpose = Matrix.create(columns, rows);

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				transpose[j][i] = matrix[i][j];
			}
		}

		return transpose;
	}

	static dot(a,  b) {
		const aDims = Matrix.getDimensions(a);
		const bDims = Matrix.getDimensions(b);

		if (aDims[1] !== bDims[0]) {
			return null;
		}

		const len = aDims[1];
		
		const matrix = Matrix.create(aDims[0], bDims[1]);

		Matrix.apply(matrix, (i, j) => {
			let sum = 0;

			for (let k = 0; k < len; k++) {
				sum += a[i][k] * b[k][j];
			}

			return sum;
		});

		return matrix;
	}

	static sigmoid(matrix) {
		return Matrix.apply(matrix, (i, j) => 1 / (1 + (1 / Math.exp(matrix[i][j]))));
	}

	static operation(a, b, operator) {
		const aDims = Matrix.getDimensions(a);
		const bDims = Matrix.getDimensions(b);

		if (aDims[0] !== bDims[0] || aDims[1] !== bDims[1]) {
			return null;
		}
		
		const matrix = Matrix.create(aDims[0], aDims[1]);

		Matrix.apply(matrix, (i, j) => operator(a[i][j], b[i][j]));

		return matrix;	
	}

	static sum(a, b) {
		return Matrix.operation(a, b, (x, y) => x + y);
	}

	static subtract(a, b) {
		return Matrix.operation(a, b, (x, y) => x - y);	
	}

	static product(a, b) {
		return Matrix.operation(a, b, (x, y) => x * y);	
	}

	static multiplyScalar(matrix, scalar) {
		return Matrix.apply(matrix, (i, j) => matrix[i][j] * scalar);
	}

	static addScalar(matrix, scalar) {
		return Matrix.apply(matrix, (i, j) => matrix[i][j] + scalar);
	}
}