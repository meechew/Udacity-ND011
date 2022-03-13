/* Global Variables */
const apiKey = '99a955eec0bf6c11f9bd59137f6b3473&units=imperial';

// Create a new date instance dynamically with JS
const month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","Aug","SEP","OCT","NOV","DEC"];
let d = new Date();
let newDate = ('0'+ d.getDate()).slice(-2) +  month[d.getMonth()] + d.getFullYear().toString().slice(-2);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate)

/* Function called by event listener */
async function generate() {
    const weather = await getTemp('https://api.openweathermap.org/data/2.5/weather',
        document.getElementById("zip").value + ',us'
    )
    let data = {
        content: document.getElementById("feelings").value,
        date: newDate,
        temp: weather.main.temp
    };
    postInput('/weather', data);
    retrieveData();
}

/* Function to GET Web API Data*/

const getTemp = async (url = '', zip = '') => {
    const response = await fetch(url + '?zip=' + zip + '&appid=' + apiKey, {
        method: 'POST'
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error: ", error);
    }
}

/* Function to POST data */
const postInput = async (url='', data = {}) => {
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error: ", error);
    }
}

/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch('/weather');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('date').innerHTML = allData.date;
    }
    catch(error) {
        console.log("error: ", error);
        // appropriately handle the error
    }
}