import { buildChild } from "./BuildChild";
import { checkForURL } from "./urlChecker";

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (checkForURL(formText)) {
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
    .then(res => {
        buildChild(res);
    }).catch((error) => {
            console.log(error);
        });
}


export { handleSubmit }
