// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const path = require("path");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


const port = 8086;
// Setup Server
app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

// GET method route

app.get('/', (req, res) => {
    console.log('GET /');
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/*.js', (req, res) => {
    res.sendFile(path.resolve('dist/' + req.path));
})

app.get('/styles/*.css', (req, res) => {
    res.sendFile(path.resolve('src/client/' + req.path));
})

app.get('/logo', (req, res) => {
    console.log('GET /logo');
    res.sendFile(path.resolve('src/client/img/logo.png'))
})

const APIcall = require('./APIcall.js');

// GET Geo data
app.get('/apiGeo', async (req, res) => {
    console.log(`GET /apiGeo contents:
    --input: ${req.query["input"]} 
    --date:  ${req.query["date"]}` );
    const api = new APIcall(req.query['input'], req.query['date']);
    res.send(await api.getGeo());
})

// GET Weather
app.get('/apiWeather', async (req, res) => {
    console.log(`GET /weather contents: 
    --lat:   ${req.query["lat"]} 
    --lon:   ${req.query["lon"]} 
    --date:  ${req.query["date"]}`);
    const api = new APIcall('input', req.query['date']);
    res.send(await api.getWthr(req.query["lat"], req.query["lon"]));
});

// GET Pixa
app.get('/apiPixa', async (req, res) => {
    console.log(`GET /Pixa contents:
    --input: ${req.query["input"]} 
    --date:  ${req.query["date"]}` );
    const api = new APIcall(req.query['input'], req.query['date']);
    res.send(await api.getPix());
});