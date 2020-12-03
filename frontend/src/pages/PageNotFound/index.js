import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'
import image from '../../assets/404.jpg'

const PageNotFound = () => {
    return (
        <div className="not-found" >
            <h1>Página Não Encontrada!</h1>
            <img src={image} alt=""/>
            <Link to="/" >Voltar Para Home</Link>
        </div>
    )
}

export default PageNotFound