const express = require('express');
require('dotenv').config();
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


//Config something 
require('./src/Config/Config')(app);

//Login, Register routes

app.use('/account', require('./src/Routes/account.route'));

//homePage routes
app.use('/',require('./src/Routes/homePage.route'));

//Product Detail routes
app.use('/productdetail', require('./src/Routes/productDetail.route'));

//Test Connection route
app.use('/connect', require('./src/Routes/testConnect.route'));

//exception page route
app.use('/',require('./src/Routes/exeption.route'));


app.listen(process.env.LOCAL_PORT, () => {
    console.log('App running on port: ' + process.env.LOCAL_PORT);
})  