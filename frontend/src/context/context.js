import React, { useState, createContext, useEffect } from 'react'
import api from '../services/api'

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const userStorage = JSON.parse(localStorage.getItem('runblog_user')) ? JSON.parse(localStorage.getItem('runblog_user')) : ''
    const tokenStorage = localStorage.getItem('token') ? localStorage.getItem('token') : ''

    const [user, setUser] = useState(userStorage)
    const [token, setToken] = useState(tokenStorage)

    const [myLikes, setMyLikes] = useState([])

    const [message, setMessage] = useState('')
    const [article, setArticle] = useState()

    const [headers, setHeaders] = useState({
        headers: {
            token: token,
            admin: user.admin,
            user_id: user.id
        }
    })

    useEffect(() => {
        setHeaders({
            headers: {
                token: token,
                admin: user.admin,
                user_id: user.id
            }
        })
    }, [token, user])

    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get('categories', headers)
            .then((res) => setCategories(res.data))
            .catch(error => console.log(error))
    }, [headers])

    useEffect(() => {
        api.get('articles', headers)
            .then(res => setArticles(res.data))
            .catch(error => console.log(error))
    }, [headers])

    const [articleId, setArticleId] = useState()
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState()
    const [imageUrl, setImageUrl] = useState('')
    const [contentArticle, setContentArticle] = useState('')

    const [coment, setComent] = useState('')

    const [viewContent, setViewContent] = useState(false)
    const [viewForm, setViewForm] = useState(false)
    const [viewNewArticles, setViewNewArticles] = useState(true)
    const [viewComents, setViewComents] = useState(true)

    return (
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
            message, setMessage,
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider