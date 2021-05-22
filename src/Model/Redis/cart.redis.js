const redis = require('redis');
const { promisifyAll } = require('bluebird');
const message = require('../../messages/message.class');

promisifyAll(redis);
const client = redis.createClient(6379);

client.on('connect', function () {
    console.log(message.redis_Connect_Sucesss);
});

client.on("error", (error) => {
    console.log(message.redis_Connect_Fail);
    console.error(error);
})


//Bắt đầu Query
const addCart = async (id, value) => {
    await client.setAsync(id, value).then(() => {
        console.log("Add cart Success");
    }).catch((error) => console.log(error));
}

const getCart = async (key) => {
    addCart("new", "cartnew");
    return await client.getAsync(key).catch((error) => console.log(error));
}

module.exports = { getCart, addCart };