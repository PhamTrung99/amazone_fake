const neo4j = require('neo4j-driver');
const message = require('../../messages/message.class');

try {
    var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic('neo4j', '1234'));
    console.log(message.neo4j_Connect_Success);
} catch (error) {
    console.log(error);
    console.log(message.neo4j_Connect_Fail);
}

const getAllComment = async () => {
    let session = driver.session();
    let commentLists = [];
    try {
        var result = await session.run('MATCH (p:Comment) RETURN p LIMIT 5', {});
        result.records.forEach((singleRecord) => {
            commentLists.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return commentLists;
}

const getCommentByProductID = async (proID) => {
    let session = driver.session();
    let commentLists = [];
    try {
        var result = await session.run(`MATCH (c:Comment) WHERE (c)-[:COMMENT_FOR]->({id:${proID}}) RETURN c`, {});
        result.records.forEach((singleRecord) => {
            commentLists.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return commentLists;
}

const getCommentImage = async (proID, comID) => {
    let session = driver.session();
    let images = [];
    try {
        var result = await session.run(`
        MATCH (i:Image),(c:Comment),(p:Product)
        WHERE c.id = ${comID} AND p.id = ${proID}
        AND (c)-[:CMT_IMAGE]->(i) 
        AND (c)-[:COMMENT_FOR]->(p)
        RETURN i`, {});
        result.records.forEach((singleRecord) => {
            Images.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return images;
}

const getCustomerComment = async (proID, comID) => {
    let session = driver.session();
    let customers = [];
    try {
        var result = await session.run(`
        MATCH (cus:Customer),(com:Comment),(p:Product)
        WHERE com.id =  ${comID}  AND p.id = ${proID}
        AND (cus)-[:COMMENT]->(com)
        AND (com)-[:COMMENT_FOR]->(p)
        RETURN cus`, {});
        result.records.forEach((singleRecord) => {
            customers.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return customers;
}

const getSeller = async (proID, comID) => {
    let session = driver.session();
    let Sellers = [];
    try {
        var result = await session.run(`
        MATCH (com:Comment),(p:Product),(s:Seller)
        WHERE com.id =  ${comID}  AND p.id = ${proID}
        AND (s)-[:SELL]->(p)
        AND (com)-[:COMMENT_FOR]->(p)
        RETURN s`, {});
        result.records.forEach((singleRecord) => {
            Sellers.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return Sellers;
}


module.exports = { getAllComment, getCommentByProductID, getCommentImage, getCustomerComment, getSeller }

