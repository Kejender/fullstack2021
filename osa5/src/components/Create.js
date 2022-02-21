import React, { useState } from 'react'
import PropTypes from 'prop-types'

//const CreateForm = ({ sendCreate, author, title, url, handleTitleChange, handleURLChange, handleAuthorChange }) => {
const CreateForm = ({ sendCreate }) => {

  const [url, setURL] = useState([])
  const [author, setAuthor] = useState([])
  const [title, setTitle] = useState([])

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleURLChange = (event) => {
    console.log(event.target.value)
    setURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('send blog create')

    if (title && author && title.length >= 1 && author.length >= 1 && url.length >= 1){
      sendCreate({
        title: title,
        author: author,
        url: url
      })
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title: <input
          id="title"
          value={title}
          onChange={handleTitleChange}/>
      </div>
      <div>
        Author: <input
          id="author"
          value={author}
          onChange={handleAuthorChange}/>
      </div>
      <div>
      URL: <input
          id="url"
          value={url}
          onChange={handleURLChange}/>
      </div>
      <div>
        <button id="create" type="submit">Create</button>
      </div>
    </form>
  )
}

CreateForm.propTypes = {
  sendCreate: PropTypes.func.isRequired
}

export default CreateForm