const knex = require('../database/connection')
const bcrypt = require('bcrypt')
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

class Users {
    create(req, res){
        const { email, password, confirmPassword, admin } = req.body

        if(!email) return res.status(400).json({ message: 'E-mail não informado, Informe-o por favor!' })
        if(!password) return res.status(400).json({ message: 'Senha não informada, Informe-a por favor!' })
        if(!confirmPassword) return res.status(400).json({ message: 'Confirmação de senha não informada, Informe-a por favor!' })
        if(password !== confirmPassword) return res.status(400).json({ message: 'Senhas não conferem.' })
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        knex('users')
            .insert({ email, password: hash, admin })
            .then(() => res.json({ message: 'Usuário cadastrado com sucesso!' }))
            .catch(error => console.log(error))
    }
    async login(req, res){
        const { email, password } = req.body

        if(!email) res.json({ message: 'Email não informado, informe-o por favor!' })
        if(!password) res.json({ message: 'Senha não informada, informe-a por favor!' })

        const user = await knex('users')
            .select('id', 'email', 'password', 'admin')
            .where('email', email)
            .first()

        if(!user){
            res.status(401).json({ message: 'Usuário não encontrado.' })
        }
        else{
            if(bcrypt.compareSync(password, user.password)){
                delete user.password

                const token = jwt.sign({ id: user.id }, process.env.SECRET)
                res.json({ auth: true, token, user })
            }
            else{
                res.json({ message: 'Senhas não conferem.' })
            }
        }
    }
}

module.exports = Users