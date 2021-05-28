const { getProductByObjectID } = require("../Model/Mongodb/products.mongo");
const { moneyConvert } = require("../Service/moneyConvert.sv");

const productDetailCon = async (req, res) => {
    const proInfo = await getProductByObjectID(req.params.objId);
    let price = moneyConvert(String(proInfo.price));
    res.render("pages/productDetail",{proInfo, price});
}

module.exports = {
    productDetailCon
};
