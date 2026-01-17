import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter==='ALL'){
            return state.anecdotes.sort((a,b) => b.votes-a.votes)
        }
        else{
            return state.anecdotes.filter(s => s.content.includes(state.filter)).sort((a,b) => b.votes-a.votes)
        }
    })

    const handleVote = (id) => {
        dispatch(vote(id))
    }

    return(
        <>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
                </div>
            ))}
        </>
    )
}

export default AnecdoteList