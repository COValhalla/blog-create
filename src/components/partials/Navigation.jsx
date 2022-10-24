import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div>
      <nav className="flex justify-between bg-slate-800 px-8 py-1 text-2xl text-white">
        <Link className="rounded py-1 hover:bg-gray-500" to="/">
          Home
        </Link>
        <Link className="rounded py-1 hover:bg-gray-500" to="/create">
          Create Blog
        </Link>
        <Link className="rounded py-1 hover:bg-gray-500" to="/sign-in">
          Sign In
        </Link>
        <Link className="rounded py-1 hover:bg-gray-500" to="/sign-up">
          Sign Up
        </Link>
      </nav>
    </div>
  )
}

export default Navigation
