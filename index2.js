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
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
async function loadJson() {
    const rawData = await readFile('./countries+states+cities.json', { encoding: "UTF-8" })
    return JSON.parse(rawData)
}
async function readCsv() {
    const parsedData = await loadJson()
    const countries = parsedData.map((inp)=>(inp.name))
    const states = parsedData.map((inp)=>{
        try{
            Object.keys(inp.states)
            return Object.keys(inp.states)
        }catch(err){}
    
    })
console.log(states)
    // console.log(parsedData.length)
    const columns = [2, 10, 25, 50,100]
    const max = Math.max(...columns)


    let columnRepeater = [0, 0, 0, 0]
    let columnIteration = [50, 10, 4, 2,1]
    columnIteration = columns.map((column)=>(max/column))

    for (let i = 0; i < max; i++) {
        columns.forEach((column, index) => {
            // if (i > (columnIteration[index] * columnX[index])) {
            if ((i % columnIteration[index]) === 0 && i != 0) {

                columnRepeater[index] += 1;
                // columnIteration[index] = 0;
                // if (columnIteration[index] == 0) {
                //     columnIteration[index] += 1;
                // }
                // if (column === 2) {
                //     console.log(`${column} is changed with index ${columnIteration[index]} and repeater ${columnRepeater[index]}`)
                // }
            }
        })
        console.log(
            i,
            {
                product: products[columnRepeater[0]],
                periods: periods[columnRepeater[1]],
                countries: countries[columnRepeater[2]],
                states: states[columnRepeater[3]],
            }
        )
    }





    const newcsvData = finalArray.map(row => row.join(",")).join("\n");

    await writeFile('world-cities-products.csv', newcsvData)
}

readCsv();