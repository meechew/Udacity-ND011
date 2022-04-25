const fetch = require( "node-fetch");
const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();
const geoUser = process.env.GEO_USER;
const wthrkey = process.env.WTHR_KEY;
const pixakey = process.env.PIXA_KEY;


class APIcall {

    constructor(input, date) {
        this.geoForm = new FormData();
        this.geoForm.append('key', geoUser);
        this.geoForm.append('lang', 'en');
        this.geoForm.append('input', input);

        this.weatherForm = new FormData();
        this.weatherForm.append('key', wthrkey);
        this.weatherForm.append('lang', 'en');
        this.weatherForm.append('url', input);

        this.pixaForm = new FormData();
        this.pixaForm.append('key', pixakey);
        this.pixaForm.append('lang', 'en');
        this.pixaForm.append('url', input);

        this.date = date;

        async function geoCall() {
            let url = 'http://api.geonames.org/postalCodeSearch?placename=' +
                '${input}&username=${geoUser}';
            const response = await fetch(url, {
                method: 'POST',
            })

        }

        async function wthrCall() {

        }
        async function pixaCall() {

        }

        this.call = async function() {

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

}

module.exports = APIcall;