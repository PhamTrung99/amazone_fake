const db = require('./connect.mysql');

const addInvoice = async (invoice) => {
    return await db(process.env.MYSQL_TABLE_INVOICE).insert(invoice);
}

const getInvoice = async (userID) => {
    return await db(process.env.MYSQL_TABLE_INVOICE).where('USERID',userID).orderBy('ORDER_DATE','desc');
}

const deleteInvoice = async (orderID) => {
    return await db(process.env.MYSQL_TABLE_INVOICE).where('ID',orderID).update('IS_ACTIVE',0).update('STATUS','Đã huỷ');
}

const orderAgain = async (orderID) => {
    return await db(process.env.MYSQL_TABLE_INVOICE).where('ID',orderID)
    .update('IS_ACTIVE',1)
    .update('STATUS','Chờ xác nhận')
    .update('ORDER_DATE',new Date());
}

module.exports = {
    addInvoice,getInvoice,deleteInvoice,orderAgain
};

