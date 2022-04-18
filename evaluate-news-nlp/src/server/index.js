const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const APIcall = require('./APIcall.js');
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
    const api = new APIcall(req.query['input']);
    res.send(await api.call());
})


console.log("Sentinel online");