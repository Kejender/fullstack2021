import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ sendLogin, username, password, handleUserNameChange, handlePassWordChange }) => {

  return (
    <form onSubmit={sendLogin}>
      <div>
        Username: <input
          id="username"
          value={username}
          onChange={handleUserNameChange}/>
      </div>
      <div>
        Password: <input
          id="password"
          value={password}
          onChange={handlePassWordChange}/>
      </div>
      <div>
        <button id="login" type="submit">Login</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  sendLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm