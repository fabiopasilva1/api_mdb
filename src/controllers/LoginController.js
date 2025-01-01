const LoginService = require("../services/LoginService");

class LoginController {
    async find(req, res) {
        const { username, password } = req.body;
        const login = await LoginService.find(req, res);
        return res.status(200).json(login);
    }
}

module.exports = new LoginController();
