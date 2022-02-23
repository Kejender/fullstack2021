const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
//const state = anecdotesAtStart.map(asObject)
//const state = initialState

const reducer = (state = initialState, action) => {
//const reducer = (state = state, action) => {
  console.log('initial', state)

  switch (action.type) {
    case 'VOTE':
      console.log('state now: ', state)
      console.log('anecdote', action.data.id)
      const id = action.data.id
      //const voteid = action.id
      const anecdoteToChange = state.find(a => a.id === id)
      console.log('anecdote', anecdoteToChange)

      const updatedAnecdote = {
        content: anecdoteToChange.content,
        id: anecdoteToChange.id,
        votes: anecdoteToChange.votes + 1
      }
      console.log('anecdote', updatedAnecdote)

      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )

      newState.sort((a, b) => {
        return b.votes - a.votes
      })

      console.log('anecdotes', newState)
      state = newState
      //return initialState
      /*const newState = {
        good: state.good+1,
        ok: state.ok,
        bad: state.bad
      }*/
      console.log('vote')
      //state.good = state.good + 1
      //state = newState
      return state
    case 'NEW_ANECDOTE':
      console.log('add', action)



      const newlist = [...state, action.data]

      newlist.sort((a, b) => {
        return b.votes - a.votes
      })

      state = newlist
      return state

    }

  return state
}

export const addVote = (id) => {
  console.log('vote from reducer', id)

  /*const voteid = id.id
  const anecdoteToChange = initialState.find(a => a.id === voteid)
  console.log('anecdote', anecdoteToChange)

  const updatedAnecdote = {
    content: anecdoteToChange.content,
    id: anecdoteToChange.id,
    votes: anecdoteToChange.votes + 1
  }
  console.log('anecdote', updatedAnecdote)

  const newState = initialState.map(anecdote =>
    anecdote.id !== voteid ? anecdote : updatedAnecdote
  )
  console.log('anecdotes', newState)
  initialState = newState
  return initialState*/

  return {
    type: 'VOTE',
    data: {
      id
    }
  }


  /* 
    ...noteToChange, 
    important: !noteToChange.important 
  }*/
  /*return state.map(note =>
    note.id !== id ? note : changedNote 
  )*/
  //return id
}

export const createAnecdote = (content) => {

  console.log('createanecdote')
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }


}

export default reducer