const validate = require('mongoose-validator');
module.exports = function (mongroose) {

    const nameValidator = [
        validate({
            validator: 'isLength',
            arguments: [10, 40],
            message: 'Product name must between  {ARGS[0]} - {ARGS[1]} characters.'
        })
    ];

    var Schema = new mongroose.Schema({
        _id: {
            type: mongroose.Schema.Types.ObjectId,
            default: function f() {
                return new mongroose.Types.ObjectId();
            }
        },
        productName: {
            type: String,
            required: [true, 'Product name is required.'],
            validate: nameValidator
        },
        cost: {
            type: Number
        },
        currency: {
            type: String
        },
        details: {
            type: String
        }
    });
    Schema.set('autoIndex', true);

    var Model = mongroose.model('Product', Schema);
    return Model;
};