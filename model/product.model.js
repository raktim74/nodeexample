var config = require('../config.json');
var mongodb = require('mongoskin');
var Q = require('q');
var db = mongodb.db(config.database, {native_parser: true});
db.bind('product');
var service = {};
service.create = create;
service.list = list;
service.update = update;
service.view = view;
service._delete = _delete;
module.exports = service;
function create(reqParam){
    var deferred = Q.defer();
    db.product.insert(reqParam, function(err, data){
        if (err) deferred.reject(err.name+" : "+err.message);
        deferred.resolve(true);
    });
    return deferred.promise;
}
function list(reqParam){
    var deferred = Q.defer();
    db.product.find(reqParam).toArray(function(err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve(data);
    });
    return deferred.promise;
}
function update(reqParam){
    var deferred = Q.defer();
    var _id = reqParam.id;
    delete reqParam['id'];
    db.product.update({_id: mongodb.helper.toObjectID(_id)}, {$set: reqParam}, function(err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve(true);
    });
    return deferred.promise;

}
function view(id){
    var deferred = Q.defer();
    db.product.findById(id, function(err, data){
        if (err) deferred.reject(err.name+ ' : '+err.message);
        deferred.resolve(data);
    });
    return deferred.promise;
}
function _delete(id){
    var deferred = Q.defer();
    // db.product.remove({_id: mongodb.helper.toObjectID(id)}, function(err, data){
    //     if (err) deferred.reject(err.name+' : '+err.message);
    //     deferred.resolve(true);
    // });
    db.product.update({_id: mongodb.helper.toObjectID(id)}, {$set: {isDeleted: true}}, function(err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve(true);
    });
    return deferred.promise;
}