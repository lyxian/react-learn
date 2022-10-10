require('dotenv').config();
const mongoString = process.env.DATABASE_URL;    // DATABASE_URL from .env = <CONN_STRING>/<DATABASE_NAME>
const port = process.env.PORT || 6379;

const routes = require('./routes');
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database connected');
})

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api', routes);    // set route endpoints to start from '/api'

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})
