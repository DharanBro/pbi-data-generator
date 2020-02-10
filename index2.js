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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

async function readCsv() {

    const data = await readFile('world-cities_csv.csv', { encoding: "UTF-8" });
    const transformedData = data.split('\r\n').map(row => row.split(","))

    const columns = [2, 10, 20, 50]
    const max = Math.max(...columns)
    let finalArray = new Array(max).fill([])
    columns.forEach((columnLength, index) => {

        let iter = 1
        for (let i = 0; i < max; i++) {
            finalArray[index].push(iter)
            console.log(iter)
            if (i >= parseInt(max / columnLength)) {
                iter += 1

            }

        }


    })


    console.log(finalArray.length)






    // console.log(newData.length);
    // console.log(newData[1])
    const newcsvData = finalArray.map(row => row.join(",")).join("\n");

    await writeFile('world-cities-products.csv', newcsvData)
}

readCsv();