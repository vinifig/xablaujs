'use strict';
const mongoose = require('mongoose');

function routerGenerator(modelname, model){
  let router = require('express').Router();
  let schema = model.schema.paths;
  // console.log(model.schema.paths.name.instance); type of item

  router.get('/', function(req, res){
    model.find({},function(err,items){
      if(err)
        return res.json({error: err});
      res.json(items);
    })
  })

  router.get('/:param/:value', function(req, res){

    let q = {};
    q[req.params.param] = req.params.value;

    model.find(q, function(err, items){
      if(err)
        return res.json({error: err});
      res.json(items);
    })
  })

  router.post('/', function(req, res){
    try{
      let item = new model(req.body);
      item.save(function(err){
        if(err)
          return res.json(err);
        return res.json({result: `new ${modelname} added to system`})
      })
    }catch(err){
      res.json(err);
    }

  })

  router.put('/', function(req, res){
    model.update({}, req.body, {multi: true}, (err, raw) => {
      if(err)
        return res.json(err);
      return res.json({result: raw});
    })
  })

  router.put('/:param/:value', function(req, res){
    let q = {};
    q[req.params.param] = req.params.value;
    model.update(q, req.body, (err, raw) => {
      if(err)
        return res.json(err);
      return res.json({result: raw});
    })
  })

  router.delete('/', function(req, res){
    let q = {};
    q[req.body.param] = req.body.value;
    model.remove(q, function(err, op){

      if(err)
        return res.json({error: err});
      let count = op.result.n || 0;
      res.json({result: `${count} items removed from system`});
    })
  })

  return router;
}

module.exports = routerGenerator;
