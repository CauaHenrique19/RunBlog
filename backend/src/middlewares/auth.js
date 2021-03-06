const jwt = require('jsonwebtoken')
require("dotenv-safe").config();

module.exports = middleware => {
    return (req, res, next) => {
        if(req.headers.token){
            jwt.verify(req.headers.token, process.env.SECRET, (error, encoded) => {
                if(error){
                    return res.send({ message: 'Token inválido!' })
                }
                else{
                    middleware(req, res, next)
                }
            })
        }
        else{
            res.send({ message : 'Usuário não está autenticado!' })
        }
    }
}