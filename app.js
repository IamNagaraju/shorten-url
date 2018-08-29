const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const useragent = require('express-useragent');
const  { urlRouter } = require('./router/short_url');

const app = express();
const port = 3000;

app.use(useragent.express());

app.use(bodyParser.json());

app.use(morgan('short'));

app.use('/urls', urlRouter)


 

app.listen(port,() => {
    console.log('listing to port number '+port)
})