function buildChild(jsonPackage) {
    jsonPackage["sentence_list"].forEach(e => {
        const resultsElm = document.getElementById("results");
        const div = document.createElement("div");
        div.appendChild(document.createTextNode("Argeement: " + e["agreement"]));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode("Text: " + e["text"]));
        resultsElm.appendChild(div);
    })
}

export{buildChild}