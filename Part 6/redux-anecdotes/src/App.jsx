import { useSelector, useDispatch } from 'react-redux'
import { create, vote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const handleVote = id => {
    dispatch(vote(id))
  }

  const handleCreate = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    console.log(content)
    e.target.anecdote.value = ''
    dispatch(create(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
