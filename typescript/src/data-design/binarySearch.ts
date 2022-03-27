const binarySearch = function(array: Array<number>, number: number) {
    if (array.length === 0) return false
    if (array.length === 1) return array[0] === number

    const mid = Math.floor(array.length / 2)

    if (array[mid] > number) {
        return binarySearch(array.slice(0, mid), number)
    } else {
        return binarySearch(array.slice(mid), number)
    }
}

// console.assertは、アサーション対象の史記がfalseの場合にコンソールに出力する。trueになる場合は何も行わない。
console.assert(
    binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 19], 0),
    'Wrong implementantion'
);
console.assert(
    !binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 19], 50),
    'Wrong implementantion'
);