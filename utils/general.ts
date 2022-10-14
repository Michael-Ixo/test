// Sort array of objects by [keyname] or reverse [-keyname]
export const dynamicSort = (property: string) => {
	var sortOrder = 1;
	if (property[0] === '-') {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a: any, b: any) {
		var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
		return result * sortOrder;
	};
};
