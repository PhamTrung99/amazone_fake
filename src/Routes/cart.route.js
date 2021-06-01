const express = require("express");
const route = express.Router();
const cartCon = require('../Controller/cart.con');

route.get('/',cartCon.cartCon);

module.exports = route;