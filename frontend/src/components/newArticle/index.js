import React, { useContext } from 'react'
import { Context } from '../../context/context'

import image from '../../assets/image-newarticle.png'
import './style.css'

const NewArticle = () => {

    const { setViewForm, setViewNewArticles } = useContext(Context)

    function handleNewArticle() {
        setViewNewArticles(false)
        setViewForm(true)
    }

    return(
        <div className="new-article">
            <div className="image-new-article">
                <img src={image} alt="Escrever novo artigo?"/>
            </div>
            <div className="text-container">
                <h1>Escrever novo artigo?</h1>
                <button className="btn-write-new-article" onClick={handleNewArticle}>Escrever</button>
            </div>
        </div>
    )
}

export default NewArticle