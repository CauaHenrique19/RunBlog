import React from 'react'

import Header from '../../components/Header'
import SidebarAdmin from '../../components/SidebarAdmin'
import Stat from '../../components/Stat'

import imageUser from '../../assets/default-user-image.png'
import articleImage from '../../assets/pexels-c-cagnin-1959065.jpg'
import './style.css'

const Likes = () => {
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
                                    <h1>150</h1>
                                </div>
                            </div>
                        </Stat>
                        <Stat className="user-more-liked" >
                            <h2>Usuário que mais curtiu</h2>
                            <div className="content">
                                <ion-icon name="people"></ion-icon>
                                <div className="info">
                                    <h2>Claudinei</h2>
                                    <h2>16 Curtidas</h2>
                                </div>
                            </div>
                        </Stat>
                        <Stat className="last-like">
                            <h2>Última curtida</h2>
                            <div className="content">
                                <ion-icon name="heart-circle"></ion-icon>
                                <div className="info">
                                    <h2>Claudinei</h2>
                                    <h2>02/12/2020 às 11:56</h2>
                                </div>
                            </div>
                        </Stat>
                        <Stat className="article-more-liked" >
                            <h2>Artigo mais curtido</h2>
                            <div className="content">
                                <ion-icon name="add-circle"></ion-icon>
                                <div className="info">
                                    <h2>Maratona 21KM</h2>
                                    <h2>132 Curtidas</h2>
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
                                <div className="like">
                                    <img className="img-user" src={imageUser} alt="" />
                                    <div className="info">
                                        <div className="info-like">
                                            <h2>Claudinei</h2>
                                            <h2>02/12/2020 às 11:56</h2>
                                        </div>
                                        <div className="info-article">
                                            <h2>Maratona 21km</h2>
                                            <img className="img-article" src={articleImage} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="like">
                                    <img className="img-user" src={imageUser} alt="" />
                                    <div className="info">
                                        <div className="info-like">
                                            <h2>Claudinei</h2>
                                            <h2>02/12/2020 às 11:56</h2>
                                        </div>
                                        <div className="info-article">
                                            <h2>Maratona 21km</h2>
                                            <img className="img-article" src={articleImage} alt="" />
                                        </div>
                                    </div>
                                </div>
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