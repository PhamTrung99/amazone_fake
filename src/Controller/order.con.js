const { getCartInfo } = require('./cart.con');
const mysqlDB = require('../Model/Mysql/invoice.mysql');
const redisDB = require("../Model/Redis/cart.redis");
const {moneyConvert} = require("../public/javascript/moneyConvert");


const addInvoice = async (userid) => {
    let cartInfo = await getCartInfo(userid);
    let listProsID = [];
    let total_vnd = 0, total_usd = 0;
    cartInfo.map((proInfo) => {
        listProsID.push(proInfo.product_objID);
        total_vnd += proInfo.total_price_vnd;
        total_usd += proInfo.total_price_usd;
    })

    await mysqlDB.addInvoice({
        USERID: userid,
        CARTID: 'CART:' + userid,
        LISTPRODUCTID: String(listProsID),
        TOTAL_VND: total_vnd,
        TOTAL_USD: total_usd,
        IS_ACTIVE: true,
        ORDER_DATE: new Date(),
        STATUS: 'Chờ xác nhận',
        IS_PAY: false
    })

    await redisDB.deleteCart('CART:' + userid);

}

const orderCon = async (req, res) => {
    let userid = req.userid;
    let confirm = req.body.order_confirm;
    if (confirm) {
        await addInvoice(userid);
    }
    
}

const cancleOrder = async (req, res) => {
    let orderID = req.body.orderID;
    await mysqlDB.deleteInvoice(orderID);

    res.status(201).json({});
}

const orderAgain = async (req, res) => {
    let orderID = req.body.orderID;
    await mysqlDB.orderAgain(orderID);

    res.status(201).json({});
}


const orderManage = async (req, res) => {
    let userid = req.userid;
    let invoiceList = await mysqlDB.getInvoice(userid);
    res.status(200).render('pages/orderManage', {invoiceList, moneyConvert});
}

module.exports = {
    orderCon, orderManage, cancleOrder, orderAgain
};
