document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("convert-button").addEventListener("click", () => {
        const celsiusTemperature = document.getElementById("input-celsius-field").value;

        if (isNaN(celsiusTemperature)) {
            alert("Введите число в поле \"Температура в цельсиях\"");
        } else {
            document.getElementById("kelvin-result").value = convertToKelvin(celsiusTemperature);
            document.getElementById("fahrenheit-result").value = convertToFahrenheit(celsiusTemperature);
        }
    });
});

function convertToKelvin(celsiusTemperature) {
    return +celsiusTemperature + 273.15;
}

function convertToFahrenheit(celsiusTemperature) {
    return +celsiusTemperature * 1.8 + 32;
}