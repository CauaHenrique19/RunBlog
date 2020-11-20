const express = require('express')
const routes = express.Router()

const auth = require('./middlewares/auth')
const admin = require('./middlewares/admin')

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

routes.post('/signup', users.create)
routes.post('/login', users.login)

routes.get('/categories', auth(categories.index))
routes.post('/categories', admin(auth(categories.create)))
routes.put('/categories/:id', admin(auth(categories.update)))
routes.delete('/categories/:id', admin(auth(categories.delete)))

routes.get('/articles',  auth(articles.index))
routes.post('/articles', admin(auth(articles.create)))
routes.put('/articles/:id', admin(auth(articles.update)))
routes.delete('/articles/:id', admin(auth(articles.delete)))

routes.get('/likes', auth(likes.index))
routes.get('/likes/:userId', auth(likes.show))
routes.post('/likes', auth(likes.create))
routes.delete('/likes/:id', auth(likes.delete))

routes.get('/comments', auth(comments.index))
routes.post('/comments', auth(comments.create))
routes.delete('/comments/:id', auth(comments.delete))

module.exports = routes