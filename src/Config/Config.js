const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


module.exports =(app) => {
    app.use(express.static('src/public'));  // Only apply static folder for name index.ejs
    app.set("view engine", "ejs");        
    app.set("views",path.join(process.cwd() + "/src/Views"));
    app.use(bodyParser.urlencoded({ extended: false }));
};
