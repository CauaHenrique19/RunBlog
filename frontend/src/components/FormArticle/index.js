import React, { useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Context } from '../../context/context'

import api from '../../services/api'
import './style.css'

const FormArticle = () => {

    const { setArticleId, setTitle, setCategoryId, setImageUrl, setContentArticle } = useContext(Context)
    const { setViewContent, setViewForm, setViewNewArticles } = useContext(Context)
    const { articleId, title, categoryId, imageUrl, contentArticle } = useContext(Context)
    const { categories, articles, setArticles } = useContext(Context)
    const { headers } = useContext(Context)

    const article = {
        id: articleId,
        title,
        categoryid: parseInt(categoryId),
        imageUrl,
        content: contentArticle
    }

    function handleForm(e) {
        e.preventDefault();

        if (article.id) {
            api.put(`articles/${article.id}`, article, headers)
                .then(res => {
                    const articleInArray = articles.find(articleFind => articleFind.id === article.id)
                    const index = articles.indexOf(articleInArray)

                    articleInArray.title = article.title
                    articleInArray.categoryId = article.categoryid
                    articleInArray.imageUrl = article.imageUrl
                    articleInArray.content = article.content
                    articles.splice(index, 1, articleInArray)

                    setArticles(articles)
                    setViewForm(false)
                    setViewContent(true)
                })
                .catch(error => console.log(error))
        }
        else {
            api.post('articles', article, headers)
                .then(res => {
                    const returnedArticle = res.data.article
                    articles.push(returnedArticle)
                    setArticles(articles)
                    setViewForm(false)
                    setViewContent(false)
                    setViewNewArticles(true)
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <form className="form-article" onSubmit={handleForm} >
            <div className="input-container">
                <input type="hidden" name="id" value={articleId} onChange={(e) => setArticleId(e.target.value)} />
                <div className="input-title-container">
                    <label htmlFor="title">Título</label>
                    <input type="text"
                        value={title}
                        name="title"
                        id="title"
                        placeholder="Título..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-category-id-container">
                    <label htmlFor="category-id">Categoria</label>
                    <select
                        value={categoryId}
                        name="categoriaId"
                        id="category-id"
                        onChange={(e) => setCategoryId(e.target.value)}
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
                    value={imageUrl}
                    name="imageUrl"
                    id="image-url"
                    placeholder="Url da imagem..."
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <Editor
                value={contentArticle}
                init={{
                    height: 450,
                    plugins: [
                        'advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
                    ]
                }}
                onEditorChange={(e) => setContentArticle(e)}
            />
            <button type="submit" className="btn-new-article">Salvar</button>
        </form>
    )
}

export default FormArticle

