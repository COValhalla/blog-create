import React, { useEffect, useState } from 'react'

function Create() {
  const [api, setApi] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/blogs/')
      .then((res) => res.json())
      .then((data) => setApi(data.message))
  }, [])

  return (
    <div className="flex flex-col bg-slate-600">
      <h1 className="text-3xl font-bold underline">Blog website</h1>
      <p>{api}</p>
    </div>
  )
}

export default Create
