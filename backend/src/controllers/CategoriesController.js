const knex = require('../database/connection')

class Categories{
    async index(req, res){
        const categories = await knex('categories')
            .select('*')
            .orderBy('id')
        
        res.json(categories)
    }

    create(req, res){
        const { name } = req.body

        if(!name) return res.json({ message: 'Informe o nome da categoria!' })

        knex('categories')
            .insert({ name })
            .then(() => res.json({ message: 'Categoria cadastrada com sucesso!' }))
            .catch(error => console.log(error))
    }
    update(req, res){
        const { name } = req.body

        knex('categories')
            .update(name)
            .where('id', req.params.id)
            .then(() => res.json({ message: 'Categoria Atualizada com sucesso!' }))
            .catch(error => console.log(error))
    }

    delete(req, res){
        knex('categories')
            .where('id', req.params.id)
            .delete()
            .then(() => res.json({ message: 'Categoria excluída com sucesso!' }))
            .catch(error => console.log(error))
    }
}

module.exports = Categories