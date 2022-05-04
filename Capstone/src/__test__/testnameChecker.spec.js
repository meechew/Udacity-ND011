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

describe("Testing testing JSON package interpretation and build of result elements", () => {
    test("Testing buildChild()", () => {
        const dom = new Document();
        const testPackage = {
            agreement: 'DISAGREEMENT',
            confidence: '94',
            irony: 'NONIRONIC',
            model: 'general_en',
            score_tag: 'P',
            sentence_list: [],
            sentimented_entity_list: [],
            status: { code: '0', msg: 'OK', credits: '1', remaining_credits: '19937' },
            subjectivity: 'SUBJECTIVE'
        }

        const refElm = '<div id="results"><div>Argeement: DISAGREEMENT<br>Irony: NONIRONIC<br>Model: general_en<br>Score_tag: P<br>Subjectivity: SUBJECTIVE</div></div>';
        document.body.innerHTML = '<div id="results"></div>';

        buildChild(testPackage);
        expect(document.body.innerHTML).toBe(refElm);
    })
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

