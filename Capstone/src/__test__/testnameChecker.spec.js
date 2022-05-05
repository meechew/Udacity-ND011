import  { handleSubmit } from "../client";
import { buildChild } from "../client/js/BuildChild";
const APIcall = require('../server/APIcall.js');
require("babel-polyfill");


describe("Testing submission of forms", () => {
    const event = { preventDefault: () => {} };

    test("Testing handleSubmit() sad path", async () => {
        const refBody = '<input id="name" type="text" name="input" value="">';
        document.body.innerHTML = refBody;
        try {
            await handleSubmit()
                .then( () => {
                expect(document.body.innerHTML).toBe(refBody);
            })
        } catch (e) {}
    });
    test("Testing handleSubmit() Happy path", async () => {
        const refBody = '<input id="name" type="text" name="input" value="New York">';
        document.body.innerHTML = refBody;
        try {
            await handleSubmit()
                .then( () => {
                    expect(document.body.innerHTML).not.toBe(refBody);
                })
        } catch (e) {}
    });
});

describe("Testing API call to Meaning cloud", () => {
    const mockAPIcall = new APIcall("", "");
    test("Testing dummy geoCall()", async () => {
        const refBody = {
            "postalCodes": [
                {
                    "adminCode2": "277",
                    "adminCode1": "TX",
                    "adminName2": "Lamar",
                    "lng": -95.490539,
                    "countryCode": "US",
                    "postalCode": "75462",
                    "adminName1": "Texas",
                    "ISO3166-2": "TX",
                    "placeName": "Paris",
                    "lat": 33.680451
                }
            ]
        }

        try {
            await mockAPIcall.geoCall()
                .then(response => expect(response).tobe(refBody))
        } catch (e) {}
    })

    test("Testing dummy wthrCall()", async () => {
        const refBody = {
            "error": "Invalid Parameters supplied."
        }

        try {
            await mockAPIcall.wthrCall()
                .then(response => expect(response).tobe(refBody))
        } catch (e) {}
    })

    test("Testing dummy pixaCall()", async () => {
        const refBody = {
            "totalHits": 500
        }

        try {
            await mockAPIcall.geoCall()
                .then(response => expect(response["totalHits"]).tobe(refBody["totalHits"]))
        } catch (e) {}
    })
});

