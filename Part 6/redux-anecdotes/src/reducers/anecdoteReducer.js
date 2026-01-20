import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      const content = action.payload
      state.push(asObject(content))
    },
    vote(state, action) {
      const id = action.payload
      const anecChange = state.find(a => a.id === id)
      const newAnec = {...anecChange, votes: anecChange.votes+1}
      return state.map(a => a.id===id ? newAnec : a)
    },
    setAnec(state, action) {
      return action.payload
    }
  }
})

export const { create, vote, setAnec } = anecdoteSlice.actions

export default anecdoteSlice.reducer
