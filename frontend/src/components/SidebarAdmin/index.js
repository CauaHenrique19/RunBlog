import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const SidebarAdmin = ({ visualizeContent }) => {
    return (
        <div className="sidebar-admin">
            <h1><ion-icon name="settings-outline"></ion-icon>Admin</h1>
            <ul>
                <Link to="/likes" className={visualizeContent === 'likes' ? 'selected' : ''}>
                    <ion-icon name="heart"></ion-icon>Curtidas
                </Link>
                <Link to="/coments" className={visualizeContent === 'coments' ? 'selected' : ''}>
                    <ion-icon name="chatbox"></ion-icon>Comentários
                </Link>
                <Link className={visualizeContent === 'categories' ? 'selected' : ''}>
                    <ion-icon name="pricetag"></ion-icon>Categorias
                </Link>
            </ul>
        </div>
    )
}

export default SidebarAdmin