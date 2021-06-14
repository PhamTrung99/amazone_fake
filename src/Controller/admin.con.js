const User = require('../Model/Cassandra/user.cassandra');
const moment = require('moment');

class adminCon {
    index (req, res) {
        res.render('admin/index', {
            layout: false
        })
    }

    async manageUser (req, res) {
        const allUser = await User.getAllUser();
        res.render('admin/manageUser', {
            layout: false,
            allUser: allUser.rows
        })
    }

    async updateUser (req, res) {
       await User.updateUser(req.body);
        res.status(200).json({});
    }

    async deleteUser (req, res) {
        await User.deleteUser(req.params.email);
        res.status(200).json({});
    }
}

module.exports = new adminCon ();