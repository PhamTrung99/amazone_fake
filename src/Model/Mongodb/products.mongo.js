const mongoose = require('mongoose');
const message = require('../../messages/message.class');
const productModel = require('./models/product.model');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

try {
    mongoose.connect(process.env.TIKI_MONGODB_URL, options);
    console.log(message.mongo_Connect_Success);
} catch (error) {
    console.log(message.mongo_Connect_Fail);
    console.log(error);
}



const getAllProducts = async () => {
    const productList = await productModel.find({});
    return productList;
}

const getProductByObjectID = async (_id) => {
    const product = await productModel.findById(_id);
    return product;
}

module.exports = { getAllProducts,getProductByObjectID }



