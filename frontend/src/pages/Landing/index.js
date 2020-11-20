import React from 'react'

import landingImage from '../../assets/pexels-c-cagnin-1959065.jpg'

import Header from '../../components/Header'
import './style.css'

const Landing = () => {
    return (
        <div className="landing">
            <Header />
            <div className="landing-container">
                <div className="description">
                    <h1>RunBlog</h1>
                    <p>Blog criado por Cauã Henrique.</p>
                </div>
                <img className="landing-image" draggable="false" src={landingImage} alt="" />
            </div>
            <div class="info-running" id="advantages">
                <h1 class="title">Vantagens de correr...</h1>
                <div class="advantages">
                    <div class="box-advantage">
                        <ion-icon name="water-outline"></ion-icon>
                        <h1 class="title-box-advantage">Ajuda na circulação do sangue</h1>
                        <p class="text-box-advantage">
                            Este é um benefício que pode ajudar uma gama de corredores: pessoas com hipertensão, diabetes,
                            colesterol alto ou taquicardia, pessoas sedentárias ou acima do peso que às vezes sentem o coração
                            bater
                            mais rápido sem razão, e até mesmo pessoas com problemas cardíacos.
                        </p>
                    </div>
                    <div class="box-advantage">
                        <ion-icon name="happy-outline"></ion-icon>
                        <h1 class="title-box-advantage">Alivia o stress</h1>
                        <p class="text-box-advantage">
                            Correr é uma forma de extravazar o estresse acumulado. Ao movimentar o corpo em grande intensidade,
                            os chamados hormônios da felicidade, a endorfina e a dopamina, são liberados no cérebro. O humor
                            muda em questões de segundos, afastando o estresse.
                        </p>
                    </div>
                    <div class="box-advantage">
                        <ion-icon name="leaf-outline"></ion-icon>
                        <h1 class="title-box-advantage">Melhora a concentração</h1>
                        <p class="text-box-advantage">
                            A corrida é uma atividade que exige foco e determinação para superar os obstáculos do sedentarismo e
                            a fadiga. Além disso, quando você se dispõe a percorrer um trajeto, especialmente ao ar livre,
                            precisa se concentrar nos seus movimentos para não trombar com ninguém.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing