const mongoDB = require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/comment.neo4j");
const redisDB= require("../Model/Redis/cart.redis");

const mongoTestCo = async (req, res) => {
    const productList = await mongoDB.getAllProducts();
    res.status(200).json(productList);
}

const neo4jTestCo = async (req, res) => {
    const result = await neoDB.getAllComment();
    res.status(200).json(result);
}

const redisTestCo = async (req, res) => {
    const cartList = await redisDB.getCart('new');
    res.status(200).json(cartList);
}

module.exports = {mongoTestCo, neo4jTestCo, redisTestCo};
