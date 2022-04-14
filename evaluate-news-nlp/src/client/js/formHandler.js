import { buildChild } from "./BuildChild";

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (Client.checkForName(formText)) {
        alert('Please enter URL');
        return;
    }

    console.log("::: Form Submitted :::")
    await fetch('http://localhost:8086/api?input=' + formText, {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(function(res) {
        buildChild(res)
        //document.getElementById('results').innerHTML = res.message
    })//.then(res => console.log(res))
}


export { handleSubmit }
