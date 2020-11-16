const knex = require('../database/connection')

module.exports = middleware => {
    return async (req, res, next) => {
        if(req.headers.admin){

            const isAdmin = await knex('users')
                .select('admin')
                .where('id', req.headers.user_id)

            if(isAdmin[0].admin){
                middleware(req, res, next)
            }
            else{
                res.status(401).send({ message : 'Usuário não é administrador!' })
            }
        }
        else{
            res.status(401).send({ message : 'Usuário não tem essa permissão!' })
        }
    }
}