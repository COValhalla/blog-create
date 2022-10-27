import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function Navigation() {
  const context = useContext(UserContext)
  return (
    <div>
      <nav className="flex justify-between bg-slate-800 px-8 py-1 text-2xl text-white">
        <div>
          <Link className="rounded py-1 hover:bg-gray-500" to="/">
            Home
          </Link>
        </div>

        <div className="flex gap-8">
          {!context.user ? null : (
            <Link className="rounded py-1 hover:bg-gray-500" to="/create">
              Create Blog
            </Link>
          )}
          {context.user ? (
            <Link
              className="rounded py-1 hover:bg-gray-500"
              to="/"
              onClick={() => context.logout()}
            >
              Logout
            </Link>
          ) : (
            <Link className="rounded py-1 hover:bg-gray-500" to="/sign-in">
              Sign-In
            </Link>
          )}

          {context.user ? null : (
            <Link className="rounded py-1 hover:bg-gray-500" to="/sign-up">
              Sign Up
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navigation
