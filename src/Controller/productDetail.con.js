const { getProductByObjectID } = require("../Model/Mongodb/products.mongo")

const productDetailCon = async (req, res) => {
    const proInfo = await getProductByObjectID(req.params.objId);

    res.render("pages/productDetail",{proInfo});
}

module.exports = {
    productDetailCon
};
