const fetch = require( "node-fetch");
const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();
const geoUser = process.env.GEO_USER;
const wthrkey = process.env.WTHR_KEY;
const pixakey = process.env.PIXA_KEY;


class APIcall {

    constructor(input, date) {
        this.package = {};
        this.package.input = input;
        this.package.date = date;

        async function geoCall() {
            let url = 'http://api.geonames.org/postalCodeSearchJSON?placename=' +
                `${this.input}&username=${geoUser}&maxRows=1`;
            const response = await fetch(url, {
                method: 'GET',
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

        async function wthrCall() {
            let url = 'https://api.weatherbit.io/v2.0/current?' +
                `lat=${this.package.lat}&lon=-${this.package.lon}&key=${wthrkey}`;
            const response = await fetch(url, {
                method: 'GET',
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

        async function pixaCall() {
            let url = 'https://pixabay.com/api/?' +
                `q=${this.package.placeName}&key=${pixakey}`;
            const response = await fetch(url, {
                method: 'GET',
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

        function setData(data) {
            this.package.lat = data['postalCodes'][0]['lat'];
            this.package.lon = data['postalCodes'][0]['lng'];
            this.package.placeName = data['postalCodes'][0]['placeName'];
        }

        this.getGeo = async function() {
            try {
                await geoCall()
                    .then(data => setData(data))
            } catch (e) {
                console.log(`error: ${e}`);
            }

            return this.package;
        }
    }
}

module.exports = APIcall;