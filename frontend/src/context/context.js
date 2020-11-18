import React, { useState, createContext, useEffect } from 'react'
import api from '../services/api'

export const Context = createContext()

const ContextProvider = ({ children }) => {

    //localStorage.setItem('runblog_user', {})

    const userStorage = JSON.parse(localStorage.getItem('runblog_user')) ? JSON.parse(localStorage.getItem('runblog_user')) : ''

    const [user, setUser] = useState(userStorage)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [myLikes, setMyLikes] = useState([])

    const [message, setMessage] = useState('')
    const [article, setArticle] = useState()

    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])

    const [articleId, setArticleId] = useState()
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState()
    const [imageUrl, setImageUrl] = useState('')
    const [contentArticle, setContentArticle] = useState('')

    const [coment, setComent] = useState('')

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'admin': user.admin,
            'user_id': user.id
        }
    }

    const [headers, setHeaders] = useState(config)

    const [viewContent, setViewContent] = useState(false)
    const [viewForm, setViewForm] = useState(false)
    const [viewNewArticles, setViewNewArticles] = useState(true)
    const [viewComents, setViewComents] = useState(true)

    useEffect(() => {
        api.get('articles', headers)
            .then(res => setArticles(res.data))
            .catch(error => console.log(error))

        api.get('categories', headers)
            .then((res) => setCategories(res.data))
            .catch(error => console.log(error))

        api.get(`likes/${user.id}`, headers)
            .then(res => setMyLikes(res.data))
            .catch(error => console.log(error))
    }, [])

    return(
        <Context.Provider value={{ 
            user, setUser, 
            token, setToken, 
            article, setArticle, 
            articleId, setArticleId, 
            title, setTitle, 
            categoryId, setCategoryId,
            imageUrl, setImageUrl, 
            contentArticle, setContentArticle,
            headers, setHeaders,
            viewContent, setViewContent,
            viewForm, setViewForm,
            viewNewArticles, setViewNewArticles,
            articles, setArticles,
            categories, setCategories,
            coment, setComent,
            viewComents, setViewComents,
            myLikes, setMyLikes,
            message, setMessage
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider