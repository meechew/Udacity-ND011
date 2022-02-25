/* Global Variables */
const apiKey = '99a955eec0bf6c11f9bd59137f6b3473&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate)

/* Function called by event listener */
function generate() {
    postInput('api.openweathermap.org/data/2.5/weather?zip='
        + document.getElementById("zip").value,
        {'date': newDate, 'feel': document.getElementById('feelings').value});
}

/* Function to GET Web API Data*/

/* Function to POST data */
const postInput = async (url='', data = {}) => {
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'apiKey': apiKey
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML =allData.date;
    }
    catch(error) {
        console.log("error: ", error);
        // appropriately handle the error
    }
}