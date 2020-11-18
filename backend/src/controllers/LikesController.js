const knex = require('../database/connection')

class Likes {
    async index(req, res) {
        const likes = await knex('likes')
            .select(
                'likes.id', 'likes.userId', 'users.email as emailUser',
                'users.name as userName', 'likes.articleId', 'articles.title as titleArticle',
                'articles.imageUrl', 'likes.createdAt')
            .join('users', 'likes.userId', '=', 'users.id')
            .join('articles', 'likes.articleId', '=', 'articles.id')
            .orderBy('id')

        likes.map(likes => {
            const createdAt = likes.createdAt.toLocaleString()
            const data = createdAt.substring(0, createdAt.indexOf(" ")).split('-').reverse().join(',').replace(',', '/').replace(',', '/')
            const hour = createdAt.substring(10, createdAt.length - 3).replace(" ", "")

            likes.createdAt = `${data} às ${hour}`
        })

        res.json(likes)
    }
    async show(req, res) {
        const likes = await knex('likes')
            .select(
                'likes.id', 'likes.userId', 'users.email as emailUser',
                'users.name as userName', 'likes.articleId', 'articles.title as titleArticle',
                'articles.imageUrl', 'likes.createdAt')
            .join('users', 'likes.userId', '=', 'users.id')
            .join('articles', 'likes.articleId', '=', 'articles.id')
            .where('likes.userId', req.params.userId)
            .orderBy('id')

        likes.map(likes => {
            const createdAt = likes.createdAt.toLocaleString()
            const data = createdAt.substring(0, createdAt.indexOf(" ")).split('-').reverse().join(',').replace(',', '/').replace(',', '/')
            const hour = createdAt.substring(10, createdAt.length - 3).replace(" ", "")

            likes.createdAt = `${data} às ${hour}`
        })

        res.json(likes)

    }
    create(req, res) {
        const { userId, articleId } = req.body

        const like = {
            userId,
            articleId,
            createdAt: new Date().toLocaleString()
        }

        knex('likes')
            .insert(like)
            .then(result => res.json({ message: 'Post curtido com sucesso!' }))
            .catch(error => console.log(error.message))
    }
    delete(req, res) {
        knex('likes')
            .where('id', req.params.id)
            .delete()
            .then(result => res.json({ message: 'Descurtido com sucesso!' }))
            .catch(error => console.log(error))
    }
}

module.exports = Likes