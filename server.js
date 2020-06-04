var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));
require('./routes')(app);
app.use(function (err, req, res, next){
    if (err.name == "UnauthorizedError"){
        res.status(401).send("Invalid toknen");
    }else{
        throw err;
    }
});
app.listen(3000, function(){
    console.log("Server started at port 3000");
});