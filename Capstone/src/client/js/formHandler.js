import { buildChild } from "./BuildChild";

// Submits request for images and sends the results to be buildChild()
async function submitPixa(JSONpackage) {
    console.log("::: Pixa Submitted :::");
    const res = await fetch(`http://localhost:8086/apiPixa?` +
        `input=${JSONpackage['placeName']}&date=${JSONpackage['date']}`,{
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(res => {
        buildChild(res['hits'][0], 'p')
    }).catch((error) => {
        console.log(error);
    });
}

// Submits request for weather and sends the results to be buildChild()
async function submitWthr(JSONpackage) {
    const week = 7 * 24 * 60 * 60 * 1000;
    const future = new Date(Date.now().valueOf() + week);
    // Submit for current weather
    if (new Date(JSONpackage['date']) < future) {
        console.log("::: Weather Submitted :::");
        const res = await fetch(`http://localhost:8086/apiWeather?` +
            `lat=${JSONpackage['lat']}&lon=${JSONpackage['lon']}`, {
            method: 'GET',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            buildChild(res['data'][0], 'wc')
        }).catch((error) => {
            console.log(error);
        });
    }
    //Submit for forecast
    else {
        console.log("::: Weather Submitted :::");
        const res = await fetch(`http://localhost:8086/apiWeather?` +
            `lat=${JSONpackage['lat']}&lon=${JSONpackage['lon']}&date=${JSONpackage['date']}`, {
            method: 'GET',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            buildChild(res['data'], 'wf')
        }).catch((error) => {
            console.log(error);
        });
    }
}


// Submits for initial request
async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    let formDate = document.getElementById('date').value;
    if (formText.trim() === '') {
        alert('Please enter name or postal code');
        return;
    }

    console.log("::: Form Submitted :::")
    await fetch(`http://localhost:8086/apiGeo?input=${formText}&date=${formDate}`, {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(res => {
        submitPixa(res);
        submitWthr(res);
    }).catch((error) => {
        console.log(error);
    });
}


export { handleSubmit }
