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
    async stats(req, res){

        const totalLikes = await knex('likes')
            .count('id as total')

        const userMostLiked = await knex('likes')
            .count('userId as amountLikes')
            .select('userId', 'users.name')
            .join('users', 'userId', 'users.id')
            .groupBy('userId', 'users.name', 'users.email')
            .limit(1)

        delete userMostLiked[0].userId

        const lastLike = await knex('likes')
            .select('likes.id', 'likes.createdAt', 'users.name')
            .join('users', 'users.id', 'likes.userId')
            .orderBy('id', 'desc')
            .limit(1)

        lastLike[0].createdAt = formatDataAndHour(lastLike[0].createdAt)
        delete lastLike[0].id

        const articleMostLiked = await knex('likes')
            .count('articleId as amountLikes')
            .select('articles.title', 'articleId')
            .join('articles', 'articles.id', 'articleId')
            .groupBy('articleId', 'articles.title')
            .orderBy('amountLikes', 'desc')
            .limit(1)

        delete articleMostLiked[0].articleId

        const likesPerDay = await knex.raw(`
            select
                date_trunc('day', "createdAt") as "day",
                count(1) as amount
            from likes
            group by 1
            order by "day"
        `)

        likesPerDay.rows.map(row => row.day = `${row.day.getDate()}/${row.day.getMonth()}/${row.day.getFullYear()}`)

        const stat = {
            totalLikes: totalLikes[0].total,
            userMostLiked: userMostLiked[0],
            lastLike: lastLike[0],
            articleMostLiked: articleMostLiked[0],
            likesPerDay: likesPerDay.rows
        }

        res.json(stat)
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