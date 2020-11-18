import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import logo from '../../assets/logo.png'
import './style.css'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleSignup(e) {
        e.preventDefault()

        const user = {
            email,
            name,
            password,
            confirmPassword
        }

        api.post('signup', user)
            .then(res => console.log(res.data))
            .then(error => console.log(error))
    }

    return (
        <div className="signup">
            <img className="signup-logo" src={logo} alt="RunBlog" />
            <form className="form-container" onSubmit={handleSignup}>
                <div className="email-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="name-container">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="confirm-password-container">
                    <label htmlFor="confirm-password">Confirme a senha</label>
                    <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirmação" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Cadastrar</button>
                <div className="signin">
                    <div className="stick"></div>
                    <Link to="login">Já tem uma conta? Entre aqui</Link>
                    <div className="stick"></div>
                </div>
            </form>
        </div>
    )
}

export default Signup