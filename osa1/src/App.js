import React, { useState } from 'react'

const Anecdote = (props) => {
    return (
      <div style={{height:"50px"}}>
      <p>{props.text}</p>
      </div>
    )
}

const AnecdoteMostVoted = (props) => {
  
  if (props.votebegun) {
    let voted = 0
    let voted_ind = 0
    let table_ind = props.points.length -1

    props.points.forEach(function(element, index) {
      if (element > voted) {
        voted = element
        voted_ind = index
      }

      if (index === table_ind) {
        props.setMostvoted(voted_ind)
      }
    })

  return (
    <div>
    <h1>Most popular anecdote</h1>
    <p>{props.text}</p>
    <p>Has {props.points[props.mostvoted]} points</p>
    </div>
  )
  }
  else {
    return (
      <div></div>
    )
  }
}

const Rating = (props) => {
  return (
    <p>{props.text}</p>
  )
}

const StatisticsLine = (props) => {
  if (props.text === "positive"){
  return (
    <tr>
    <td>{props.text}</td><td>{props.value}%</td>
    </tr>
  )
  }
  else {
    return (
      <tr>
      <td>{props.text}</td><td>{props.value}</td>
      </tr>
    )
  }
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  if (good === 0 && neutral === 0 && bad === 0 ) {
    return (
      <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }
  else {
  return (
    <div>
    <h1>Statistics</h1>
    <table>
      <thead></thead>
      <tbody>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={good + neutral + bad}/>
      <StatisticsLine text="average" value={(good + bad * -1) / (good + neutral + bad)}/>
      <StatisticsLine text="positive" value={(good / (good + neutral + bad)) * 100}/>
      </tbody>
    <tfoot></tfoot>
    </table>
    </div>
  )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.']

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [selected, setSelected] = useState(0)
  const [mostvoted, setMostvoted] = useState(false)
  const [votebegun, setVoteBegun] = useState(false)

  const increaseGoodByOne = () => {
    setGood(good + 1)
  }

  const increaseNeutralByOne = () => {
    setNeutral(neutral + 1)
  }

  const increaseBadByOne = () => {
    setBad(bad + 1)
  }

  const randomAnecdote = () => {
    return Math.floor(Math.random() * Math.floor(anecdotes.length))
  }

  const getAnecdote = (props) => {
    let currentanecdote = selected
    let nextanecdote = randomAnecdote()

    while (currentanecdote === nextanecdote) {
      nextanecdote = randomAnecdote()
    }

    setSelected(nextanecdote)
  }

  const voteAnecdote = (props) => {
    const copy = [...points]
    copy[selected]++
    if (!votebegun) {
      setVoteBegun(true)
    }
    setPoints(copy)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={increaseGoodByOne}/>
      <Button text="neutral" onClick={increaseNeutralByOne}/>
      <Button text="bad" onClick={increaseBadByOne}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <Anecdote text={anecdotes[selected]}/>
      <Rating text={"Votes: "+points[selected]}/>
      <Button text="next anecdote" selected={selected} onClick={getAnecdote}/>
      <Button text="vote this" selected={selected} onClick={voteAnecdote}/>
      <AnecdoteMostVoted text={anecdotes[mostvoted]} mostvoted={mostvoted} setMostvoted={setMostvoted} votebegun={votebegun} points={points}/>
    </div>
  )
}

export default App