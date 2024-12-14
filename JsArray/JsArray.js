(function () {
    let array = [11, 2, -1, 43, 5, 3, 5, 87, 77, 1, 0, 123, 4, -2];

    console.log("Массив отсортированный по возрастанию " + sortArrayAscending(array));

    console.log("Первые 5 элементов массива " + getFiveFirstArrayElements(array));

    console.log("Последние 5 элементов массива " + getFiveLastArrayElements(array));

    console.log("Сумма чётных чисел массива = " + getSumEvenNumbers(array));

    function sortArrayAscending(array) {
        return Array.from(array).sort((a, b) => a - b);
    }

    function getFiveFirstArrayElements(array) {
        return Array.from(array).slice(0, 5);
    }

    function getFiveLastArrayElements(array) {
        return Array.from(array).slice(array.length - 5, array.length);
    }

    function getSumEvenNumbers(array) {
        return array.filter(number => number % 2 === 0).reduce((sum, number) => sum + number);
    }
})();

(function () {
    let array = Array(100).fill(1).map((number, i) => number + i);

    console.log("Квадраты чётных чисел массива " + getListSquaresEvenNumbers(array));

    function getListSquaresEvenNumbers(array) {
        return Array.from(array).filter(number => number % 2 === 0).map(number => number * 2);
    }
})();