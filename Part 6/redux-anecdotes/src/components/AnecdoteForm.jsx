import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleCreate = e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(create(content))
      }
    return(
        <>
            <form onSubmit={handleCreate}>
                <div>
                <input name="anecdote"/>
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm