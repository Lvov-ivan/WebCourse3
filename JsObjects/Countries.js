(function () {
    let countries = Array();

    countries.push({
            name: "Россия",
            cities: [
                {name: "Москва", population: 136000000},
                {name: "Санкт-Петербург", population: 56000000},
                {name: "Новосибирск", population: 1600000},
                {name: "Омск", population: 1100000}]
        },
        {
            name: "Германия",
            cities: [
                {name: "Берлин", population: 3400000},
                {name: "Гамбург", population: 1900000},
                {name: "Мюнхен", population: 1510000}]
        },
        {
            name: "США",
            cities: [
                {name: "Нью-йорк", population: 8200000},
                {name: "Вашингтон", population: 678000},
                {name: "Монтгомери", population: 195287}]
        });

    function getCountriesWithMaxCitiesCount(countries) {
        let maxCitiesCount = 0;
        countries.forEach(country => {
            if (country.cities.length >= maxCitiesCount) {
                maxCitiesCount = country.cities.length
            }
        });

        return countries.filter(country => country.cities.length === maxCitiesCount).map(country => country.name);
    }

    function getCountryPopulation(countries) {
        let countriesList = {};

        countries.forEach(country => {
            let countryName = country.name;
            countriesList[countryName] = getPopulation(country);
        });

        return countriesList;
    }

    function getPopulation(country) {
        return country.cities.reduce((sum, city) => {
            let currentPopulation = city.population;

            return sum + currentPopulation;
        }, 0);
    }

    console.log("Страны с самым большим количеством городов: " + getCountriesWithMaxCitiesCount(countries));

    console.log("\n" + "Страны и их суммарное население:");

    let countriesPopulation = getCountryPopulation(countries);

    for (const country in countriesPopulation) {
        console.log(country + " " + countriesPopulation[country]);
    }
})();