import { useSelector } from 'react-redux'
//import { Note } from '../reducers/anecdoteReducer'

const Notification = () => {
  const notification = useSelector('note')
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