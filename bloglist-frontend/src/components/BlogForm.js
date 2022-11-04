import React, { useState } from 'react'

const BlogForm = ({ handleBlogCreation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation({ title, author, url })}>
        <div>
          <label>title: </label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>author: </label>
          <input type="text" onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label>url: </label>
          <input type="text" onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
