const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')

const  { urlRouter } = require('./router/short_url');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(morgan('short'));

app.use('/url', urlRouter)

app.listen(port,() => {
    console.log('listing to port number '+port)
})