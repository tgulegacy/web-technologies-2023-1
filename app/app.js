// 1 exercise
const pickPropArray = (srcArr, prop) => {
    return srcArr.reduce((resArr, el) => {
        if (el[prop]) resArr.push(el[prop])
        return resArr
    }, []);
}

// 2 exercise
const createCounter = () => {
    let count = 0;
    return () => ++count;
}

// 3 exercise
const spinWords = (str) => {
    return str
        .replace(/\s+/g, ' ')
        .trim()
        .split('')
        .map(el=> (el.toLowerCase() != el.toUpperCase() || el === ' ') ? el : '')
        .join('')
        .split(' ')
        .map(el => el.length >= 5 ? el.split('').reverse().join('') : el)
        .join(' ')
}

// 4 exercise
const findTargetIndexes = (nums, target) => {
    const hash = {};
	for (let i = 0; i < nums.length; i++) {
		if(hash[target - nums[i]] !== undefined)
			return [hash[target - nums[i]], i];
		hash[nums[i]] = i;
	}
	return [];
}

// 5 exercise
const findLongestCommonPrefix = (strArray) => {
    let i = 0;
    while (strArray[0][i] && strArray.every(w => w[i] === strArray[0][i])) i++;
    return strArray[0].slice(0, i);
}