///////////////////////////////
// DEPENDENCIES
///////////////////////////////

// get .env variables
require('dotenv').config();


// pull PORT from .env, give default value of 3001
const { DATABASE_URL, PORT = 3001 } = process.env;


// import express
const express = require('express');


// create application object
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


///////////////////////////////
// DATABASE CONNECTION
///////////////////////////////

// establish connection 
mongoose.connect(DATABASE_URL);


// connection events
mongoose.connection
    .on('open', () => console.log("Connected to MongoDB..."))
    .on('close', () => console.log('You are not connected to MongoDB'))
    .on('error', (error) => console.log(error))


///////////////////////////////
// MODELS
///////////////////////////////

const Schema = mongoose.Schema;
const PeopleSchema = new mongoose.Schema ({
    name: String,
    image: String,
    title: String,
}, { timestamps: true });

const People = mongoose.model('People', PeopleSchema)


///////////////////////////////
// MIDDLEWARE
///////////////////////////////

app.use(cors()); // to prevent cors errors, open acces to all origiins
app.use(morgan('dev')); // logging
app.use(express.json()); // parse json bodies


///////////////////////////////
// ROUTES
///////////////////////////////

// create test route
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Index Route
app.get('/people', async (req, res) => {
    try { 
        // send all people
        res.json(await People.find({}));
    } catch (error) {
        // send error
        res.statusMessage(400).json(errpr);
    }
})


// Create Route
app.post('/people', async (req, res) => {
    try {
        // send all people
        res.json(await People.create(req.body));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})


// Delete Route
app.delete('/people/:id', async (req, res) => {
    try {
        // send all people
        res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {

        // send error
        res.status(400).json(error);
    }
})


// Update Route
app.put('/people/:id', async (req, res) => {
    try {
        // send all people
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})



///////////////////////////////
// LISTENER
///////////////////////////////

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));