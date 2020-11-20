import React, { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import api from '../../services/api'

import Message from '../../components/Message'
import { Context } from '../../context/context'

import logo from '../../assets/logo.png'
import './style.css'

const Login = () => {

    const { setUser, setToken, message, setMessage } = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    function handleLogin(e) {
        e.preventDefault()

        const login = { email, password }

        api.post('login', login)
            .then(res => {
                if (res.data.auth){
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('runblog_user', JSON.stringify(res.data.user))
                    setToken(res.data.token)
                    setUser(res.data.user)
                    history.push('/articles')
                }
                else {
                    setMessage(res.data.message)
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }, [message])
    
    return (
        <div className="login">
            <div className="form-container">
                <img src={logo} alt="RunBlog" className="login-logo" />
                { message && <Message  /> }
                <form onSubmit={handleLogin}>
                    <div className="email-container">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <div className="register">
                    <div className="stick"></div>
                    <Link to="signup">Não tem uma conta? Registre-se</Link>
                    <div className="stick"></div>
                </div>
            </div>
        </div>
    )
}

export default Login