import React, { createContext, useState } from 'react'

const UserContext = createContext()

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const login = (User, Token) => {
    setUser(User)
    setToken(Token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
