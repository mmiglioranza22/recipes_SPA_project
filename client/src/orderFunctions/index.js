export function orderAZ(array) {
	array = array.sort((a, b) => {
		if (a.title > b.title) {
			return 1; // [a,b]
		};
		if (a.title < b.title) {
			return -1; // [b,a]
		};
		return 0;
	});
	return array
}
export function orderZA(array) {
	array = array.sort((a, b) => {
		if (a.title > b.title) {
			return -1;
		};
		if (a.title < b.title) {
			return 1;
		};
		return 0;
	});
	return array;
};
export function topScore(array) {
	array = array.sort((a, b) => {
		if (a.score > b.score) {
			return -1;
		};
		if (a.score < b.score) {
			return 1;
		};
		return 0;
	});
	return array;
};
export function lastScore(array) {
	array = array.sort((a, b) => {
		if (a.score > b.score) {
			return 1;
		};
		if (a.score < b.score) {
			return -1;
		};
		return 0;
	});
	return array;
}