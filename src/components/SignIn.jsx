import React from 'react'

function SignIn() {
  return (
    <div>
      <form action="GET">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Sign In</button>
      </form>
      <h1 className="">Implement Sign-In/Auth for Creating Blogs Later</h1>
    </div>
  )
}

export default SignIn
