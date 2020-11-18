import React, { useState, useEffect, useContext } from 'react'
import api from '../../services/api'

import { UserContext } from '../../context/user'

import Header from '../../components/Header/Header'
import SideBar from '../../components/Sidebar/Sidebar'
import ArticleContent from '../../components/ArticleContent'
import NewArticle from '../../components/newArticle'
import FormArticle from '../../components/FormArticle'

import './style.css'

const ViewArticles = () => {

    const { user, token } = useContext(UserContext)

    const [articles, setArticles] = useState([])
    const [content, setContent] = useState([])

    const [viewContent, setViewContent] = useState(false)
    const [viewForm, setViewForm] = useState(false)
    const [viewNewArticles, setViewNewArticles] = useState(true)

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'admin': user.admin,
            'user_id': user.id
        }
    }

    useEffect(() => {
        api.get('articles', headers)
            .then(res => setArticles(res.data))
            .catch(error => console.log(error))
    }, [])

    const [articleId, setArticleId] = useState()
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState()
    const [imageUrl, setImageUrl] = useState('')
    const [contentArticle, setContentArticle] = useState('')

    const objectFunctionsForm = {
        handleId: (e) => setArticleId(e.target.value),
        handleTitle: (e) => setTitle(e.target.value),
        handleCategoryId: (e) => setCategoryId(e.target.value),
        handleImageUrl: (e) => setImageUrl(e.target.value),
        handleContent: (e) => setContentArticle(e)
    }

    const article = {
        id: articleId,
        title,
        categoryid: parseInt(categoryId),
        imageUrl,
        content: contentArticle
    }

    function handleClickNewArticle() {
        setViewNewArticles(false)
        setViewForm(true)
    }

    function handleLike(id){
        console.log({
            userId: user.id,
            articleId: id
        })
    }

    function handleForm(e) {
        e.preventDefault();

        if (article.id) {
            api.put(`articles/${article.id}`, article, headers)
                .then(res => console.log(res.data))
                .catch(error => console.log(error))
        }
        else {
            api.post('articles', article, headers)
                .then(res => console.log(res.data))
                .catch(error => console.log(error))
        }
    }

    function handleDelete(id) {
        api.delete(`articles/${id}`, headers)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    return (
        <div className="articles">
            <Header />
            <div className="container">
                <SideBar>
                    {
                        articles.map(article => (
                            <li key={article.id}
                                onClick={() => {
                                    setViewContent(true)
                                    setContent(article)
                                    setViewForm(false)
                                    setViewNewArticles(false)
                                }}>
                                <img src={article.imageUrl} alt="" />
                                <p>{article.title}</p>
                            </li>
                        ))
                    }
                </SideBar>
                <div className="main">
                    {
                        viewContent &&
                        <ArticleContent
                            article={content}
                            handleBack={() => setViewContent(false)}
                            handleEdit={() => {
                                setViewForm(true)
                                setViewContent(false)
                                setViewNewArticles(false)
                                setArticleId(content.id)
                                setTitle(content.title)
                                setCategoryId(content.categoryId)
                                setImageUrl(content.imageUrl)
                                setContentArticle(content.content)
                            }}
                            handleDelete={() => handleDelete(content.id)}
                            handleLike={() => handleLike(content.id)}
                        />
                    }
                    { viewNewArticles && user.admin ? <NewArticle handleNewArticle={() => handleClickNewArticle()} /> : '' }
                    {
                        viewForm &&
                        <FormArticle
                            functionsForm={objectFunctionsForm}
                            article={article}
                            handleForm={(e) => handleForm(e)}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewArticles