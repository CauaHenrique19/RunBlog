import React from 'react'

import './Sidebar.css'

const SideBar = ({ children }) => {
    return (
        <div className="sidebar">
            <div className="search">
                <input type="text" name="search" id="search" placeholder="Pesquisar" />
                <ion-icon name="search-outline"></ion-icon>
            </div>
            <h1>Artigos</h1>
            <ul>
                {children}
            </ul>
        </div>)
}

export default SideBar