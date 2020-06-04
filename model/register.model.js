var config = require('../config.json');
var mongodb = require('../node_modules/mongoskin');
var Q = require('q');
var bcrypt = require('bcryptjs');
var db = mongodb.db(config.database, {native_parser: true});
db.bind('register');
var service = {};
service.register = register;
service.login = login;
module.exports = service;
function register(reqParam){
    var deferred = Q.defer();
    reqParam.createdDate = new Date();
    reqParam.password = bcrypt.hashSync(reqParam.password);
    db.register.insert(reqParam, function(err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve(data);
    });
    return deferred.promise;
}
function login(reqParam){
    var deferred = Q.defer();
    db.register.findOne({email: reqParam.email, isDeleted: false}, function (err, user){
        if (err) deferred.reject(err.name+' : '+err.message); 
        if (user && bcrypt.compareSync(reqParam.password, user.password)){
            deferred.resolve(user);
        }else{
            deferred.reject("Invalid email or password");
        }
    });
    return deferred.promise;
}