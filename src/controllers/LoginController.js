const LoginService = require("../services/LoginService");

class LoginController {
    async find(req, res) {
        /* 
        #swagger.tags = ['Login']
        #swagger.summary = 'Realiza o login e retorna o token de acesso'
        #swagger.description = 'Utilize o token de acesso para autenticar na API'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Informa es do Usu rio',
            required: true,
            schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string',
                        description: 'Email do usu rio',
                        example: 'johndoe@example.com'
                    },
                    password: {
                        type: 'string',
                        description: 'Senha do usu rio',
                        example: 'someSecretPassword'
                    }
                }
            }
        }
        */

        const login = await LoginService.find(req, res);
        return res.status(200).json(login);
    }
}

module.exports = new LoginController();
