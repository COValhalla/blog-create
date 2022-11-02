import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Home() {
  const context = useContext(UserContext)
  const [blogs, setBlogs] = useState([])
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          'https://blog-api-covalhalla.herokuapp.com/api/blogs/user/',
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )

        const data = await res.json()

        if (res.status === 200) {
          setBlogs(data.blogs)
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

    fetchBlogs()
  }, [context.token])

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <div className="flex w-1/2 flex-col gap-2">
        {blogs
          ? blogs.map((blog) => (
              <Link
                key={blog._id}
                to="/edit/"
                className="flex items-center justify-between rounded bg-slate-800 p-4"
                state={{ blog }}
              >
                <h2 className="text-xl ">Blog Title: {blog.title}</h2>
                <p>Status: {blog.status}</p>
              </Link>
            ))
          : null}
      </div>
    </div>
  )
}

export default Home
