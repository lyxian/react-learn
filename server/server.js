require('dotenv').config();
// const mongoString = process.env.DATABASE_URL;    // DATABASE_URL from .env = <CONN_STRING>/<DATABASE_NAME>
// const port = process.env.PORT || 6379;
const LOCALHOST = process.env.LOCALHOST || 'http://localhost';

const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: `${LOCALHOST}:3000`
        // origin: "http://localhost:3000"
        // origin: '*',
    }
});

//👇🏻 Array containing all the to-dos
let todoList = [];

socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("addTodo", (todo) => {
        //👇🏻 Adds the to-do object to the list of to-dos
        todoList.unshift(todo);
        //👇🏻 Sends all the to-dos to the React app
        socket.emit("todos", todoList);
    });

    //👇🏻 Filters the array of to-dos and
    //   sends the updated to-do to the React app.
    socket.on("deleteTodo", (id) => {
        todoList = todoList.filter((todo) => todo.id !== id);
        //👇🏻 Sends the updated to-do to the React app
        socket.emit("todos", todoList);
    });

    socket.on("viewComments", (id) => {
        for (let i = 0; i < todoList.length; i++) {
            if (id === todoList[i].id) {
                //👇🏻 sends the todo details back to the React app for display
                socket.emit("commentsReceived", todoList[i]);
            }
        }
    });

    socket.on("updateComment", (data) => {
        //👇🏻 Destructure the items from the object
        const { user, todoID, comment } = data;

        for (let i = 0; i < todoList.length; i++) {
            //👇🏻 Gets the todo
            if (todoID === todoList[i].id) {
                //👇🏻 Add the comment to the list of comments
                todoList[i].comments.push({ name: user, text: comment });
                //👇🏻 Sends an update to React app
                socket.emit("commentsReceived", todoList[i]);
            }
        }
    });

    socket.on("disconnect", () => {
        socket.disconnect();
        console.log("🔥: A user disconnected");
    });
});

app.get("/api", (req, res) => {
    res.json(todoList);
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

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
