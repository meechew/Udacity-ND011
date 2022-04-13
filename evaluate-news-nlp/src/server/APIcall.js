const fetch = require( "node-fetch");
const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();
const apikey = process.env.API_KEY;


class APIcall {

    constructor(url) {
        this.form = new FormData();
        this.form.append('key', apikey);
        this.form.append('lang', 'en');
        this.form.append('url', url);
    }

    async call() {

        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", {
            method: 'POST',
            body: this.form,
            redirect: 'follow'
        })
        try {
            const data = await response.json();
            console.log(data);
            return data;
        }
        catch(error) {
            console.log('error', error);
        }

            return response;
    }

}

module.exports = APIcall;