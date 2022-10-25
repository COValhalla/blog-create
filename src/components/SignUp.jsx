import React, { useState } from 'react'
import PasswordChecklist from 'react-password-checklist'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
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
        className="mx-auto mt-4 flex w-1/3 flex-col gap-2 rounded bg-slate-900 p-4 text-white"
        onSubmit={handleSubmit}
      >
        <h1 className="mx-auto text-2xl">Sign Up</h1>
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

        <label htmlFor="password">Confirm Password</label>
        <input
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
          className="mb-2 rounded bg-slate-800"
          placeholder="Confirm your password."
          type="password"
          name="password"
          id="password"
        />

        <PasswordChecklist
          rules={['minLength', 'number', 'capital', 'match']}
          minLength={5}
          value={password}
          valueAgain={passwordConf}
          onChange={(isValid) => {}}
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
