import React, { useContext } from 'react'
import { UserContext } from '../../context/user'

import './style.css'

const ArticleContent = ({ article, handleBack, handleEdit, handleDelete, handleLike }) => {
    const { user } = useContext(UserContext)

    return (
        <div className="article">
            <div className="header-article">
                <div className="title-container">
                    <ion-icon onClick={handleBack} name="arrow-back-outline"></ion-icon>
                    <div className="title">
                        <h1 className="article-title">{article.title}</h1>
                        <div className="category">
                            <h3>{article.categoryName}</h3>
                        </div>
                    </div>
                </div>
                <div className="interactions-container">
                    <div className="comments">
                        <button className="btn-comments">
                            <ion-icon name="chatbox-outline"></ion-icon>
                        </button>
                        <p>{article.amountComments}</p>
                    </div>
                    <div className="likes">
                        <button className="btn-likes" onClick={handleLike} >
                            <ion-icon name="heart-outline"></ion-icon>
                        </button>
                        <p>{article.amountLikes}</p>
                    </div>
                    {
                        user.admin && 
                        <div className="buttons-container">
                            <button onClick={handleEdit} >
                                <ion-icon name="create-outline"></ion-icon>
                                Editar
                            </button>
                            <button onClick={handleDelete}>
                                <ion-icon name="trash-outline"></ion-icon>
                                Excluir
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className="content-article" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>
    )
}

export default ArticleContent