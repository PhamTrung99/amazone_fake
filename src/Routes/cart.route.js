const express = require("express");
const route = express.Router();
const cartCon = require('../Controller/cart.con');

route.get('/',cartCon.cartCon);
route.post('/addQuantity',cartCon.addQuantityOfPro);

module.exports = route;