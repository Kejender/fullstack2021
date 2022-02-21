import React from 'react'
import PropTypes from 'prop-types'

const LogoutForm = ({ sendLogout, user }) => {

  return (
    <form onSubmit={sendLogout}>
      <div>
        <h3>{user} logged in</h3>
        <button id="logout" type="submit">Logout</button>
      </div>
    </form>
  )
}

LogoutForm.propTypes = {
  sendLogOut: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default LogoutForm