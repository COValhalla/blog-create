import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Edit from './components/Edit'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Navigation from './components/partials/Navigation'
import { UserContextProvider } from './context/UserContext'

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/" element={<Edit />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
