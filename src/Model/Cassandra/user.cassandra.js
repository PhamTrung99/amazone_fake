const cassandra = require('cassandra-driver');
const message = require('../../messages/message.class');

try{
var client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_HOST],
    localDataCenter: 'datacenter1',
    keyspace: 'user'     //Keyspace is equal to database in RDBMS
});
}catch(error){
    console.log(message.cassandra_Connect_Fail);
}

client.connect(() => {
    console.log(message.cassandra_Connect_Success);
})



const getAllUser = async () => {
    let query = 'SELECT * FROM USER';
    return await client.execute(query).catch(error => { console.log(error); })
}

module.exports = {
    getAllUser
};
