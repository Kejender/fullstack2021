import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/User'
import Create from './components/Create'
import blogService from './services/blogs'
import loginService from './services/users'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const InfoNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="info">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [createVisible, setCreateVisible] = useState(false)

  const getSortBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      console.log('sorted', blogs)
      setBlogs( blogs )
    })
  }

  useEffect(() => {
    getSortBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('storage', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user.name)
      setUserName(user.username)
      blogService.setToken(user.token)
      console.log('useEffect token', user.token)
    } else {
      console.log('useEffect no log')
    }
  }, [])

  const sendLogin = (event) => {
    event.preventDefault()
    console.log('login', username, password)

    let credentials

    if (username.length >= 3 && password.length >= 3){

      credentials = {
        username: username,
        password: password
      }

      loginService
        .login(credentials)
        .then(response => {
          console.log('res', response)
          if (response.token && response.token.length > 0) {
            console.log('token ok', response.username, response.name)
            setUser(response.name)
            setUserName(response.username)
            console.log('login token', response.token)
            blogService.setToken(response.token)//user
            window.localStorage.setItem(
              'loggedBlogappUser', JSON.stringify(response)
            )
          }
        })
        .catch(error => {
          console.log('error', error)
          setErrorMessage('Wrong username or password')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  const sendLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (blogObject) => {
    console.log('add', blogObject)
    blogService
      .create(blogObject)
      .then(response => {
        console.log('res', response)
        getSortBlogs()
        setInfoMessage(`${blogObject.title} added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 3000)
      })
  }

  const updateBlog = (blogObject) => {
    console.log('blogobj', blogObject)
    blogService
      .update(blogObject)
      .then(response => {
        console.log('res', response)
        blogs.sort((a, b) => {
          return b.likes - a.likes
        })
        setBlogs( blogs )
      })
  }

  const deleteBlog = (blogObject) => {
    console.log('delete', blogObject)
    blogService
      .deleteB(blogObject)
      .then(response => {
        console.log('res', response)
        blogService.getAll().then(blogs => {
          blogs.sort((a, b) => {
            return b.likes - a.likes
          })
          console.log('sorted', blogs)
          setBlogs( blogs )
        })
      })
  }

  const handleUserNameChange = (event) => {
    console.log(event.target.value)
    setUserName(event.target.value)
  }

  const handlePassWordChange = (event) => {
    console.log(event.target.value)
    setPassWord(event.target.value)
  }

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  console.log('user', user)

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage} />
        <h2>Log in to application</h2>
        < Login sendLogin={sendLogin} username={username} password={password} setUserName={setUserName} setPassWord={setPassWord}
          handleUserNameChange={handleUserNameChange} handlePassWordChange={handlePassWordChange}/>
      </div>
    )
  }
  else {
    console.log('user bloglist', username)
    return (
      <div>
        <InfoNotification message={infoMessage} />
        <Logout sendLogout={sendLogout} user={user}/>

        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>Create new blog</button>
        </div>

        <div style={showWhenVisible}>
          <Create sendCreate={addBlog}/>
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>

        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog sendUpdate={updateBlog} updateBlogs={setBlogs} deleteBlog={deleteBlog} key={blog.id} blog={blog} user={username}
          />
        )}
      </div>
    )}
}
export default App