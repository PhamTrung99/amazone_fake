const express = require('express');
const accountCon = require('../Controller/account.con');
const route = express.Router();

route.get('/register', accountCon.getRegister);

route.get('/login', accountCon.getLogin);

module.exports = route;