const { getProductByObjectID } = require("../Model/Mongodb/products.mongo");
const { getAllCartByHkey } = require("../Model/Redis/cart.redis");
const {moneyConvert} = require("../Service/moneyConvert.sv");

const userid = "US01"; //Temporary binding for testing.

const cartCon = async (req, res) => {
    let hkey = 'CART:'+userid;
    const hashCart = await getAllCartByHkey(hkey);
    let cartInfo = [];
    for(let field in hashCart) {
        let proID = field.substring(8); //Just get product object ID
        let proInfo = await getProductByObjectID(proID);
        cartInfo.push({
            product_name: proInfo.name,
            thumbnail_url: proInfo.thumbnail_url,
            price: proInfo.price,
            price_usd: proInfo.price_usd,
            quantity: +hashCart[field]
        })
    }
    console.log(cartInfo);
    
    res.render("pages/cart", {cartInfo, moneyConvert});
}

module.exports = { cartCon };