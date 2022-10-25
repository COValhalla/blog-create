import React, { useState } from 'react'
import PasswordChecklist from 'react-password-checklist'
import validator from 'validator'

function SignUp() {
  const [username, setUsername] = useState({
    value: '',
    valid: false,
  })
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [valid, setValid] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const handleUsernameChange = (e) => {
    const { value } = e.target
    setUsername((prevUsername) => ({
      ...prevUsername,
      value,
    }))
  }

  const usernameValidation = () => {
    if (validator.isAlphanumeric(username.value)) {
      setUsername((prevUsername) => ({
        ...prevUsername,
        valid: true,
      }))
      setErrorMessages((prevErrorMessages) => {
        const newErrorMessages = prevErrorMessages.filter(
          (message) => message !== 'Username must be alphanumeric.',
        )
        return newErrorMessages
      })
    } else {
      setUsername((prevUsername) => ({
        ...prevUsername,
        valid: false,
      }))
      setErrorMessages((prevErrorMessages) => {
        const newErrorMessages = prevErrorMessages.filter(
          (message) => message !== 'Username must be alphanumeric.',
        )
        newErrorMessages.push('Username must be alphanumeric.')
        return newErrorMessages
      })
    }

    if (validator.isLength(username.value, { min: 8, max: 20 })) {
      setUsername((prevUsername) => ({
        ...prevUsername,
        valid: true,
      }))
      setErrorMessages((prevErrorMessages) => {
        const newErrorMessages = prevErrorMessages.filter(
          (message) =>
            message !== 'Username must be between 8 and 20 characters.',
        )
        return newErrorMessages
      })
    } else {
      setUsername((prevUsername) => ({
        ...prevUsername,
        valid: false,
      }))
      setErrorMessages((prevErrorMessages) => {
        const newErrorMessages = prevErrorMessages.filter(
          (message) =>
            message !== 'Username must be between 8 and 20 characters.',
        )
        newErrorMessages.push('Username must be between 8 and 20 characters.')
        return newErrorMessages
      })
    }
  }

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
          value={username.value}
          onChange={handleUsernameChange}
          onBlur={usernameValidation}
          className="rounded bg-slate-800"
          placeholder="Enter a username."
          type="text"
          name="username"
          id="username"
        />

        {errorMessages.length > 0 ? (
          <ul className="text-red-500">
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          value={password.value}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded bg-slate-800"
          placeholder="Enter a secure password."
          type="password"
          name="password"
          id="password"
        />

        <label htmlFor="passwordConf">Confirm Password</label>
        <input
          value={passwordConf.value}
          onChange={(e) => setPasswordConf(e.target.value)}
          className="mb-2 rounded bg-slate-800"
          placeholder="Confirm your password."
          type="password"
          name="passwordConf"
          id="passwordConf"
        />

        <PasswordChecklist
          rules={['minLength', 'number', 'capital', 'match']}
          minLength={5}
          value={password}
          valueAgain={passwordConf}
          onChange={(isValid) => {
            setValid(isValid)
          }}
        />

        <button
          className="mt-2 w-fit self-center rounded bg-green-700 py-1 px-2 "
          type="submit"
          disabled={!username.valid || !valid}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
