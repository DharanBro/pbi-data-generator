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
    // "Product 6",
    // "Product 7",
    // "Product 8",
    // "Product 9",
    // "Product 10",
]
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

async function readCsv() {
    const data = await readFile('world-cities_csv.csv', { encoding: "UTF-8" });
    const transformedData = data.split('\r\n').map(row => row.split(","))

    const newData = transformedData.reduce((acc, row) => {
        products.forEach(p => {
            periods.forEach(per => {
                const [name, country, subcountry] = row;
                const newRow = [country, subcountry, name];
                newRow.push(p);
                newRow.push(per);
                newRow.push(getRandomArbitrary(10000, 50000));

                acc.push(newRow);
            });
        });
        return acc;
    }, [["Country", "Sub-Country", "Area", "Product", "Period", "Sales"]]);
    console.log(newData.length);
    console.log(newData[1])
    const newcsvData = newData.map(row => row.join(",")).join("\n");

    await writeFile('world-cities-products.csv', newcsvData)
}

readCsv();