import React, { useState, useEffect, useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { UserContext } from '../../context/user'

import api from '../../services/api'
import './style.css'

const FormArticle = ({ functionsForm, article, handleForm }) => {

    const [categories, setCategories] = useState([])
    const { user, token } = useContext(UserContext)

    const headers = {
        headers: {
            token: token,
            admin: user.admin,
            user_id: user.id
        }
    }

    useEffect(() => {
        api.get('categories', headers)
            .then((res) => setCategories(res.data))
    }, [])

    return (
        <form className="form-article" onSubmit={handleForm} >
            <div className="input-container">
                <input type="hidden" name="id" value={article.id} onChange={functionsForm.handleId} />
                <div className="input-title-container">
                    <label htmlFor="title">Título</label>
                    <input type="text"
                        value={article.title}
                        name="title"
                        id="title"
                        placeholder="Título..."
                        onChange={functionsForm.handleTitle}
                    />
                </div>
                <div className="input-category-id-container">
                    <label htmlFor="category-id">Categoria</label>
                    <select
                        value={article.categoriaId}
                        name="categoriaId"
                        id="category-id"
                        onChange={functionsForm.handleCategoryId}
                    >
                        <option value="">Selecione uma categoria</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="input-image-url-container">
                <label htmlFor="image-url">Url da Imagem</label>
                <input type="text"
                    value={article.imageUrl}
                    name="imageUrl"
                    id="image-url"
                    placeholder="Url da imagem..."
                    onChange={functionsForm.handleImageUrl}
                />
            </div>
            <Editor
                value={article.content}
                init={{
                    height: 500,
                    plugins: [
                        'advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
                    ],
                }}
                onEditorChange={functionsForm.handleContent}
            />
            <button type="submit" className="btn-new-article">Salvar</button>
        </form>
    )
}

export default FormArticle

