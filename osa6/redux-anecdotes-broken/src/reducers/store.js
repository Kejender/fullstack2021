import { createStore } from 'redux'
import reducer from './anecdoteReducer'
const store = createStore(reducer)
export default store