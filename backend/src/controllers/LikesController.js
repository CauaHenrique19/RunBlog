const knex = require('../database/connection')
const formatDataAndHour = require('../utils/FormatDataAndHour')

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

        likes.map(likes => likes.createdAt = formatDataAndHour(likes.createdAt))

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

        likes.map(likes => likes.createdAt = formatDataAndHour(likes.createdAt))

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
            .insert(like, '*')
            .then(result => {
                result[0].createdAt = formatDataAndHour(result[0].createdAt)
                delete result[0].articleId
                res.json({ message: 'Post curtido com sucesso!', like: result[0] })
            })
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