import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecList = state => state.anecdotes
    const filt = state => state.filter
    const anecdotesCreator = createSelector(anecList, filt, (anecdotes, filter) => {
        const sorted = [...anecdotes]
        sorted.sort((a,b) => b.votes-a.votes)
        if (filter==='ALL'){
            return sorted
        }
        else{
            return sorted.filter(s => s.content.includes(filter))
        }
    })
    
    const anecdotes = useSelector(anecdotesCreator)

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