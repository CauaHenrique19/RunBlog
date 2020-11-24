import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/context'

import api from '../../services/api'

import userImage from '../../assets/default-user-image.png'
import './style.css'

const ArticleContent = () => {

    const [viewFormComent, setViewFormComent] = useState(false)
    const [liked, setLiked] = useState()
    const [index, setIndex] = useState()

    const { articles, setArticles, article } = useContext(Context)
    const { setArticleId, setTitle, setCategoryId, setImageUrl, setContentArticle } = useContext(Context)
    const { user, headers } = useContext(Context)
    const { setViewContent, setViewForm, setViewNewArticles, setViewComents, viewComents } = useContext(Context)
    const { coment, setComent } = useContext(Context)

    function handleEdit() {
        setViewForm(true)
        setViewContent(false)
        setViewNewArticles(false)
        setArticleId(article.id)
        setTitle(article.title)
        setCategoryId(article.categoryId)
        setImageUrl(article.imageUrl)
        setContentArticle(article.content)
    }

    useEffect(() => {
        setLiked(!!article.correspondingLikes.find(like => like.userId === user.id))
        setIndex(articles.indexOf(articles.find(articleFind => articleFind.id === article.id)))
    }, [article, user, articles])

    function handleDelete() {
        api.delete(`articles/${article.id}`, headers)
            .then(res => {
                articles.splice(index, 1)
                setArticles(articles)
                setViewForm(false)
                setViewContent(false)
                setViewNewArticles(true)
            })
            .catch(error => console.log(error))
    }

    function handleComent() {
        const comentary = {
            userId: user.id,
            articleId: article.id,
            content: coment
        }
        
        api.post('comments', comentary, headers)
            .then(res => {
                article.correspondingComments.push(res.data.coment)
                article.amountComments += 1
                articles.splice(index, 1, article)
                setArticles(articles)
                setViewContent(false)
                setViewContent(true)
            })
            .catch(error => console.log(error))
    }

    function handleDeleteComent(comentId){
        api.delete(`comments/${comentId}`, headers)
            .then(res => {
                const comentIndex = article.correspondingComments.indexOf(article.correspondingComments.find(comentFind => comentFind.id === comentId))
                article.correspondingComments.splice(comentIndex, 1)
                article.amountComments -= 1
                articles.splice(index, 1, article)
                setArticles(articles)
                setViewContent(false)
                setViewContent(true)
            })
            .catch(error => console.log(error))
    }

    function handleLike() {
        const like = {
            userId: user.id,
            articleId: article.id
        }
        const isLiked = article.correspondingLikes.find(like => like.userId === user.id)
        if(liked){
            api.delete(`likes/${isLiked.id}`, headers)
                .then(res => {
                    setLiked(false)
                    const indexLike = article.correspondingLikes.indexOf(isLiked)
                    article.correspondingLikes.splice(indexLike, 1)
                    article.amountLikes -= 1
                    articles.splice(index, 1, article)
                    setArticles(articles)
                    setViewContent(false)
                    setViewContent(true)
                })
                .catch(error => console.log(error))
        }
        else{
            api.post('likes', like, headers)
                .then(res => {
                    setLiked(true)
                    article.correspondingLikes.push(res.data.like)
                    article.amountLikes += 1
                    articles.splice(index, 1, article)
                    setArticles(articles)
                    setViewContent(false)
                    setViewContent(true)
                })
                .catch(error => console.log(error))
        }
    }

    function handleBack() {
        setViewContent(false)
        setViewNewArticles(true)
    }

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
                        <button className="btn-comments" onClick={() => setViewFormComent(!viewFormComent)}>
                            <ion-icon name="chatbox-outline"></ion-icon>
                        </button>
                        <p>{article.amountComments}</p>
                    </div>
                    <div className={liked ? 'likes liked' : 'likes'}>
                        <button className="btn-likes" onClick={handleLike}>
                            { liked ? <ion-icon name="heart-sharp"></ion-icon> : <ion-icon name="heart-outline"></ion-icon> } 
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
            {
                viewFormComent &&
                <div className="comment-form">
                    <h1>Comentar</h1>
                    <textarea name="coment" id="coment" placeholder="Comentário" value={coment} onChange={(e) => setComent(e.target.value)}></textarea>
                    <button onClick={handleComent}>Comentar</button>
                </div>
            }
            <div className="coments-container">
                <div className="coments-header">
                    <h1>Comentários</h1>
                    <ion-icon name={viewComents ? "eye-outline" : "eye-off-outline"} onClick={() => setViewComents(!viewComents)}></ion-icon>
                </div>
                {
                    viewComents &&
                    article.correspondingComments.map(coment => (
                        <div key={coment.id} className={ coment.userId === user.id ? 'coment my' : 'coment' }>
                            <div className="coment">
                                <div className="header-coment">
                                    <div className="left">
                                        <img src={userImage} alt={coment.userName} className="img-user" />
                                        <div className="info-coment">
                                            <h1>{coment.userName}</h1>
                                            <p>{coment.createdAt}</p>
                                        </div>
                                    </div>
                                    {
                                        coment.userId === user.id &&
                                        <div className="right" onClick={() => handleDeleteComent(coment.id)}>
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </div>
                                    }
                                </div>
                                <div className="content-coment">
                                    <p>{coment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ArticleContent