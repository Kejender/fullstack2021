//import { useSelector } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Notification = () => {
  const dispatch = useDispatch()
  dispatch(vote())
  const notification = 'note'
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification