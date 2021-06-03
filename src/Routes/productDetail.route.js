const express = require("express");
const proDetailCon = require("../Controller/productDetail.con");
const route = express.Router();

route.get('/:objId', proDetailCon.productDetailCon);
route.post('/getinfo', proDetailCon.getProduct);

module.exports = route;