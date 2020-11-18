const knex = require('../database/connection')

class Comments{
    async index(req, res){
        const comments = await knex('comments')
            .select(
                'comments.id', 'comments.userId', 'users.email as emailUser', 
                'comments.articleId', 'articles.title as titleArticle', 'articles.imageUrl', 
                'comments.content', 'comments.createdAt')
            .join('users', 'comments.userId', '=', 'users.id')
            .join('articles', 'comments.articleId', '=', 'articles.id')
            .orderBy('id')
        
        comments.map((comment) => comment.createdAt = comment.createdAt.toLocaleString())

        res.json(comments)
    }
    create(req, res){
        const { userId, articleId, content } = req.body

        const like = {
            userId,
            articleId,
            content,
            createdAt: new Date().toLocaleString()
        }

        knex('comments')
            .insert(like)
            .then(result => res.json({ message: 'Comentário realizado com sucesso!' }))
            .catch(error => console.log(error.message))
    }
    delete(req, res){
        knex('comments')
            .where('id', req.params.id)
            .delete()
        .then(result => res.json({ message: 'Comentário excluído com sucesso!' }))
        .catch(error => console.log(error))
    }
}

module.exports = Comments