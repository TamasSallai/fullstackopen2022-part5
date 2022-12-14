import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }, [notification])

  const handleLogin = (username, password) => async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'wrong username or password',
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleBlogCreation = (newBlog) => async (e) => {
    e.preventDefault()
    try {
      const responseBlogData = await blogService.create(newBlog)
      setBlogs(blogs.concat(responseBlogData))
      setNotification({
        type: 'success',
        message: `a new blog "${responseBlogData.title}" by ${responseBlogData.author} added`,
      })
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message,
      })
    }
  }

  const handleBlogRemove = async (blog) => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author} `)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      {notification !== null && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <BlogList
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleBlogCreation={handleBlogCreation}
          handleBlogRemove={handleBlogRemove}
        />
      )}
    </div>
  )
}

export default App
