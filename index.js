'use strict';

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./lib/router');
const db_configurations = {};
const structs = [];


const xablau = {
  init : function(db_data, expapp){
    db_configurations.server = db_data.server || 'localhost';
    db_configurations.port = db_data.port || 27019;
    db_configurations.dbname = db_data.dbname || 'xablau';

    expapp.use(cors());
    expapp.use(bodyParser.urlencoded({extended: false}));
    expapp.use(bodyParser.json());

    setModels(expapp);
    connect();
  },
  connect: connect,
  close : mongoose.connection.close,
  structs : {
    add : function(name, schema){
      structs.push({name:name, schema:schema});
    },
    remove : function(name){
      let i;
      for(i = 0; i < structNames.length; i++)
        if(structNames[i].name == name)
          break;
      if(i == structNames.length)
        return;
      structs.splice(i,1);
    },
    list  : function(){
      return Array.from(structs);
    }
  },
  Schema: mongoose.Schema,
  Server: express
};

module.exports = xablau;

function connect(){
  let connString = 'mongodb://';
  if(db_configurations.user && db_configurations.password)
    connString += `${db_configurations.user}:${db_configurations.password}@`;
  connString+= `${db_configurations.server}:${db_configurations.port}/${db_configurations.dbname}`;
  mongoose.connect(connString);
}

function setModels(expapp){
  structs.forEach(function(el){
    let model = mongoose.model(el.name, el.schema);
    expapp.use('/' + el.name, router(el.name, model))
  })

}
