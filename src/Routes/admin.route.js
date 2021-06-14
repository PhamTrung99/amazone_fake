const express = require("express");
const adminCon = require('../Controller/admin.con');
const route = express.Router();

route.get('/', adminCon.index);

// ---------------Manage User
route.get('/manageuser', adminCon.manageUser);
route.patch('/updateuser', adminCon.updateUser);
route.delete('/deleteuser/:email', adminCon.deleteUser);

// ---------------Manage Product
route.get('/manageproduct', adminCon.manageProduct);
route.patch('updateproduct', adminCon.updateUser);
route.delete('deleteproduct', adminCon.deleteUser);
route.post('addproduct', adminCon.addProduct);



module.exports = route;