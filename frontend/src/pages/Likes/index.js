import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import api from '../../services/api'

import Header from '../../components/Header'
import SidebarAdmin from '../../components/SidebarAdmin'
import Stat from '../../components/Stat'

import imageUser from '../../assets/default-user-image.png'
import './style.css'

const Likes = () => {

    const { headers } = useContext(Context)
    const [stats, setStats] = useState({})
    const [likes, setLikes] = useState([]) 

    useEffect(() => {
        api.get('likes/stats', headers)
            .then(res => setStats(res.data))
            .catch(error => console.log(error))

        api.get('likes', headers)
            .then(res => setLikes(res.data))
            .catch(error => console.log(error))
    }, [headers])

    return (
        <div>
            <Header />
            <div className="container">
                <SidebarAdmin visualizeContent="likes" />
                <div className="main-likes">
                    <div className="main-header">
                        <h1>Estatísticas</h1>
                    </div>
                    <div className="stats">
                        <Stat className="total-likes">
                            <h2>Total de curtidas</h2>
                            <div className="content">
                                <ion-icon name="heart"></ion-icon>
                                <div className="info">
                                    <h1>{stats.totalLikes}</h1>
                                </div>
                            </div>
                        </Stat>
                        <Stat className="user-more-liked" >
                            <h2>Usuário que mais curtiu</h2>
                            <div className="content">
                                <ion-icon name="people"></ion-icon>
                                <div className="info">
                                    {
                                        stats.userMostLiked ? 
                                        <div>
                                            <h2>{stats.userMostLiked.name}</h2>
                                            <h2>{stats.userMostLiked.amountLikes} Curtidas</h2>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                        </Stat>
                        <Stat className="last-like">
                            <h2>Última curtida</h2>
                            <div className="content">
                                <ion-icon name="heart-circle"></ion-icon>
                                <div className="info">
                                    {
                                        stats.lastLike ? 
                                        <div>
                                            <h2>{stats.lastLike.name}</h2>
                                            <h2>{stats.lastLike.createdAt}</h2>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                        </Stat>
                        <Stat className="article-more-liked" >
                            <h2>Artigo mais curtido</h2>
                            <div className="content">
                                <ion-icon name="add-circle"></ion-icon>
                                <div className="info">
                                    {
                                        stats.articleMostLiked ? 
                                        <div>
                                            <h2>{stats.articleMostLiked.title}</h2>
                                            <h2>{stats.articleMostLiked.amountLikes} Curtidas</h2>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                        </Stat>
                    </div>
                    <div className="main-container-likes">
                        <div className="header-likes">
                            <h1>Curtidas</h1>
                            <button>
                                <ion-icon name="filter"></ion-icon>Filtrar
                            </button>
                        </div>
                        <div className="likes-wrapper">
                            <div className="likes-wrap">
                                {
                                    likes &&
                                    likes.map(like => (
                                        <div className="like">
                                            <img className="img-user" src={imageUser} alt="" />
                                            <div className="info">
                                                <div className="info-like">
                                                    <h2>{like.userName}</h2>
                                                    <h2>{like.createdAt}</h2>
                                                </div>
                                                <div className="info-article">
                                                    <h2>{like.titleArticle}</h2>
                                                    <img className="img-article" src={like.imageUrl} alt={like.titleArticle} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="chart-likes"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Likes