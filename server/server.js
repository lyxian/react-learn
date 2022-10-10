require('dotenv').config();
const mongoString = process.env.DATABASE_URL;    // DATABASE_URL from .env = <CONN_STRING>/<DATABASE_NAME>

const routes = require('./routes');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database connected');
})

const app = express();

app.use(express.json());

app.use('/api', routes);    // set route endpoints to start from '/api'

app.listen(6379, () => {
    console.log(`Server started at ${6379}`);
})
