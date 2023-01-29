require('dotenv').config();
var path = require('path')
const mongoString = process.env.DATABASE_URL;    // DATABASE_URL from .env = <CONN_STRING>/<DATABASE_NAME>
const port = 3000; // process.env.PORT || 6379;

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { initializeRoutes } = require("./routes");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static('server/static'))

// app = initializeRoutes(app);
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
    // res.status(200).send({
    //     success: true,
    //     message: "welcome to the beginning of greatness",
    // });
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + '/templates/login.html');
});
app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/templates/register.html');
});

const pg = require('pg');
const connString = process.env.CONN_STRING;    // DATABASE_URL from .env = <CONN_STRING>/<DATABASE_NAME>
const client = new pg.Client(connString);

// CREATE TABLE players (
// user_id serial PRIMARY KEY,
// username VARCHAR(50) UNIQUE NOT NULL,
// password VARCHAR(50)
// )

// ALTER TABLE players ALTER COLUMN password TYPE VARCHAR(50)
// ALTER TABLE players DROP CONSTRAINT players_password_key
// ALTER TABLE players DROP CONSTRAINT <table>_<col>_key

// INSERT INTO players (username, password)
// VALUES ('username', 'password');

app.post("/api/login", async (req, res) => {
    const { body: { username, password } } = req

    const client = new pg.Client(connString);
    await client.connect((err) => {
        if (err) {
            console.log(err)
            res.status(403).send({
                success: false,
                message: `could not connect to postgres: ${err}`
            })
            // return console.error('could not connect to postgres', err);
        } else {
            query = `SELECT * FROM players WHERE username = '${username}';`
            console.log('Executing query:', query)
            client.query(query, (err, result) => {
                // console.log(err, result)
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: `error running query: ${err.detail}`
                        // message: `could not connect to postgres: ${err.detail}`
                    })
                    // statusCode = 400
                    // return console.error('error running query', err);
                } else {
                    // console.log('result: ', result.rows)
                    if (result.rows.length && result.rows.at(0).password === password) {
                        res.status(200).send({
                            success: true,
                            message: `successfully logged in as ${username}`
                        })
                    } else {
                        res.status(401).send({
                            success: false,
                            message: `wrong username and password`
                        })
                    }
                }
            });
        }
        client.end();
    });
})

app.post("/api/register", async (req, res) => {
    const { body: { username, password } } = req

    await client.connect((err) => {
        if (err) {
            res.status(401).send({
                success: false,
                message: `could not connect to postgres: ${err.detail}`
            })
            // return console.error('could not connect to postgres', err);
        } else {
            query = `INSERT INTO players (username, password) VALUES ('${username}', '${password}');`
            client.query(query, (err, result) => {
                client.end();
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: `error running query: ${err.detail}`
                        // message: `could not connect to postgres: ${err.detail}`
                    })
                    // statusCode = 400
                    // return console.error('error running query', err);
                } else {
                    console.log(result)
                    res.status(200).send({
                        success: true,
                        message: `user-${username} created successfully`
                    })
                }
            });
        }
    });
})

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        // origin: "http://192.168.2.136:3000",
        methods: ["GET", "POST"],
        origin: "*",
    },
});

// io.use((socket, next) => {
//     if (socket.handshake.headers.auth) {
//         const { auth } = socket.handshake.headers;
//         const token = auth.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
//             if (err) {
//                 throw new Error("Authentication error, Invalid Token supplied");
//             }
//             const theUser = await db.User.findByPk(decodedToken.id);
//             if (!theUser)
//                 throw new Error(
//                     "Invalid Email or Password, Kindly contact the admin if this is an anomaly"
//                 );
//             socket.theUser = theUser;
//             return next();
//         });
//     } else {
//         console.log("no auth")
//         throw new Error("Authentication error, Please provide a token");
//     }
// });

// io.on("connection", (socket) => {
//     console.log(`User-${socket.id} connected`);
//     socket.on('disconnect', () => {
//         console.log(`User-${socket.id} disconnected`);
//     });
// });

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// test events
// const axios = require("axios");

// const sendData = async (id, res) => {
//     const { data } = await axios.get(
//         'https://jsonplaceholder.typicode.com/todos/' + id
//     );
//     const dataString = JSON.stringify(data);

//     // await sleep(1000);
//     await new Promise(r => setTimeout(r, 1000));

//     res.write('event: message\n');

//     res.write('data: ' + dataString);
//     res.write('\n\n');
// };

// app.get('/events', async (_, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//     });
//     for (let i = 1; i < 10; i++) {
//         await sendData(i, res);
//     }
//     res.end();
// });