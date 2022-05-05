function buildChild(jsonPackage, type) {
    const div = document.createElement("div");

    //Builds and attaches current weather elements
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

    //Builds and attaches 16-day forecast elements
    if (type === 'wf') {
        const resultsElm = document.getElementById("wthr");
        div.appendChild(document.createTextNode(`16-day forecast:`));
        div.appendChild(document.createElement("br"));
        jsonPackage.forEach(e => {
            div.appendChild(document.createTextNode(e["valid_date"]));
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createTextNode(`High: ${e["high_temp"]}  Low: ${e["low_temp"]}`));
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createTextNode(`${e["weather"]["description"]}`));
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createTextNode(`Precipitation: ${e["pop"]}%`));
            div.appendChild(document.createElement("br"));
        })

        resultsElm.appendChild(div);
    }

    //Builds and attaches images elements
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