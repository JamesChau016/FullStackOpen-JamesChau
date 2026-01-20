import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnec } from './reducers/anecdoteReducer'
import services from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    services.getAll().then(response => dispatch(setAnec(response)))    
  },[dispatch])



  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App
