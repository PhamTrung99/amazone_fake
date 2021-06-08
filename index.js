const express = require('express');
require('dotenv').config();
const authUser = require('./src/middlewares/authUser.mdw');
const getUserId = require('./src/middlewares/getUserId.mdw');

const app = express();


//Config something 
require('./src/Config/Config')(app);

//Login, Register routes
app.use('/account', require('./src/Routes/account.route'));

//homePage routes
app.use('/',getUserId,require('./src/Routes/homePage.route'));

//Product Detail routes
app.use('/productdetail', getUserId,require('./src/Routes/productDetail.route'));

//Cart page routes
app.use('/cart',authUser,require('./src/Routes/cart.route'));

//Order page routes
app.use('/order',authUser,require('./src/Routes/order.route'));

//Test Connection route
app.use('/connect',require('./src/Routes/testConnect.route'));

//exception page route
app.use('/',require('./src/Routes/exeption.route'));


app.listen(process.env.LOCAL_PORT, () => {
    console.log('App running on port: ' + process.env.LOCAL_PORT);
})  