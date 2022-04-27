import { buildChild } from "./BuildChild";

async function submitPix(JSONpackage) {
    console.log("::: Pix Submitted :::");
    await fetch(`http://localhost:8086/apiGeo?` +
        `input=${JSONpackage['placeName']}&date=${JSONpackage['date']}`,{
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function submitWthr(JSONpackage) {
    console.log("::: Weather Submitted :::");
    await fetch(`http://localhost:8086/apiWeather?` +
    `lat=${JSONpackage['lat']}&lon=${JSONpackage['lon']}`,{
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


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
    })
    .then(res => res.json())
    .then(res => {
        submitPix(res);
        submitWthr(res);
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
}


export { handleSubmit }
