function checkForURL(inputText) {
    return inputText.search(/(http:\/\/|https:\/\/)/i);
}

export { checkForURL }
