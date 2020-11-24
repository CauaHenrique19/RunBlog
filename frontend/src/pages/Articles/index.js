import React, { useContext } from 'react'

import { Context } from '../../context/context'

import Header from '../../components/Header'
import SideBar from '../../components/Sidebar/Sidebar'
import ArticleContent from '../../components/ArticleContent'
import NewArticle from '../../components/NewArticle'
import FormArticle from '../../components/FormArticle'

import './style.css'

const ViewArticles = () => {

    const { user } = useContext(Context)
    const { viewForm, viewNewArticles, viewContent } = useContext(Context)

    return (
        <div className="articles">
            <Header />
            <div className="container">
                <SideBar />
                <div className="main">
                    {viewContent && <ArticleContent />}
                    {viewNewArticles && user.admin ? <NewArticle /> : ''}
                    {viewForm && <FormArticle />}
                </div>
            </div>
        </div>
    )
}

export default ViewArticles