/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 8000;
/* Spin up the server*/
const server = app.listen(port, ()=>{
    console.log(`running on localhost: ${port}`)
});

app.post('/add',(req,res)=>{
    projectData.city = req.body.city
    projectData.date = req.body.date;
    projectData.weather = req.body.weather;
    projectData.mood = req.body.mood;
    res.send(projectData)
})

app.get('/all',(req,res)=>{
    res.send(projectData)
})