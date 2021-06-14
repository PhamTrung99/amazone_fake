const express = require("express");
const proDetailCon = require("../Controller/productDetail.con");
const route = express.Router();

route.use(express.static('src/public')); // Use static folder for this route. 

route.get('/:objId', proDetailCon.productDetailCon);

route.get('/getproduct/:objId', proDetailCon.getProductById);

module.exports = route;