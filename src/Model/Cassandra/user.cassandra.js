const cassandra = require('cassandra-driver');
const message = require('../../messages/message.class');
const moment = require('moment');

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

    async getAllUser () {
        let query = 'SELECT * FROM user';
        return await client.execute(query).catch(error => { console.log(error); })
    }
    async createUser (data) {
        let timeNow = moment().format();
        let query = `INSERT INTO user (name, email, password, role, status, createdat) VALUES ('${data.name}', '${data.email}', '${data.password}',1,1, '${timeNow}')`;
        return await client.execute(query).catch(error => { console.log(error); })
    }

    async getUserByEmail (email) {
        let query = `SELECT * FROM user WHERE email = '${email}'`;
        let flag = false;
        return await client.execute(query).catch(error => { console.log(error); })
    }

    async updateUser (data) {
        let query = `UPDATE user SET name= '${data.name}', phone= '${data.phone}', address= '${data.address}', role= ${data.role}, status= ${data.status} WHERE email= '${data.email}'`;
        return await client.execute(query).catch(error => { console.log(error); })
    }

    async deleteUser (email) {
        let query = `DELETE FROM user WHERE email = '${email}'`;
        return await client.execute(query).catch(error => { console.log(error); })
    }



}
module.exports = new User();
