const express = require('express');
const _ = require('lodash');
const sh = require('shorthash')

const { Url } = require('../models/short_url')

const router = express.Router();


// getting all the all the data
router.get('/', (req, res) => {
  Url.find().then(url => {
    res.send(url)
  }).catch(err => res.send(err));
})

router.get('/:hash', (req, res) => {
  let customizeUrl = req.params.hash;
  let clickInfo = {
    userIpaddress: req.ip,
    browserName: req.useragent.browser,
    osType: req.useragent.os,
    deviseType: req.useragent.isDesktop ? 'Desktop' : 'Mobile'
  }
  Url.findOneAndUpdate({ hashed_url: customizeUrl },
    {
      $push: {
        clicks: clickInfo
      }
    }, { new: true }).then(data => {
      // console.log(data)
      res.send(data)
    }).catch(err => res.status(400).send(err))
})

router.get('/tags/:name', (req, res) => {

  Url.find({ tagss: req.params.name }).then(data => {
    let url = data.map(data => (data.original_url))
    res.send(url)
  }).catch(err => res.send(err))
})

router.get('/tags', (req, res) => {
  let splited = req.query.names.split(',')
  console.log(splited);
  // Url.find({tags:req.query.names}).then(data)
  Url.find({ tags: { "$in": splited } }).then(data => {
    res.send(data);
  }).catch(err => res.send(err))

})

router.get('/:id', (req, res) => {
  Url.findById(req.params.id).then(user => {
    (user) ? res.send(user) : res.send({ notice: 'with this id not found' })
  }).catch(err => res.send(err))
})


router.post('/', (req, res) => {
  let body = _.pick(req.body, ['title', 'original_url', 'tags', 'clicks'])
  let url1 = new Url(body);
  url1.save().then(url => {
    res.send(url);
  })
    .catch(err => res.send(err))
})

router.put('/:id', (req, res) => {
  let body = _.pick(req.body, ['title', 'original_url', 'tags', 'clicks']);
  Url.findByIdAndUpdate(req.params.id, { $set: body }, { new: true }).then(data => {
    res.send(data)
  }).catch(err => res.send(data));
})

router.delete('/:id', (req, res) => {
  Url.findByIdAndRemove(req.params.id).then(data => (data) ? res.send({ data, notice: 'sucessfully deleted' }) : res.send({ notice: 'not found' }))
})

module.exports = { urlRouter: router }