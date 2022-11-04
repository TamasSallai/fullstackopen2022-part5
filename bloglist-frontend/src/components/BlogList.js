import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggable from './Toggable'

const BlogList = ({
  blogs,
  user,
  handleLogout,
  handleBlogCreation,
  handleBlogRemove,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
      <Toggable buttonLabel="New note">
        <BlogForm handleBlogCreation={handleBlogCreation} />
      </Toggable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleBlogRemove={handleBlogRemove}
          />
        ))}
    </div>
  )
}

export default BlogList
