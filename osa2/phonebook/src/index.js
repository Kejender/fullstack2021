import ReactDOM from 'react-dom'
import App from './App.js'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/countries')
console.log("ind", promise)

//const [persons, setPersons] = useState([])



ReactDOM.render(
  <App/>,
  document.getElementById('root')
)