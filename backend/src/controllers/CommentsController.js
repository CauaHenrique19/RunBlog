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
    create(req, res){
        const { userId, articleId, content } = req.body

        const coment = {
            userId,
            articleId,
            content,
            createdAt: new Date().toLocaleString()
        }

        knex('comments')
            .insert(coment, '*')
            .then(returnedComent => {
                returnedComent[0].createdAt = formatDataAndHour(returnedComent[0].createdAt)
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