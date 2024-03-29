import { createAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    //const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      console.log(content)
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
    }

return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  </div>
  )
}

export default AnecdoteForm