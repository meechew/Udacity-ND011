const fetch = require( "node-fetch");
const dotenv = require('dotenv');
dotenv.config();
const geoUser = process.env.GEO_USER;
const wthrkey = process.env.WTHR_KEY;
const pixakey = process.env.PIXA_KEY;


class APIcall {

    constructor(input, date) {
        console.log('::: Building Package :::');
        this.package = {};
        this.package['input'] = input;
        this.package['date'] = date;
    }

    // request location data
    async geoCall() {
        let url = 'http://api.geonames.org/postalCodeSearchJSON?placename=' +
            `${this.package['input']}&country=US&username=${geoUser}&maxRows=1`;
        console.log('::: Sending Geo Package :::');
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

    // request weather data
    async wthrCall() {
        let url = '';
        if (this.package.date) {
            console.log('With date')
            url = 'https://api.weatherbit.io/v2.0/forecast/daily?' +
                `lat=${this.package['lat']}&lon=${this.package['lon']}&key=${wthrkey}`;
        }
        else {
            console.log('Without date')
            url = 'https://api.weatherbit.io/v2.0/current?' +
                `lat=${this.package['lat']}&lon=${this.package['lon']}&key=${wthrkey}`;
        }
        console.log('::: Sending Weather Package :::');
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
        })
        try {
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.log(`error: ${e}`);
        }

        return response;
    }

    // request images
    async pixaCall() {
        let url = 'https://pixabay.com/api/?' +
            `q=${this.package.input}&key=${pixakey}`;
        console.log('::: Sending Pixa Package :::');
        const response = await fetch(url, {
            method: 'GET',
        })
        try {
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(`error: ${e}`);
        }

        return response;
    }

    #setData(data) {
        this.package['lat'] = data['postalCodes'][0]['lat'];
        this.package['lon'] = data['postalCodes'][0]['lng'];
        this.package['placeName'] = data['postalCodes'][0]['placeName'];
    }

    async getGeo() {
        try {
            await this.geoCall()
                .then(data => this.#setData(data))
        } catch (e) {
            console.log(`error: ${e}`);
        }

        return this.package;
    }

    async getWthr(lat, lon) {
        this.package['lat'] = lat;
        this.package['lon'] = lon;

        try {
            return await this.wthrCall()
        } catch (e) {
            console.log(`error: ${e}`);
        }

        return this.package;
    }

    async getPix() {
        try {
            return await this.pixaCall()
        } catch (e) {
            console.log(`error: ${e}`);
        }

        return this.package;
    }
}

module.exports = APIcall;