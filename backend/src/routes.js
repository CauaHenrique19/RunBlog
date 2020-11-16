const express = require('express')
const routes = express.Router()

const UsersController = require('./controllers/UsersController')
const CategoriesController = require('./controllers/CategoriesController')
const ArticlesController = require('./controllers/ArticlesController')
const LikesController = require('./controllers/LikesController')
const CommentsController = require('./controllers/CommentsController')

const users = new UsersController()
const categories = new CategoriesController()
const articles = new ArticlesController()
const likes = new LikesController()
const comments = new CommentsController()

routes.get('/users', (req, res) => {
    res.send('askodasjdaishdiashdaisdasd')
})

routes.post('/signup', users.create)
routes.post('/login', users.login)

routes.get('/categories', categories.index)
routes.post('/categories', categories.create)
routes.put('/categories/:id', categories.update)
routes.delete('/categories/:id', categories.delete)

routes.get('/articles', articles.index)
routes.post('/articles', articles.create)
routes.put('/articles/:id', articles.update)
routes.delete('/articles/:id', articles.delete)

routes.get('/likes', likes.index)
routes.post('/likes', likes.create)
routes.delete('/likes/:id', likes.delete)

routes.get('/comments', comments.index)
routes.post('/comments', comments.create)
routes.delete('/comments/:id', comments.delete)

module.exports = routes