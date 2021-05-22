const express = require('express');
require('dotenv').config();
const app = express();

//Config something 
require('./src/Config/Config')(app);

//homePage routes
app.use('/',require('./src/Routes/homePage.route'));

//Test Connection Page
app.use('/connect', require('./src/Routes/testConnect.route'));

//exception page routes
app.use('/',require('./src/Routes/exeption.route'));


app.listen(process.env.LOCAL_PORT, () => {
    console.log('App running on port: ' + process.env.LOCAL_PORT);
})  