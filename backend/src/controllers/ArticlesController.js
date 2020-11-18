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
                'users.id as userId', 'users.name as userName','comments.content', 
                'comments.createdAt')
            .join('users', 'comments.userId', '=', 'users.id')

        const likes = await knex('likes')
            .select('id', 'userId', 'articleId', 'createdAt')

        function includeCorresponding(corresponding){
            return corresponding.map(corres => {

                const createdAt = corres.createdAt.toLocaleString()
                const data = createdAt.substring(0, createdAt.indexOf(" ")).split('-').reverse().join(',').replace(',', '/').replace(',', '/')
                const hour = createdAt.substring(10, createdAt.length - 3).replace(" ", "")
                
                corres.createdAt = `${data} às ${hour}`
                delete corres.articleId

                return corres
            })
        }

        articles.map((article) => {
            const correspondingComments = comments.filter(comment => comment.articleId === article.id)
            const correspondingLikes = likes.filter(like => like.articleId == article.id)

            article.correspondingComments = includeCorresponding(correspondingComments)
            article.amountComments = correspondingComments.length

            article.correspondingLikes = includeCorresponding(correspondingLikes)
            article.amountLikes = correspondingLikes.length

            article.createdAt = article.createdAt.toLocaleString()
        })

        res.json(articles)
    }
    create(req, res) {
        const { title, categoryid, imageUrl, content } = req.body

        if (!title) return res.json({ message: 'Título não informado, Informe-o por favor!' })
        if (!categoryid) return res.json({ message: 'Categoria não informada, Informe-a por favor!' })
        if(!imageUrl) return res.json({ message: 'Imagem não informada, Informe-a por favor!' })
        if (!content) return res.json({ message: 'Conteúdo não informado, Informe-o por favor!' })

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
            .then(() => res.json({ message: 'Artigo atualizado com sucesso!' }))
            .catch(error => console.log(error))
    }
    delete(req, res) {
        knex('articles')
            .where('id', req.params.id)
            .delete()
            .then(() => res.json({ message: 'Artigo excluído com sucesso!' }))
            .catch(error => console.log(error))
    }
}

module.exports = Articles