function buildChild(jsonPackage) {
    const resultsElm = document.getElementById("results");
    const div = document.createElement("div");
    div.appendChild(document.createTextNode("Argeement: " + jsonPackage["agreement"]));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode("Irony: " + jsonPackage["irony"]));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode("Model: " + jsonPackage["model"]));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode("Score_tag: " + jsonPackage["score_tag"]));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode("Subjectivity: " + jsonPackage["subjectivity"]));

    resultsElm.appendChild(div);
}

export{ buildChild }