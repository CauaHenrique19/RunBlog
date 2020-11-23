import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './Sidebar.css'

const SideBar = () => {

    const { article, articles, setViewContent, setViewForm, setViewNewArticles, setArticle } = useContext(Context)

    return (
        <div className="sidebar">
            <div className="search">
                <input type="text" name="search" id="search" placeholder="Pesquisar" />
                <ion-icon name="search-outline"></ion-icon>
            </div>
            <h1>Artigos</h1>
            <ul>
                {   
                    articles.length > 0 &&
                    articles.map(articleRender => (
                        <li className={ article && article.id === articleRender.id ? 'selected' : '' } key={articleRender.id}
                            onClick={() => {
                                setViewContent(true)
                                setViewForm(false)
                                setViewNewArticles(false)
                                setArticle(articleRender)
                            }}>
                            <img src={articleRender.imageUrl} alt={articleRender.title} />
                            <p>{articleRender.title}</p>
                        </li>
                    ))
                }
            </ul>
        </div>)
}

export default SideBar