var express = require('express');
var router = express.Router();
var categoryModel = require('../model/category.model');
router.post('/create', create);
router.get('/list', list);
router.get('/list/:id', view);
router.put('/update', update);
router.delete('/delete', _delete);
module.exports = router;
function create(req, res){
    categoryModel.create(req.body)
    .then(function (data){
        if (!data) res.send("category is not available");
        res.send('Category record created successfully');
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}
function list(req, res){
    categoryModel.list(req.body)
    .then(function (data){
        if (!data) res.send("Category record is not available");
        res.send(data);
    })
    .catch(function (err){
        res.status(400).send(err);
    });
}
function update(req, res){
    categoryModel.update(req.body)
    .then(function(data){
        if (!data) res.send("failed to update");
        res.send("updated successfully");
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}
function _delete(req, res){
    categoryModel._delete(req.body)
    .then(function (data){
        if (!data) res.send("failed to delete");
        res.send('deleted successfully'); 
    })
    .catch(function (data){

    });
}
function view(req, res){
    categoryModel.view(req.params.id)
    .then(function (data){
        if (!data) res.send("View is not available");
        res.send(data);
    })
    .catch(function (err){
        res.status(400).send(err);
    });
}