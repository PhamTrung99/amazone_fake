const mongoDB= require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/comment.neo4j");
const { moneyConvert } = require("../public/javascript/moneyConvert");

const productDetailCon = async (req, res) => {
    const proInfo = await mongoDB.getProductByObjectID(req.params.objId);
    let price = moneyConvert(String(proInfo.price));
    let comments = await neoDB.getCommentByProductID(proInfo.id);
    let cmtImages = [];
    let cmtCustomers = [];
    let sellers = [];

    for (let i = 0; i < comments.length; i++) {
        let images = await neoDB.getCommentImage(proInfo.id, comments[i].id);
        let customers = await neoDB.getCustomerComment(proInfo.id, comments[i].id);
        let seller = await neoDB.getSeller(proInfo.id, comments[i].id);

        cmtImages.push(...images);
        cmtCustomers.push(customers);
        sellers.push(seller);
    };

    res.render("pages/productDetail", { proInfo, price, comments, cmtImages, cmtCustomers, sellers });
}


module.exports = {
    productDetailCon
};
