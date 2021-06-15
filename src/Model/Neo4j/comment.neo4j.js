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
        var result = await session.run('MATCH (p:Comment) RETURN p', {});
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



const deleteComment = async (id) => {
    let session = driver.session();
    try {
        await session.run(`MATCH (i:Image {comID: '${id}'}) DETACH DELETE i`, {});
        await session.run(`MATCH (p:Comment {id: '${id}'}) DETACH DELETE p`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const lockComment = async (data) => {
    let session = driver.session();
    try {
        await session.run(`MATCH (p:Comment {id: '${data.id}'}) SET p.status= '${data.status}'`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const getCommentById = async (id) => {
    let session = driver.session();
    let comment;
    try {
        comment = await session.run(`MATCH (p:Comment {id: '${id}'}) RETURN p`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return comment.records[0].get(0).properties;
}



module.exports = { getAllComment, deleteComment, getCommentById, lockComment }

