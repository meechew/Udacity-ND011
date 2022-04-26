// Setup empty JS object to act as endpoint for all routes
projectData = {};

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

// GET geo data
app.get('/apiGeo', async (req, res) => {
    console.log(`GET /apiGeo URL: ${req.query["input"]} ${req.query["date"]}` );
    const api = new APIcall(req.query['input'], req.query["date"]);
    res.send(await api.getGeo());
})

// GET weather
app.get('/apiWeather', async (req, res) => {
    console.log(`GET /weather content: ${req.query["input"]} ${req.query["date"]}`);
    const api = new APIcall(req.query['input'], req.query["date"]);
    res.send(await api.getGeo());
});

// GET Pix
app.get('/apiPixa', async (req, res) => {
    console.log(`GET /weather content: ${req.query["input"]} ${req.query["date"]}`);
    const api = new APIcall(req.query['input'], req.query["date"]);
    res.send(await api.getGeo());
});