import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ user, blog, handleBlogRemove }) => {
  const [toShow, setToShow] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    try {
      setLikes(likes + 1)
      await blogService.update(blog.id, { ...blog, likes: likes + 1 })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: '1px solid',
        marginBottom: 5,
      }}
    >
      {blog.title} {blog.author}{' '}
      <button onClick={() => setToShow(!toShow)}>
        {toShow ? 'hide' : 'view'}
      </button>
      {toShow && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button onClick={() => handleBlogRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
