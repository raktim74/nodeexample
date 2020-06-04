var config = require('../config.json');
var mongodb = require('mongoskin');
var Q = require('q');
var _ = require('lodash');
const db = mongodb.db(config.database, {native_parse: true});
db.bind('category');
var service = {};
service.create = create;
service.list = list;
service._delete = _delete;
service.update = update;
service.view = view;
module.exports = service;
function create(reqParam){
    var deferred = Q.defer();
    db.category.insert(reqParam, function (err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve(data);
    });
    return deferred.promise;
}
function list(reqParam){
    var deferred = Q.defer();
    reqParam.isDeleted = false;
    db.category.find(reqParam).toArray(function (err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve(data);
    });
    return deferred.promise;
}
function _delete(reqParam){
    var deferred = Q.defer();
    var _id = reqParam.id;
    delete reqParam['id'];
    db.category.update({_id: mongodb.helper.toObjectID(_id)}, {$set: {isDeleted: true}}, function (err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve("record deleted successfully");
    });
    return deferred.promise;
}
function update(reqParam){
    var deferred = Q.defer();
    var _id = reqParam.id;
    //_.omit(reqParam, 'id'); not working see later
    delete reqParam['id'];
    db.category.update({_id: mongodb.helper.toObjectID(_id)}, {$set: reqParam}, function (err, data){
        if (err) deferred.reject(err.name+' : '+err.message);
        deferred.resolve("updated sucessfully");
    });
    return deferred.promise;
}
function view(id){
    var deferred = Q.defer();
    db.category.findById(id, function (err, data){
        if (err) deferred.reject("error while viewing");
        deferred.resolve(data);
    });
    return deferred.promise;
}