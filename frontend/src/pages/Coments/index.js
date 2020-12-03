import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context/context'
import api from '../../services/api'

import Header from '../../components/Header'
import SidebarAdmin from '../../components/SidebarAdmin'
import Stat from '../../components/Stat'

import imageUser from '../../assets/default-user-image.png'
import './style.css'

const Coments = () => {

    const { headers } = useContext(Context)
    const [stats, setStats] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
        api.get('comments/stats', headers)
            .then(res => setStats(res.data))
            .catch(error => console.log(error))

        api.get('comments', headers)
            .then(res => setComments(res.data))
            .catch(error => console.log(error))
    }, [headers])

    return (
        <div>
            <Header />
            <div className="container">
                <SidebarAdmin visualizeContent="coments" />
                <div className="main-coments">
                    <div className="main-header">
                        <h1>Estatísticas</h1>
                    </div>
                    <div className="stats">
                        <Stat className="total-coments">
                            <h2>Total de comentários</h2>
                            <div className="content">
                                <ion-icon name="chatbox"></ion-icon>
                                <div className="info">
                                    {
                                        stats.totalComents &&
                                        <h1>{stats.totalComents}</h1>
                                    }
                                </div>
                            </div>
                        </Stat>
                        <Stat className="user-more-comented" >
                            <h2>Usuário que mais comentou</h2>
                            <div className="content">
                                <ion-icon name="people"></ion-icon>
                                <div className="info">
                                    {
                                        stats.userMostComented && 
                                        <div>
                                            <h2>{stats.userMostComented.name}</h2>
                                            <h2>{stats.userMostComented.amountComments} Comentários</h2>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Stat>
                        <Stat className="last-like">
                            <h2>Último comentário</h2>
                            <div className="content">
                                <ion-icon name="chatbubbles"></ion-icon>
                                <div className="info">
                                    {
                                        stats.lastComment && 
                                        <div>
                                            <h2>{stats.lastComment.name}</h2>
                                            <h2>{stats.lastComment.createdAt}</h2>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Stat>
                        <Stat className="article-more-comented" >
                            <h2>Artigo mais comentado</h2>
                            <div className="content">
                                <ion-icon name="add-circle"></ion-icon>
                                <div className="info">
                                    {
                                        stats.articleMostComented && 
                                        <div>
                                            <h2>{stats.articleMostComented.title}</h2>
                                            <h2>{stats.articleMostComented.amountLikes} Comentários</h2>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Stat>
                    </div>
                    <div className="main-container-coments">
                        <div className="header-coments">
                            <h1>Comentários</h1>
                            <button>
                                <ion-icon name="filter"></ion-icon>Filtrar
                            </button>
                        </div>
                        <div className="coments-wrapper">
                            <div className="coments-wrap">
                                <div className="coments">
                                    {
                                        comments &&
                                        comments.map(coment => (
                                            <div class="coment">
                                                <div class="info">
                                                    <div class="info-like">
                                                        <img class="img-user" src={imageUser} alt="" />
                                                        <div>
                                                            <h2>{coment.userName}</h2>
                                                            <h2>{coment.createdAt}</h2>
                                                        </div>
                                                    </div>
                                                    <div class="info-article">
                                                        <h2>{coment.titleArticle}</h2>
                                                        <img class="img-article" src={coment.imageUrl} alt="" />
                                                    </div>
                                                </div>
                                                <div class="content">{coment.content}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="chart-coments"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coments