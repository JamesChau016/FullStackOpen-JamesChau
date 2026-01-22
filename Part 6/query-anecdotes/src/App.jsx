import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createNew, voteAnec } from './services/anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotiContext from './NotiContext'



const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const newAnecMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnec) => {
      const anecdoteList = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdoteList.concat(newAnec))
    },
    onError: () => {
      notiDispatch({
        type: 'SET_NOTI',
        payload: `too short anecdote, must have length 5 or more`
      })
    }
  })

  const voteMutation = useMutation({
    mutationFn: voteAnec,
    onSuccess: (anecdote) => {
      const anecdoteList = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdoteList.map(a => a.id === anecdote.id ? anecdote : a))
    }
  })

  const { noti, notiDispatch } = useContext(NotiContext)
  

  if (result.isLoading){
    return <div>Loading data...</div>
  }
  else if (result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }
  
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    const newAnec = {...anecdote, votes: anecdote.votes+1}
    voteMutation.mutate(newAnec)
    notiDispatch({
      type: 'SET_NOTI',
      payload: `You voted for "${anecdote.content}"`
    })
  }

  return (
    <NotiContext.Provider value={{noti, notiDispatch}}>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecMutation={newAnecMutation}/>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </NotiContext.Provider>
  )
}

export default App
