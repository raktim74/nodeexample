// var config = require('./config.json');
// var serverUrl = config.apiUrl;
module.exports = function (app){
    app.use('/register', require('./controller/register.controller'));
    app.use('/category', require('./controller/category.controller'));
    app.use('/product', require('./controller/product.controller'));
}