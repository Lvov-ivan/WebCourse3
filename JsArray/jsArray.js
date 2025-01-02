(function () {
    "use strict";
    let unsortedArray = [11, 2, -1, 43, 5, 3, 5, 87, 77, 1, 0, 123, 4, -2];

    function sortArrayDescending(array) {
        return array.sort((a, b) => b - a);
    }

    function getFirstArrayElements(array, firstElementsCount) {
        return Array.from(array).slice(0, firstElementsCount);
    }

    function getLastArrayElements(array, lastElementsCount) {
        return Array.from(array).slice(array.length - lastElementsCount);
    }

    function getEvenNumbersSum(array) {
        return array.filter(number => number % 2 === 0).reduce((sum, number) => sum + number);
    }

    console.log("Массив отсортированный по возрастанию = " + sortArrayDescending(unsortedArray));

    console.log("Первые 5 элементов массива = " + getFirstArrayElements(unsortedArray, 5));

    console.log("Последние 5 элементов массива = " + getLastArrayElements(unsortedArray, 5));

    console.log("Сумма чётных чисел массива = " + getEvenNumbersSum(unsortedArray));

    function getEvenNumbersSquares(array) {
        return Array.from(array).filter(number => number % 2 === 0).map(number => number * number);
    }

    const array = []

    for (let i = 1; i <= 100; i++) {
        array.push(i);
    }

    console.log("Квадраты чётных чисел массива = " + getEvenNumbersSquares(array));
})();