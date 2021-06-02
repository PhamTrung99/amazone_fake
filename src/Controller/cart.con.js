const message = require("../messages/message.class");
const { getProductByObjectID } = require("../Model/Mongodb/products.mongo");
const { getAllCartByHkey,addQuantityOfProduct } = require("../Model/Redis/cart.redis");
const { moneyConvert } = require("../public/javascript/moneyConvert");

const userid = "US01"; //Temporary binding for testing.

const cartCon = async (req, res) => {
    let hkey = 'CART:' + userid;
    const hashCart = await getAllCartByHkey(hkey);
    let cartInfo = [];
    for (let field in hashCart) {
        let proID = field.substring(8); //Just get product object ID
        let proInfo = await getProductByObjectID(proID);
        cartInfo.push({
            product_objID: proID,
            product_name: proInfo.name,
            thumbnail_url: proInfo.thumbnail_url,
            price: proInfo.price,
            price_usd: proInfo.price_usd.toFixed(2),
            quantity: +hashCart[field],
            total_price_vnd: +proInfo.price*(+hashCart[field]),
            total_price_usd: +proInfo.price_usd*(+hashCart[field]),
        })
    }

    res.render("pages/cart", { cartInfo, moneyConvert });
}

const addQuantityOfPro = async (req, res) => {
    let proID = req.body.proID;
    let value = req.body.value;
    let flag = await addQuantityOfProduct('CART:'+userid, 'PRODUCT:'+proID, value);
    console.log(proID+' '+value+ ' '+flag);

    res.status(200).json({'message': flag ? message.change_quantity_success:message.change_quantity_fail});
}


module.exports = { cartCon, addQuantityOfPro };