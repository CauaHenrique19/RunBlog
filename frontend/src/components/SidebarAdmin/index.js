import React from 'react'

import './style.css'

const SidebarAdmin = ({ visualizeContent }) => {
    return (
        <div className="sidebar-admin">
            <ul>
                <li className={visualizeContent === 'likes' ? 'selected' : ''}>
                    <ion-icon name="heart"></ion-icon>Curtidas
                </li>
                <li className={visualizeContent === 'coments' ? 'selected' : ''}>
                    <ion-icon name="chatbox"></ion-icon>Comentários
                </li>
                <li className={visualizeContent === 'categories' ? 'selected' : ''}>
                    <ion-icon name="pricetag"></ion-icon>Categorias
                </li>
            </ul>
        </div>
    )
}

export default SidebarAdmin