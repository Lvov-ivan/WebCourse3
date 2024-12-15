document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("convertButton").addEventListener("click", () => {
        const celsiusTemperature = document.getElementById("input").value;

        if (isNaN(celsiusTemperature)) {
            alert("Введите число в поле \"Температура в цельсиях\"")
        } else {
            document.getElementById("kelvinResult").value = +celsiusTemperature + 273.15;
            document.getElementById("fahrenheitResult").value = +celsiusTemperature * 1.8 + 32;
        }
    })
})