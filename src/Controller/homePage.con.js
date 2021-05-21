const message = require("../messages/message.class");

const homePageCon = async (req, res) => {
    res.status(200).send(message.welcome);
}


module.exports = { homePageCon }