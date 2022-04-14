function checkForName(inputText) {
    return inputText.search(/(http:\/\/|https:\/\/)/i);
}

export { checkForName }
