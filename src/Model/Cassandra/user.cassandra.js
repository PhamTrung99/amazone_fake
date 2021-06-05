const cassandra = require('cassandra-driver');
const message = require('../../messages/message.class');

try{
var client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_HOST],
    localDataCenter: 'datacenter1',
    keyspace: 'amazone'     //Keyspace is equal to database in RDBMS
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

class User {
    async createUser (data) {
        let query = `INSERT INTO user (name, email, password, role, status) VALUES ('${data.name}', '${data.email}', '${data.password}',1,1)`;
        console.log(query);
        return await client.execute(query).catch(error => { console.log(error); })
    }

    async getUserByEmail (email) {
        let query = `SELECT * FROM user WHERE email = '${email}'`;
        let flag = false;
        return await client.execute(query).catch(error => { console.log(error); })
    }
}
module.exports = new User();
