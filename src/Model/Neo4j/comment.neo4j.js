const neo4j = require('neo4j-driver');
const message = require('../../messages/message.class');

try {
    var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic('neo4j', '1234'));
    console.log(message.neo4j_Connect_Sucesss);
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



module.exports = { getAllComment }

