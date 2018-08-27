const mongoose = require('../config/db');

const Schema = mongoose.Schema;

const urlSchema = new Schema({

  title:{
      type:String
  },
  original_url:{
      type:String
  },
  tag:[String],
  hashed_url:{
      type:String
  },
  createdAt:{
      type:Date,
      default:Date.now
  }
})

const Url = mongoose.model('Url',urlSchema);

module.exports = { Url } 