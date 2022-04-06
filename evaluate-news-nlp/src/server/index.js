const path = require('path');
const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();
const meaningCloud = require('meaning-cloud');
const apikey = process.env.API_KEY;
const api = new meaningCloud({key:  apikey})

const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/app', function (req, res) {
    res.sendFile(path.resolve('src/client/index.js'))
})

app.get('/tone', (req, res) => {
    console.log('GET /tone URL:' + req.query['input']);
    res.send(mockAPIResponse);
})


console.log("Sentinel online");