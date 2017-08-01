module.exports = function databaseConnection(uri) {

    const autoinc = require('mongoose-auto-increment');
    const mongoose = require('mongoose');

    function DatabaseConnection() {
        console.log('DB Connection:' + uri);
        var db = {};

        mongoose.connect(uri, {
            useMongoClient: true
        });
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        mongoose.connection.once('open', function loadModels() {
            autoinc.initialize(mongoose.connection);
            db.Product = require('../models/Product')(mongoose);

            console.log('DB connection successfully opened');
        });

        return db;

    }
    return new DatabaseConnection();
};