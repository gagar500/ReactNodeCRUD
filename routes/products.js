const express = require('express');
const router = express.Router({mergeParams: true});

module.exports =  function(products){  

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
    

return router;
}