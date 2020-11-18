import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './Sidebar.css'

const SideBar = () => {

    const { articles, setViewContent, setViewForm, setViewNewArticles, setArticle } = useContext(Context)

    return (
        <div className="sidebar">
            <div className="search">
                <input type="text" name="search" id="search" placeholder="Pesquisar" />
                <ion-icon name="search-outline"></ion-icon>
            </div>
            <h1>Artigos</h1>
            <ul>
                {
                    articles.map(article => (
                        <li key={article.id}
                            onClick={() => {
                                setViewContent(true)
                                setViewForm(false)
                                setViewNewArticles(false)
                                setArticle(article)
                            }}>
                            <img src={article.imageUrl} alt="" />
                            <p>{article.title}</p>
                        </li>
                    ))
                }
            </ul>
        </div>)
}

export default SideBar