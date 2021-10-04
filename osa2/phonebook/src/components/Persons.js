import React from 'react'

const Persons = ({ person, delPerson }) => {
  return (
    <div>
      {person.name} {person.number}<button id={person.id} onClick={delPerson}>Delete</button>
    </div>
  )
}

export default Persons