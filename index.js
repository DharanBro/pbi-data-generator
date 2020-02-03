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

const neededRows = 30000
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

async function readCsv() {
    // const data = await readFile('world-cities_csv.csv', { encoding: "UTF-8" });
    // const transformedData = data.split('\r\n').map(row => row.split(","))
    // console.log(transformedData.length)

    // const newData = transformedData.reduce((acc, row) => {
    //     products.forEach(p => {
    //         periods.forEach(per => {
    //             const [name, country, subcountry] = row;
    //             const newRow = [country, subcountry, name];
    //             newRow.push(p);
    //             newRow.push(per);
    //             newRow.push(getRandomArbitrary(10000, 50000));

    //             acc.push(newRow);
    //         });
    //     });
    //     return acc;
    // }, [["Country", "Sub-Country", "Area", "Product", "Period", "Sales"]]);



    const data = await readFile('world-cities_csv.csv', { encoding: "UTF-8" });
    const transformedData = data.split('\r\n').map(row => row.split(","))

    const frequency = (neededRows) / transformedData.length;
    let repeater = 1;
    let length;
    let repeatTimes = 1;
    let finalArray = []
    if (frequency < 1) {
        console.log('delete ' + (1 / frequency) + ' rows for each row ')
        repeater = parseInt(1 / frequency)
        length = transformedData.length;
        for (let i = 0; i < length; i += repeater) {
            finalArray.push(transformedData[i])
        }
    } else {
        console.log('repeat ' + frequency + ' times')
        length = (neededRows) * parseInt(frequency)
        repeatTimes = parseInt(frequency)
        products.length = repeatTimes;

        let monthsRepeater = (repeatTimes * transformedData.length) / 12

        console.log(monthsRepeater)
        let monthIteration = 0;
        let monthCount = 0

        products.forEach((product) => {
            transformedData.forEach((transformedData) => {
                let month = periods[monthIteration]
                finalArray.push([product, month, ...transformedData, getRandomArbitrary(10000, 50000)])
                monthCount += 1
                if (monthCount >= monthsRepeater) {
                    monthIteration += 1
                    monthCount = 0
                }
            })

        })
    }
    finalArray.unshift(['product', 'months', 'country', 'sub country', 'area', 'value'])
    console.log(finalArray.length)






    // console.log(newData.length);
    // console.log(newData[1])
    const newcsvData = finalArray.map(row => row.join(",")).join("\n");

    await writeFile('world-cities-products.csv', newcsvData)
}

readCsv();

