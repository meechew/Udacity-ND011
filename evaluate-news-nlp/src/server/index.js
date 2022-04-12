const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const meaningCloud = require('meaning-cloud');
import { APIcall } from './APIcall.js';

const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// designates what port the app will listen to for incoming requests
const port = 8086;
app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

app.get('/', (req, res) => {
    console.log('GET /');
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/logo', (req, res) => {
    console.log('GET /logo');
    res.sendFile(path.resolve('src/client/img/Sentinel.png'))
})

app.get('/styles/*.css', (req, res) => {
    console.log('GET /style URL:' + req.path);
    res.sendFile(path.resolve('src/client/' + req.path));
})

app.get('/api', async (req, res) => {
    console.log('GET /api URL:' + req.query['input']);


    mockAPIResponse.input = req.query['input'];
    res.send(await APIcall(req.query['input']));
})


console.log("Sentinel online");