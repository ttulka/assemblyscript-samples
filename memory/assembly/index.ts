export function inc(i: i32): i32 {
	return i + 1;
}

export function hello(
    name: string): string {

  return "Hello, " + name + "!";
}

export function multiply(matrix: Int32Array, x: i32): Int32Array {
	var arr = new Int32Array(matrix.length);
	for (var i = 0; i < matrix.length; i++) {
		arr[i] = matrix[i] * x;
	}
	return arr;
}


export function multiplyByTwo(matrix: Int32Array): Int32Array {
  return matrix.slice()
    .map(i => i * 2);
}

export const Int32Array_ID = idof<Int32Array>();