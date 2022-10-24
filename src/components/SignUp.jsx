import React, { useState } from 'react'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (res.status === 200) {
        setUsername('')
        setPassword('')
        setMessage('User created successfully.')
      } else {
        setMessage('Error creating user.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form
        className="mx-auto mt-4 flex w-1/2 flex-col gap-2 rounded bg-slate-900 p-4 text-white"
        onSubmit={handleSubmit}
      >
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
          Sign Up
        </button>
        <div className="mx-auto">{message ? <p>{message} </p> : null} </div>
      </form>
    </div>
  )
}

export default SignUp
