const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const sh = require('shorthash')

const { Url } = require('../models/short_url')

const router = express.Router();



router.get('/', (req, res) => {
    Url.find().then(url => {
        res.send(url)
    }).catch(err => res.send(err));
})

router.get('/urls/tags/:name',(req,res) => {

    Url.find({tag:req.params.name}).then(data => {
      let url =  data.map(data =>(data.original_url))
      res.send(url)
    }).catch(err => res.send(err))
})

router.get('/urls/tags',(req,res) => {
  let splited =   req.query.names.split(',')
  console.log(splited);
    // Url.find({tag:req.query.names}).then(data)
    Url.find({tag: {"$in": splited}}).then(data =>{
     res.send(data);
    } )

})

router.get('/short_url/:hash', (req, res) => {
    let customizeUrl = req.params.hash;
    Url.find({ hashed_url: customizeUrl }).then(data => {
        let url_original = data.map(url => {
            return url.original_url
        })
        if (url_original.length > 0) {
            res.send(url_original);
        } else {
            res.send({ notice: 'data not found' })
        }
    }).catch(err => res.send(err))
})

router.get('/:id',(req,res) => {
    Url.findById(req.params.id).then( user => {
        (user) ? res.send(user) : res.send({notice:'with this id not found'})
    }).catch(err => res.send(err))
})


router.post('/', (req, res) => {
    let body = _.pick(req.body, ['title', 'original_url', 'tag'])
    let url1 = new Url(body);
    url1.save().then(url => {
        res.send(url);
    })
        .catch(err => res.send(err))
})

router.put('/:id', (req, res) => {
    let body = _.pick(req.body, ['title', 'original_url', 'tag']);
    Url.findByIdAndUpdate(req.params.id, { $set: body }, { new: true }).then(data => {
        res.send(data)
    }).catch(err => res.send(data));
})

router.delete('/:id', (req, res) => {
    Url.findByIdAndRemove(req.params.id).then(data => (data) ? res.send({ data, notice: 'sucessfully deleted' }) : res.send({ notice: 'not found' }))
})

module.exports = { urlRouter: router }