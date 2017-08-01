const express = require('express');
const path = require('path');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

var context = {
    db: db
};
// Initialize routes middleware
//app.use('/api/products', require('./routes/products')(context));

const products = require('./utils/dataAccess/products')(context);

function replyOK(req, res) {
    res.sendStatus(200);
}




const router = express.Router({mergeParams: true});
router.get('/:id', (req, res) => {
    products.getProductById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                msg: `No such product.`
            });
        });
});


router.get('/:name', (req, res) => {
    products.getProductByName(req.params.name)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                msg: `No such product.`
            });
        });
});

router.get('/', (req, res) => {
    products.getAllProduct()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                msg: `No such product.`
            });
        });
});

router.post('/', (req, res) => {
    let product = new db.Product({
        productName: req.body.productName,
        cost: req.body.cost,
        currency: req.body.currency,
        details: req.body.details
    });

    products.saveProduct(product)
        .then((result) => {
            res.json({
                success: true,
                msg: `Successfully added!`,
                result: {
                    _id: result._id,
                    productName: result.productName,
                    cost: result.cost,
                    currency: result.currency,
                    details: result.details
                }
            });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.productName) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.productName.message
                    });
                    return;
                }

                // Show failed if all else fails for some reasons
                res.status(500).json({
                    success: false,
                    msg: `Something went wrong. ${err}`
                });
            }
        });
});

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