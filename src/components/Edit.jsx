import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Edit() {
  const location = useLocation()
  const { blog } = location.state
  const context = useContext(UserContext)
  const [title, setTitle] = useState(blog.title)
  const [content, setContent] = useState(blog.content)
  const [status, setStatus] = useState(blog.status)
  const [errorMessages, setErrorMessages] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `https://blog-api-covalhalla.herokuapp.com/api/blogs/${blog._id}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`,
          },
          body: JSON.stringify({
            title,
            content,
            status,
          }),
        },
      )

      const data = await res.json()

      if (res.status === 200) {
        navigate('/')
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

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `https://blog-api-covalhalla.herokuapp.com/api/blogs/${blog._id}/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`,
          },
        },
      )

      const data = await res.json()

      if (res.status === 200) {
        navigate('/')
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
    <div className="mx-auto mt-4 flex w-1/2 flex-col rounded bg-slate-800 p-4">
      <h1 className="mx-auto text-2xl font-bold">Edit your blog.</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded p-1"
          type="text"
          name="title"
          id="title"
        />
        <label htmlFor="content">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded p-1"
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></textarea>
        <label htmlFor="status">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-1/4 rounded p-1"
          name="status"
          id="status"
        >
          <option value="unpublished">Unpublished</option>
          <option value="published">Published</option>
        </select>
        <div className="flex">
          <button
            onClick={handleDelete}
            className="mx-auto mt-4 w-24 rounded bg-red-500 p-2"
            type="button"
          >
            Delete
          </button>

          <button
            type="submit"
            className="mx-auto mt-4 w-24 rounded bg-green-600 p-2"
          >
            Save blog
          </button>
        </div>

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

export default Edit
