const express = require("express");
const proDetailCon = require("../Controller/productDetail.con");
const route = express.Router();

//root '/productdetail'
route.get('/:objId', proDetailCon.productDetailCon);
route.post('/getinfo', proDetailCon.getProduct);
route.post('/setcomment', proDetailCon.setComment);


module.exports = route;