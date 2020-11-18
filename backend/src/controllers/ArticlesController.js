const knex = require('../database/connection')

class Articles {
    async index(req, res) {
        const articles = await knex('articles')
            .select('articles.id', 'articles.title', 'articles.imageUrl',
                'articles.content', 'articles.createdAt', 'articles.categoryid as categoryId',
                'categories.name as categoryName')
            .join('categories', 'categories.id', '=', 'articles.categoryid')
            .orderBy('id')

        const comments = await knex('comments')
            .select('comments.id', 'comments.articleId', 'users.email as emailUser',
                'comments.content', 'comments.createdAt')
            .join('users', 'comments.userId', '=', 'users.id')

        const likesAmount = await knex('likes')
            .select('articleId')

        const commentsAmount = await knex('comments')
            .select('articleId')
        
        function includeCorresponding(corresponding){
            let result = corresponding.map(corres => {
                corres.createdAt = corres.createdAt.toLocaleString()
                delete corres.articleId

                return corres
            })
            return result
        }

        articles.map((article) => {
            const correspondingComments = comments.filter(comment => comment.articleId === article.id)
            article.correspondingComments = includeCorresponding(correspondingComments)

            article.createdAt = article.createdAt.toLocaleString()

            const likedCorresponding = likesAmount.filter(like => article.id === like.articleId)
            article.amountLikes = likedCorresponding.length

            const commentCorresponding = commentsAmount.filter(comment => article.id === comment.articleId)
            article.amountComments = commentCorresponding.length
        })

        res.json(articles)
    }
    create(req, res) {
        const { title, categoryid, imageUrl, content } = req.body

        if (!title) return res.status(400).json({ message: 'Título não informado, Informe-o por favor!' })
        if (!categoryid) return res.status(400).json({ message: 'Categoria não informada, Informe-a por favor!' })
        if(!imageUrl) return res.status(400).json({ message: 'Imagem não informada, Informe-a por favor!' })
        if (!content) return res.status(400).json({ message: 'Conteúdo não informado, Informe-o por favor!' })

        const article = {
            title,
            categoryid,
            imageUrl,
            content,
            createdAt: new Date().toLocaleString()
        }

        knex('articles')
            .insert(article)
            .then(() => res.json({ message: 'Artigo postado com sucesso!' }))
            .catch(error => console.log(error))
    }
    update(req, res) {
        const { title, categoryid, imageUrl, content } = req.body

        const article = {
            title,
            categoryid,
            imageUrl,
            content,
        }

        knex('articles')
            .update(article)
            .where('id', req.params.id)
            .then(result => res.json({ message: 'Artigo atualizado com sucesso!' }))
            .catch(error => console.log(error))
    }
    delete(req, res) {
        knex('articles')
            .where('id', req.params.id)
            .delete()
            .then(result => res.json({ message: 'Artigo excluído com sucesso!' }))
            .catch(error => console.log(error))
    }
}

module.exports = Articles