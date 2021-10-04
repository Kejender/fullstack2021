import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Country from './components/Country'
import Weather from './components/Weather'
import './App.css';

function App() {

  const [ countries, setcountries ] = useState('')
  const [ countries2, setcountries2 ] = useState('')
  const [ flag, setFlag ] = useState('')
  const [ weather, setWeather ] = useState('')
  const [ searchstring, setSearchString  ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3/all')
      .then(response => {
        console.log('promise fulfilled')
        setcountries(response.data)
        //setcountries2(response.data)
      })
  }, [])

  const createCountry = (result) => {
    //console.log("f", result[0].flags[0])
    axios
      .get(result[0].flags[0])
      .then(response => {
        //console.log('promise fulfilled', response.data)
        setFlag(<div className="flag" dangerouslySetInnerHTML={{ __html: response.data}}/>)
      })

    const appId = process.env.REACT_APP_APPID
    //console.log("id", process.env.REACT_APP_APPID)

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${result[0].capital},${result[0].alpha2Code}&units=metric&appid=${appId}&`)
      .then(response => {
        console.log('promise fulfilled', response.data)
        setWeather(response.data)
      })

    let lista = result.map(country => 
      <Country country={country}/>
    )

    return(lista)
  }

  const showDetails = (event) => {
    console.log("details", event.target.id)
    console.log("details", countries)
    console.log("details", typeof(countries[0].ccn3))
    let result = countries.filter(maa => maa.ccn3 === event.target.id);
    console.log("loppu", result)
    setcountries2(createCountry(result))
    setSearchString('')
  }

  const handleSearchChange = (event) => {
    console.log("etv", event.target.value)
    setSearchString(event.target.value)

    let result = countries
    result = result.filter(maa => maa.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log("re", result)

    if (result.length > 1 && result.length < 10) {
      console.log("length ok")
      let countrylist = result.map(country => 
        <div key={country.ccn3}>{country.name.common} <button id={country.ccn3} onClick={showDetails}>Details</button></div>)
      setcountries2(countrylist)
      setFlag('')
      setWeather('')
      console.log(countrylist)
    }
    if (result.length === 1) {
      console.log("one result")
      setcountries2(createCountry(result))
    }
    if (result.length > 9) {
      console.log("too many results")
      setcountries2('too many results')
      setFlag('')
      setWeather('')
    }
  }

  return (
    <div className="App">
      <Search handleSearchChange={handleSearchChange} searchstring={searchstring}/>
      {countries2}{flag}
      <Weather weather={weather}/>
    </div>
  );
}

export default App;