const { connect } = require("../config/mongoconnection");
class LoginService {
    async find(req, res) {
        const { db } = await connect();
        const { username, password } = req.body;
        const collection = db.collection("login");
        return collection.find().toArray();
    }
}
module.exports = new LoginService();
