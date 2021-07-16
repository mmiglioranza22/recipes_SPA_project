export function orderAZ(array) {
	array = array.sort((a, b) => {
			return a.title.localeCompare(b.title); // [a,b], negative value
	});
	return array
};

export function orderZA(array) {
	array = array.sort((a, b) => {
			return (a.title.localeCompare(b.title)) * -1; // reverse()
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
};