import React, { useState } from 'react'

const Blog = ({ blog, sendUpdate, deleteBlog, user }) => {

  console.log('blog user', user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let deleteVisible

  if (user === blog.author){
    console.log('same user', user, blog.author)
    deleteVisible = true
  } else {
    console.log('different user', blog.author, user)
    deleteVisible = false
  }

  const [detailsVisible, setVisibility] = useState(false)
  const [buttonText, setButton] = useState(false)
  const hideWhenNoOwner = { display: deleteVisible ? '' : 'none' }
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: detailsVisible ? '' : 'none' }
  const buttonShowHide = !buttonText ? 'Show' : 'Hide'

  const toggleVisibility = () => {
    console.log('toggle')
    setVisibility(!detailsVisible)
    setButton(!buttonText)
    console.log(detailsVisible)
  }

  const addLike = () => {
    setLikes(likes+1)
    blog.likes = likes

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      id: blog.id
    }

    console.log('updated', updatedBlog)
    sendUpdate(updatedBlog)
  }

  const sendDeleteBlog = () => {

    const blogToDelete = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      id: blog.id
    }

    console.log('delete')
    deleteBlog(blogToDelete)
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author} <button id="showhide" onClick={toggleVisibility}>{buttonShowHide}</button>
      <div className="hideWhenVisible" style={hideWhenVisible}>
        <ul>
          <li className="url">{blog.url}</li>
          <li className="likes">Likes {likes} <button id="like" onClick={addLike}>Like</button></li>
        </ul>
        <button id="delete" style={hideWhenNoOwner} onClick={sendDeleteBlog}>Delete</button>
      </div>
    </div>
  )
}

export default Blog