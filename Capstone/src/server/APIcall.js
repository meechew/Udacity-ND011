const fetch = require( "node-fetch");
const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();
const apikey = process.env.API_KEY;


class APIcall {

    constructor(input, date) {
        this.pixaForm = new FormData();
        this.pixaForm.append('key', apikey);
        this.pixaForm.append('lang', 'en');
        this.pixaForm.append('url', input);

        this.geoForm = new FormData();
        this.geoForm.append('key', apikey);
        this.geoForm.append('lang', 'en');
        this.geoForm.append('url', input);

        this.weatherForm = new FormData();
        this.weatherForm.append('key', apikey);
        this.weatherForm.append('lang', 'en');
        this.weatherForm.append('url', input);

        this.date = date;
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