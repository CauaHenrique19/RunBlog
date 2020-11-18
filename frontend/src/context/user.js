import React, { useState, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('runblog_user')))
    const [token, setToken] = useState(localStorage.getItem('token'))

    return(
        <UserContext.Provider value={{ user, token, setUser, setToken }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider