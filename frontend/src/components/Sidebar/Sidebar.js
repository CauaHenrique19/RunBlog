import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/context'

import './Sidebar.css'

const SideBar = () => {

    const { article, articles, setViewContent, setViewForm, setViewNewArticles, setArticle } = useContext(Context)
    const [searchValue, setSearchValue] = useState('')
    const [renderArticles, setRenderArticles] = useState([])

    useEffect(() => {
        setRenderArticles(articles)
    }, [articles])

    function handleSearch(e){
        const searchedArticles = articles.filter(articleFind => articleFind.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchValue(e.target.value.toLowerCase())
        setRenderArticles(searchedArticles)
    }

    return (
        <div className="sidebar">
            <div className="search">
                <input type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Pesquisar" 
                    value={searchValue} 
                    onChange={handleSearch} 
                />
                <ion-icon name="search-outline"></ion-icon>
            </div>
            <h1>Artigos</h1>
            {
                searchValue && 
                <div className="search-value">
                    <p>{searchValue}</p>
                    <ion-icon 
                        title="Limpar Pesquisa"
                        name="close-outline" 
                        onClick={() => {
                            setSearchValue('') 
                            setRenderArticles(articles)
                        }}>
                    </ion-icon>
                </div>
            }
            <ul>
                {   
                    renderArticles.length > 0 ?
                    renderArticles.map(articleRender => (
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
                    )) :
                    <div className="warning">
                        <ion-icon name="warning-outline"></ion-icon>
                        <h2>Nenhum artigo encontrado!</h2>
                    </div>
                }
            </ul>
        </div>)
}

export default SideBar