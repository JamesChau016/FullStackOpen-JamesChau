import { 
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
import { useState } from 'react'
import { Anecdote, AnecdoteList } from './components/Anecdotes'
import CreateNew from './components/CreateNew'
import { Menu, About, Footer } from './components/misc'

const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  
    
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path='/create' element={<CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} navigate={navigate}/>}/>
        <Route path='/about' element={<About />}/>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes}/>}/>
      </Routes>
      <br/>
      <Footer />
    </div>
  )
}

export default App
