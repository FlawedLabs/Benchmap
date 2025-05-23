export const calculateAverage = (numbers: number[]): number => {
	if (numbers.length === 0) return 0;
	const sum = numbers.reduce((acc, num) => acc + num, 0);
	return sum / numbers.length;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
