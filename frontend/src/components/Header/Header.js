import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../context/context'

import logo from '../../assets/logo-branca.png'
import profileImage from '../../assets/default-user-image.png'

import './Header.css'

const Header = () => {

    const { user, token, setUser, setToken, setArticle, setViewContent } = useContext(Context)
    const history = useHistory()

    function handleLogout(){
        localStorage.removeItem('runblog_user')
        localStorage.removeItem('token')
        setUser('')
        setToken('')
        setViewContent(false)
        setArticle()
        history.push('/login')
    }
    
    return (
        <header className="header">
            <div className="content-logo">
                <Link to="/">
                    <img className="logo" src={logo} alt="RunBlog" />
                </Link>
            </div>
            <div className="user-content">
                {
                    !token &&
                    <Link to="/login" className="content-login" >
                        <ion-icon name="person-outline"></ion-icon>
                        <h2>Login</h2>
                    </Link>
                }
                {
                    token &&
                    <div className="content-profile">
                        <img src={profileImage} alt="" />
                        <h3>{user.name}</h3>
                    </div>
                }
                {
                    token &&
                    <div className="content-logout" onClick={handleLogout} >
                        <ion-icon name="log-out-outline"></ion-icon>
                        <h2>Sair</h2>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header