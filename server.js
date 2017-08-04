const express = require('express');
const path = require('path');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = global.Promise;

var absolutePath = __dirname;


//connect to db
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/NODECRUD";
var db = require('./utils/databaseConnection')(MONGO_URI);

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

var context = {
    db: db
};
// Initialize routes middleware
//app.use('/api/products', require('./routes/products')(context));

const products = require('./utils/dataAccess/products')(context);

function replyOK(req, res) {
    res.sendStatus(200);
}

const router = require('./routes/products')(products);
app.use('/api/products', router);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({
        err: err
    });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const io = socket(server);
let online = 0;
io.on('connection', (socket) => {
    online++;
    console.log(`Socket ${socket.id} connected.`);
    console.log(`Online: ${online}`);
    io.emit('visitor enters', online);

    socket.on('add', data => socket.broadcast.emit('add', data));
    socket.on('update', data => socket.broadcast.emit('update', data));
    socket.on('delete', data => socket.broadcast.emit('delete', data));

    socket.on('disconnect', () => {
        online--;
        console.log(`Socket ${socket.id} disconnected.`);
        console.log(`Online: ${online}`);
        io.emit('visitor exits', online);
    });
});