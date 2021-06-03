const express = require("express");
const orderCon = require("../Controller/order.con");
const route = express.Router();

route.post('/confirmOrder',orderCon.orderCon);
route.get('/orderManage',orderCon.orderManage);

module.exports = route;
