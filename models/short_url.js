const { mongoose }= require('../config/db');
const sh = require('shorthash');
const validator = require('validator')

const Schema = mongoose.Schema;

const urlSchema = new Schema({

  title:{
      type:String,
  },
  original_url:{
      type:String,
      validate: {
        validator:function(value) {
         return validator.isURL(value);
        },
        message: function (props) {
            return `${props.path} is not a valid`
        }
    }
  },
  tags:[String],
  hashed_url:{
      type:String
  },
  createdAt:{
      type:Date,
      default:Date.now
  }
})

urlSchema.pre('save',function(next) {
    if(!this.hashed_url) {
        this.hashed_url = sh.unique(this.original_url)
    }
    next();
   })

const Url = mongoose.model('Url',urlSchema);

module.exports = { Url } 