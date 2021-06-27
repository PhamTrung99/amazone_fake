const express = require('express');
const accountCon = require('../Controller/account.con');
const route = express.Router();
 

route.get('/register', accountCon.getRegister);
route.post('/register', accountCon.postRegister)
route.get('/checkexistemail/:email',accountCon.isExistEmail)

route.get('/login', accountCon.getLogin);
route.post('/checkaccount', accountCon.checkAccount);
route.post('/login', accountCon.postLogin);

route.get('/logout', accountCon.postLogout)
module.exports = route;