import { buildChild } from "./BuildChild";

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
    await fetch('http://localhost:8086/api?input=' + formText + '&date=' + formDate, {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        buildChild(res);
    }).catch((error) => {
            console.log(error);
        });
}


export { handleSubmit }
