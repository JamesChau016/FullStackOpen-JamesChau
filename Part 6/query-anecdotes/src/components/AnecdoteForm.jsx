import { useContext } from 'react'
import NotiContext from '../NotiContext'

const AnecdoteForm = ({newAnecMutation}) => {
  const { notiDispatch } = useContext(NotiContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({content, votes: 0})
    notiDispatch({
      type: 'SET_NOTI',
      payload: `You created "${content}"`
    })
  }

  

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
