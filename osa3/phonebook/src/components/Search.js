import React from 'react'

const Search = ({ searchstring, handleSearchChange }) => {

    return (
    <div>
      <form>
        <div>
          search: <input 
            value={searchstring}
            onChange={handleSearchChange}
            />
        </div>
      </form>
    </div>
  )
}

export default Search