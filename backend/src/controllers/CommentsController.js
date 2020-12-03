const knex = require('../database/connection')
const formatDataAndHour = require('../utils/FormatDataAndHour')

class Comments{
    async index(req, res){
        const comments = await knex('comments')
            .select(
                'comments.id', 'comments.userId', 'users.email as userEmail', 'users.name as userName', 
                'comments.articleId', 'articles.title as titleArticle', 'articles.imageUrl', 
                'comments.content', 'comments.createdAt')
            .join('users', 'comments.userId', '=', 'users.id')
            .join('articles', 'comments.articleId', '=', 'articles.id')
            .orderBy('id')
        
        comments.map((comment) => comment.createdAt = formatDataAndHour(comment.createdAt))

        res.json(comments)
    }
    async stats(req, res){

        const totalComents = await knex('comments')
            .count('id as total')

        const userMostComented = await knex('comments')
            .count('userId as amountComments')
            .select('userId', 'users.name')
            .join('users', 'userId', 'users.id')
            .groupBy('userId', 'users.name', 'users.email')
            .limit(1)

        delete userMostComented[0].userId

        const lastComment = await knex('comments')
            .select('comments.id', 'comments.createdAt', 'comments.content', 'users.name')
            .join('users', 'users.id', 'comments.userId')
            .orderBy('id', 'desc')
            .limit(1)

        lastComment[0].createdAt = formatDataAndHour(lastComment[0].createdAt)
        delete lastComment[0].id

        const articleMostComented = await knex('comments')
            .count('articleId as amountComments')
            .select('articles.title', 'articleId')
            .join('articles', 'articles.id', 'articleId')
            .groupBy('articleId', 'articles.title')
            .orderBy('amountComments', 'desc')
            .limit(1)

        delete articleMostComented[0].articleId

        const commentsPerDay = await knex.raw(`
            select
                date_trunc('day', "createdAt") as "day",
                count(1) as amount
            from comments
            group by 1
            order by "day"
        `)

        commentsPerDay.rows.map(row => row.day = `${row.day.getDate()}/${row.day.getMonth()}/${row.day.getFullYear()}`)

        const stat = {
            totalComents: totalComents[0].total,
            userMostComented: userMostComented[0],
            lastComment: lastComment[0],
            articleMostComented: articleMostComented[0],
            commentsPerDay: commentsPerDay.rows
        }

        res.json(stat)
    }
    async create(req, res){
        const { userId, articleId, content } = req.body

        const coment = {
            userId,
            articleId,
            content,
            createdAt: new Date().toLocaleString()
        }

        const userName = await knex('users')
            .select('name')
            .where('id', userId)
            .first()

        knex('comments')
            .insert(coment, '*')
            .then(returnedComent => {
                returnedComent[0].createdAt = formatDataAndHour(returnedComent[0].createdAt)
                returnedComent[0].userName = userName.name
                delete returnedComent[0].articleId
                res.json({ message: 'Comentário realizado com sucesso!', coment: returnedComent[0] })
            })
            .catch(error => console.log(error.message))
    }
    delete(req, res){
        knex('comments')
            .where('id', req.params.id)
            .delete()
        .then(() => res.json({ message: 'Comentário excluído com sucesso!' }))
        .catch(error => console.log(error))
    }
}

module.exports = Comments