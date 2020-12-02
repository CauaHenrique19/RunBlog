import React from 'react'

import Header from '../../components/Header'
import SidebarAdmin from '../../components/SidebarAdmin'
import Stat from '../../components/Stat'

import imageUser from '../../assets/default-user-image.png'
import articleImage from '../../assets/pexels-c-cagnin-1959065.jpg'
import './style.css'

const Coments = () => {
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
                                    <h1>150</h1>
                                </div>
                            </div>
                        </Stat>
                        <Stat className="user-more-comented" >
                            <h2>Usuário que mais comentou</h2>
                            <div className="content">
                                <ion-icon name="people"></ion-icon>
                                <div className="info">
                                    <h2>Claudinei</h2>
                                    <h2>16 Comentários</h2>
                                </div>
                            </div>
                        </Stat>
                        <Stat className="last-like">
                            <h2>Último comentário</h2>
                            <div className="content">
                                <ion-icon name="chatbubbles"></ion-icon>
                                <div className="info">
                                    <h2>Claudinei</h2>
                                    <h2>02/12/2020 às 11:56</h2>
                                </div>
                            </div>
                        </Stat>
                        <Stat className="article-more-comented" >
                            <h2>Artigo mais comentado</h2>
                            <div className="content">
                                <ion-icon name="add-circle"></ion-icon>
                                <div className="info">
                                    <h2>Maratona 21KM</h2>
                                    <h2>132 Comentários</h2>
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
                                    <div class="coment">
                                        <div class="info">
                                            <div class="info-like">
                                                <img class="img-user" src={imageUser} alt="" />
                                                <div>
                                                    <h2>Claudinei</h2>
                                                    <h2>02/12/2020 às 11:56</h2>
                                                </div>
                                            </div>
                                            <div class="info-article">
                                                <h2>Maratona 21km</h2>
                                                <img class="img-article" src={articleImage} alt="" />
                                            </div>
                                        </div>
                                        <div class="content">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                            has been the industry's standard dummy text ever since the 1500s, when an unknown
                                            printer took a galley of type and scrambled it to make a type specimen book. It has
                                            survived not only five centuries, but also the leap into electronic typesetting,
                                            remaining essentially unchanged. It was popularised in the 1960s with the release of
                                            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </div>
                                    </div>
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