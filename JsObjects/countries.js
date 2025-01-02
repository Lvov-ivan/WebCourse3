(function () {
    "use strict";

    const countries = [
        {
            name: "Германия",
            cities: [
                {name: "Берлин", population: 3400000},
                {name: "Гамбург", population: 1900000},
                {name: "Мюнхен", population: 1510000}
            ]
        },
        {
            name: "Россия",
            cities: [
                {name: "Москва", population: 136000000},
                {name: "Санкт-Петербург", population: 56000000},
                {name: "Новосибирск", population: 1600000},
                {name: "Омск", population: 1100000}
            ]
        },
        {
            name: "США",
            cities: [
                {name: "Нью-йорк", population: 8200000},
                {name: "Вашингтон", population: 678000},
                {name: "Монтгомери", population: 195287}
            ]
        }
    ];

    function getCountriesWithMaxCitiesCount(countries) {
        const maxCitiesCount = countries.reduce((citiesCount, currentCountry) => {
            return Math.max(citiesCount, currentCountry.cities.length);
        }, 0)

        return countries.filter(country => country.cities.length === maxCitiesCount);
    }

    function getCountryPopulation(countries) {
        const countriesListWithTotalPopulation = {};

        countries.forEach(country => {
            countriesListWithTotalPopulation[country.name] = getPopulation(country);
        });

        return countriesListWithTotalPopulation;
    }

    function getPopulation(country) {
        return country.cities.reduce((sum, city) => {
            const currentPopulation = city.population;

            return sum + currentPopulation;
        }, 0);
    }

    console.log("Страны с самым большим количеством городов:");
    console.log(getCountriesWithMaxCitiesCount(countries));

    console.log("\n" + "Страны и их суммарное население:");
    for (const currentCountry in getCountryPopulation(countries)) {
        console.log(`${currentCountry} ${getCountryPopulation(countries)[currentCountry]}`);
    }
})();