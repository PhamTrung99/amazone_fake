const express = require("express");
const adminCon = require('../Controller/admin.con');
const route = express.Router();

route.get('/', adminCon.index);
route.get('/manageuser', adminCon.manageUser);

route.post('/updateuser', adminCon.updateUser);
route.delete('/deleteuser/:email', adminCon.deleteUser);

module.exports = route;