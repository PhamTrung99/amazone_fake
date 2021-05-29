const { getProductByObjectID } = require("../Model/Mongodb/products.mongo");
const { getCommentByProductID, getCommentImage } = require("../Model/Neo4j/comment.neo4j");
const { moneyConvert } = require("../Service/moneyConvert.sv");

const productDetailCon = async (req, res) => {
    const proInfo = await getProductByObjectID(req.params.objId);
    let price = moneyConvert(String(proInfo.price));
    let comments = await getCommentByProductID(proInfo.id);
    let cmtImages = [];

    for(let i = 0; i<comments.length; i++){
        let images = await getCommentImage(proInfo.id, comments[i].id);
        cmtImages.push(...images);
    };

    res.render("pages/productDetail",{proInfo, price, comments,cmtImages });
}


module.exports = {
    productDetailCon
};
