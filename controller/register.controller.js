// var config = require('../config.json');
var express = require('express');
var registerModel = require('../model/register.model');
var router = express.Router();
module.exports = router;
router.post('/registeruser', register);
router.post('/login', login);
function register(req, res){
    registerModel.register(req.body)
    .then(function(data){
       if (!data) res.status(400).send("Failed to register");
        res.send("Registration successfull");
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}
function login(req, res){
    registerModel.login(req.body)
    .then(function (data){
        if (!data) res.send('User is not available');
        data.msg = 'Loggedin successfully';
        res.send(data);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}