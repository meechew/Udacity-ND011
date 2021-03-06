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
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


const port = 8000;
// Setup Server
app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

// GET method route
app.get('/weather', (request, response)=> {
    console.log("POST /weather " + "{content:" + projectData.content + ",date:" +
        projectData.date + "temp:" + projectData.temp + "}");
    response.send(projectData);
});

// POST method route
app.post('/weather', (request, response)=> {
    projectData = request.body;
    console.log("POST /weather " + "{content:" + projectData.content + ",date:" +
        projectData.date + "temp:" + projectData.temp + "}");
    response.send(projectData);
})