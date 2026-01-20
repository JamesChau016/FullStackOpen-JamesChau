import { useDispatch } from 'react-redux'
import { appendAnec } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleCreate = e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(appendAnec(content))
        dispatch(setNoti(`You created "${content}"`))
        setTimeout(() => {
            dispatch(setNoti(null))
        }, 5000)
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