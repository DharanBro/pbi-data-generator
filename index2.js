const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const periods = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const products = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
    "Product 5",
    "Product 6",
    "Product 7",
    "Product 8",
    "Product 9",
    "Product 10",
]
let finalArray = []
function getRandomArbitrary(min = 10000, max = 50000) {
    return Math.random() * (max - min) + min;
}
async function loadJson(path) {
    const rawData = await readFile(path, { encoding: "UTF-8" })
    return JSON.parse(rawData)
}
async function readCsv() {
    const parsedCountries = await loadJson('./countries.json')
    const countries = parsedCountries.map((inp) => (inp.name))
    const parsedStates = await loadJson('./states.json') 
    const states = parsedStates.map((inp) => (inp.name))
    const parsedCities =  await loadJson('./cities.json')
    const cities = parsedCities.map((inp) => (inp.name))
    const columns = [2, 10, 80, 160, 380]
    const max = Math.max(...columns)


    let columnRepeater = [0, 0, 0, 0, 0]
    let columnIteration = columns.map((column) => (Math.ceil(max / column)))
    console.log(columnIteration)

    for (let i = 0; i < max; i++) {
        columns.forEach((column, index) => {
            // if (i > (columnIteration[index] * columnX[index])) {
            if ((i % columnIteration[index]) === 0 && i != 0) {
                columnRepeater[index] += 1;
                // columnIteration[index] = 0;
                // if (columnIteration[index] == 0) {
                //     columnIteration[index] += 1;
                // }
             
            }

        })

        // console.log(
        //     i,
        //     {
        //         product: products[columnRepeater[0]],
        //         periods: periods[columnRepeater[1]],
        //         countries: countries[columnRepeater[2]],
        //         states: states[columnRepeater[3]],
        //         // cities: cities[columnRepeater[4]],
        //         value: getRandomArbitrary()
        //     }
        // )
        finalArray.push([
            products[columnRepeater[0]],
            periods[columnRepeater[1]],
            countries[columnRepeater[2]],
            states[columnRepeater[3]],
            cities[columnRepeater[4]],
            getRandomArbitrary()
        ])
    }





    const newcsvData = finalArray.map(row => row.join(",")).join("\n");

    await writeFile('columnRespective.csv', newcsvData)
}

readCsv();