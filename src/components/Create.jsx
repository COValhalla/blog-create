import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Create() {
  const context = useContext(UserContext)
  const [api, setApi] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/blogs/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApi(data.message))
  }, [context.token])

  return (
    <div className="flex flex-col bg-slate-600">
      <h1 className="text-3xl font-bold underline">Blog website</h1>
      <p>{api}</p>
    </div>
  )
}

export default Create
