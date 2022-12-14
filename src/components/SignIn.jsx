import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function SignIn() {
  const context = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        'https://blog-api-covalhalla.herokuapp.com/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      )

      const data = await res.json()

      if (res.status === 200) {
        navigate('/')
        context.login(data.user.username, data.token)
      } else {
        setErrorMessages((prevErrorMessages) => {
          const newErrorMessages = prevErrorMessages.filter(
            (message) => message !== data.errors,
          )
          newErrorMessages.push(data.errors)
          return newErrorMessages
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form
        className="mx-auto mt-4 flex w-1/3 flex-col gap-2 rounded bg-slate-900 p-4 text-white"
        onSubmit={handleSubmit}
      >
        <h1 className="mx-auto text-2xl">Sign In</h1>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded bg-slate-800"
          placeholder="Enter a username."
          type="text"
          name="username"
          id="username"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded bg-slate-800"
          placeholder="Enter a secure password."
          type="password"
          name="password"
          id="password"
        />

        <button
          className="mt-2 w-fit self-center rounded bg-green-700 py-1 px-2 "
          type="submit"
        >
          Sign In
        </button>

        {errorMessages.length > 0 ? (
          <ul className="mx-auto text-red-500">
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        ) : null}
      </form>
    </div>
  )
}

export default SignIn
