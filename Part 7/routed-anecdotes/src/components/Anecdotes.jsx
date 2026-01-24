import { Link } from 'react-router-dom'

export const AnecdoteList = ({ anecdotes }) => {
    return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>)}
      </ul>
    </div>
)}

export const Anecdote = ({ anecdote }) => {
    return(
      <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    )
  }
