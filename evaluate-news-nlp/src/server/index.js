var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const meaningCloud = require('meaning-cloud')
const apikey = process.env.API_KEY;
const api = new meaningCloud({
    application_key: apikey
})
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
