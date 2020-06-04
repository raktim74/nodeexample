var express = require('express');
var router = express.Router();
var productModel = require('../model/product.model');
router.post('/create', create);
router.get('/list', list);
router.get('/list/:_id', view);
router.put('/update', update);
router.delete('/delete', _delete);
module.exports = router;
function create(req, res){
    productModel.create(req.body)
    .then(function (data){
        if (!data) res.send({error: "failed to create"});
        res.send('created successfully');
    })
    .catch(function (err){
        res.status(400).send(err);
    });
}
function list(req, res){
    productModel.list(req.body)
    .then(function (data){
        if (!data) res.send({error: "no records found"});
        res.send(data);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}
function view(req, res){
    productModel.view(req.params._id)
    .then(function(data){
        if (!data) res.send({error: "view is not available"});
        res.send(data);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}
function update(req, res){
    productModel.update(req.body)
    .then(function(data){
        if (!data) deferred.reject({error: "failed to update"});
        res.send({success: "data updated successfully"});
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}
function _delete(req, res){
    productModel._delete(req.body.id)
    .then(function(data){
        if (!data) res.send({error: "failed to delete"});
        res.send({success: "deleted successfully"});
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}
