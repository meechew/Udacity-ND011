const dotenv = require('dotenv');
dotenv.config();
const apikey = process.env.API_KEY;

class APIcall {

}

async function APIcall(url) {
    const form = new FormData();
    form.append('key', apikey);
    form.append('lang', 'en');
    form.append('url', url);

    return fetch("https://api.meaningcloud.com/sentiment-2.1", {
        method: 'POST',
        body: form,
        redirect: 'follow'
    });
}