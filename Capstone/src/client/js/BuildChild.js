function buildChild(jsonPackage, type) {
    const div = document.createElement("div");

    if (type === 'wc') {
        const resultsElm = document.getElementById("wthr");
        div.appendChild(document.createTextNode(`Current weather:`));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(`Destination: ${jsonPackage['city_name']}, ${jsonPackage['country_code']}`));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(`Temperature: ${jsonPackage["temp"]}`));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(`Relative humidity: ${jsonPackage["rh"]}%`));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(`Last observed: ${jsonPackage["ob_time"]}`));

        resultsElm.appendChild(div);
    }

    if (type === 'p') {
        const resultsElm = document.getElementById("pixa");
        resultsElm.appendChild(div);
        let elm = document.createElement('img');
        elm.src = jsonPackage['largeImageURL'];
        elm.alt = jsonPackage['tags'];
        div.appendChild(elm)

        resultsElm.appendChild(div);
    }
}

export{ buildChild }