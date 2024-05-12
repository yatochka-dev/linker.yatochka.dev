export function debounce(fn: CallableFunction, delay: number) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let timeoutId: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...args: any) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
