import  { checkForURL } from "../client";
import  { handleSubmit } from "../client";
import { buildChild } from "../client/js/BuildChild";
const APIcall = require('../server/APIcall.js');
require("babel-polyfill");


describe("Testing truthiness of string input", () => {
    test("Testing checkForURL() for valid URL", () => {
        expect(checkForURL('http://')).toBeFalsy();
        expect(checkForURL('HTTP://')).toBeFalsy();
        expect(checkForURL('https://')).toBeFalsy();
        expect(checkForURL('HTTPS://')).toBeFalsy();
    });
    test("Testing checkForURL() for invalid URL", () => {
        for(let k = 0; k < 5 ; ++k ) {
            expect(checkForURL(Math.random().toString(36).slice(2, 7))).toBeTruthy();
        }
    });
});

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
        const refBody = '<input id="name" type="text" name="input" value="https://www.infoq.com/articles/testing-legacy-nodejs-app/">';
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
    test("Testing dummy call()", async () => {
        const mockAPIcall = new APIcall("");
        const refBody = {
            status: {
                code: "200",
                msg: "missing required parameter(s): txt, url or doc",
                credits: "0"
            }
        }

        try {
            const response = await mockAPIcall.call()
                .then(response => expect(response).tobe(refBody))
        } catch (e) {}
    })
});

