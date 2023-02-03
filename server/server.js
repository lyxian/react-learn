// require('dotenv').config();
// const mongoString = process.env.DATABASE_URL;    // DATABASE_URL from .env = <CONN_STRING>/<DATABASE_NAME>
// const port = process.env.PORT || 6379;

// const routes = require('./routes');
// const express = require('express');
// const mongoose = require('mongoose');
// var cors = require('cors');

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on('error', (error) => {
//     console.log(error);
// })

// database.once('connected', () => {
//     console.log('Database connected');
// })

// const app = express();

// app.use(cors({ origin: true, credentials: true }));
// app.use(express.json());

// app.use('/api', routes);    // set route endpoints to start from '/api'

// app.listen(port, () => {
//     console.log(`Server started at ${port}`);
// })


const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

const activeUsers = new Set();

io.on("connection", (socket) => {
    console.log("Made socket connection");

    socket.on("new user", (data) => {
        socket.userId = data;
        activeUsers.add(data);
        io.emit("new user", [...activeUsers]);
    });

    socket.on("chat message", function (data) {
        io.emit("chat message", data);
    });

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId);
        io.emit("user disconnected", socket.userId);
    });
});