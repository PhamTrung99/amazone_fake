const mongoDB = require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/comment.neo4j");
const redisDB = require("../Model/Redis/cart.redis");
const { moneyConvert } = require("../public/javascript/moneyConvert");


const getProduct = async (req, res) => {
    const proInfo = await mongoDB.getProductByObjectID(req.body._id);
    res.status(200).json({
        name: proInfo.name,
        image: proInfo.thumbnail_url,
        price: proInfo.price
    })
}


const productDetailCon = async (req, res) => {
    let userid = req.userid;
    let cmtImages = [];
    let cmtCustomers = [];
    let sellers = [];

    const proInfo = await mongoDB.getProductByObjectID(req.params.objId);
    let price = moneyConvert(String(proInfo.price));
    let comments = await neoDB.getCommentByProductID(proInfo.id);
    let checkExistInCart = await redisDB.checkExistPro('CART:' + userid, 'PRODUCT:' + proInfo._id);

    for (let i = 0; i < comments.length; i++) {
        let images = await neoDB.getCommentImage(proInfo.id, comments[i].id);
        let customers = await neoDB.getCustomerComment(proInfo.id, comments[i].id);
        let seller = await neoDB.getSeller(proInfo.id, comments[i].id);

        cmtImages.push(...images);
        cmtCustomers.push(customers);
        sellers.push(seller);
    };
    let checkCommentExists = await neoDB.checkExistsComment(userid, proInfo.id);
    if(checkCommentExists.createby == userid){
        checkCommentExists = true;
    }else{checkCommentExists = false}
    res.render("pages/productDetail", { proInfo, price, comments, cmtImages, cmtCustomers, sellers, checkExistInCart, checkCommentExists });
}

const setComment = async(req, res) =>{
    let userid = req.userid;
    let proID = req.body.proID;
    let title = req.body.title;
    let content = req.body.content;
    let rating = req.body.rating;
    let commentID = String(userid)+String(proID);

    await neoDB.setComment(proID, userID, title, content, commentID, rating);
    await neoDB.setRelationComtoPro(commentID,proID);
    res.status(201).json({});
} 


module.exports = {
    productDetailCon, getProduct, setComment
};
