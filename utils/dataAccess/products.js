
module.exports = function products(context){
var db = context.db;

function Products(db){
    var _this = this;

    this.getAllProduct = function getAllProduct(){
        return db.Product.find({});
    };

    this.getProductById = function getProductById(productId){
        return db.Product.findById(productId);
    };

    this.getProductByName = function getProductByName(productName){
        return db.Product.find({"productName": "/" + productName + "/"})
    };

    this.saveProduct = function saveProduct(product){
         return product.save();
    }

}

return new Products(context.db);

}