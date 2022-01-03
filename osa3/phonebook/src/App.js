import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Search from './components/Search'

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
  const [ persons, setPersons] = useState([]) 
  const [ persons2, setPersons2] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber  ] = useState('')
  const [ searchstring, setNewString  ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ infoMessage, setInfoMessage ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setPersons2(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('add clicked', newName)

    let tablecheck = persons.map(n => n.name).indexOf(newName)
    const person = persons.find(p => p.name === newName)

    console.log(tablecheck, person)

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (tablecheck < 0) {

    personService
      .create(personObject)
      .then(response => {
        setPersons2(persons.concat(response.data))
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setInfoMessage(
          `${newName} added`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('error', error.response.data)
        //console.log("error", error.response.data.replace(/<[^>]+>/g, ''))
        //console.log("error", error.response.data.validationError)

        const parser = new DOMParser()
        const floatingElement = parser.parseFromString(error.response.data, 'text/html')
        console.log('errorf', floatingElement)


        console.log('txt', floatingElement.body.textContent)
        const errorbody = floatingElement.body.innerHTML
        const errortextarray = errorbody.split('<br>')
        //console.log("arr", errortextarray)
        const errortextmsg = errortextarray[0].replace(/<[^>]+>/g, '')
        //console.log("error", errortextarray.replace(/<[^>]+>/g, ''))
        console.log('arr', errortextmsg)
        const errormessage = floatingElement.innerText

        console.log('error', errormessage)

        setInfoMessage(
          `${errortextmsg}`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })

    }
    else {
      let result = window.confirm(`${newName} exists already. Replace number?`);
      console.log('replace', result)
      
      if (result){
        personService
        .update(person.id, personObject)
        .then(response => {
          setNewName('')
          setNewNumber('')
          setInfoMessage(
            `${newName} updated`
          )

          personService
          .getAll()
          .then(response => {
            setPersons(response.data)
            setPersons2(response.data)
          })


          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log("error")
          setErrorMessage(axios
            `${person.name} was already removed from server`
          )
          personService
          .getAll()
          .then(response => {
            setPersons(response.data)
            setPersons2(response.data)
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }

    setNewName('')
    setNewNumber('')
  }

  const delPerson = (event) => {
    console.log("delete", event.target.id, typeof(event.target.id))

    let result = window.confirm(`Delete?`);
    console.log(result)

    if (result){
      //const url = `http://localhost:3001/api/persons/${event.target.id}`
      const url = `https://arcane-shelf-21967.herokuapp.com/api/persons/${event.target.id}`
      //const deleteid = parseInt(event.target.id)
      //const deleteperson = persons.find(p => p.id === deleteid)
      const deleteid = event.target.id
      const deleteperson = persons.find(p => p.id === event.target.id)
      
      console.log('persons', persons)
      console.log('del',deleteperson, deleteid)

      axios.delete(url).then(response => {

        setInfoMessage(
          `${deleteperson.name} deleted`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)

        setPersons(persons.filter(person => person.id !== deleteid))
        setPersons2(persons2.filter(person => person.id !== deleteid))
        console.log('pl', persons.length, persons2.length)
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log('etv', event.target.value)
    setNewString(event.target.value)
    setPersons2(persons)

    console.log('len', event.target.value.length)
    let result = persons

    result = result.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log('re', result)
    console.log('pe', persons)
    setPersons2(result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <InfoNotification message={infoMessage} />
      <Search handleSearchChange={handleSearchChange} searchstring={searchstring}/>
      <h2>Add new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>
      {persons2.map(person => 
      <Persons key={person.id} person={person} delPerson={delPerson}/>
      )}
    </div>
  )}
export default App