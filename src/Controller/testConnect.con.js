const { getAllProducts } = require("../Model/Mongodb/products.mongo");

const mongoTestCo = async (req, res) => {
    const productList = await getAllProducts();
    res.status(200).json(productList);
}

module.exports = {mongoTestCo}
