import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        const sorted = [...state.anecdotes]
        if (state.filter==='ALL'){
            return sorted.sort((a,b) => b.votes-a.votes)
        }
        else{
            return sorted.filter(s => s.content.includes(state.filter)).sort((a,b) => b.votes-a.votes)
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