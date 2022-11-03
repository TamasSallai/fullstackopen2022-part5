import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ blogs, user, handleLogout, handleBlogCreation }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
      <BlogForm handleBlogCreation={handleBlogCreation} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
