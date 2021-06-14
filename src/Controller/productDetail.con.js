const { getProductByObjectID } = require("../Model/Mongodb/products.mongo")

const productDetailCon = async (req, res) => {
    const proInfo = await getProductByObjectID(req.params.objId);

    res.render("pages/productDetail",{proInfo});
}

const getProductById = async (req, res) => {
    const product = await getProductByObjectID(req.params.objId);
    res.json(product);
}

module.exports = {
    productDetailCon, getProductById
};
