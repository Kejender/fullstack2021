import React from 'react'

const Country = ({ country }) => {

  let languages = []

  for (let value of Object.entries(country.languages)) {
    console.log(value);
    languages.push(value)
  }
  console.log("lan", languages)

    return (
      <div key={country.ccn3}>
      <h2 key={country.ccn3+1}>{country.name.common}</h2>
      <p key={country.ccn3+2}>Capital: {country.capital}</p>
      <p key={country.ccn3+3}>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul key={country.ccn3+5}>
        {languages.map(lan => 
        <li key={lan[0]}>{lan[1]}</li>)}
      </ul>          
      </div>
  )
}

export default Country