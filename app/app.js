const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');

const AuthToken = require('./middlewares/AuthToken');

app.use(AuthToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/product', Product);
app.use('/user', User);
app.use('/auth', Auth);



module.exports = app