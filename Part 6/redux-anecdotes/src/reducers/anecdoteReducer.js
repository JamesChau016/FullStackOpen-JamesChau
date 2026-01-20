import { createSlice } from '@reduxjs/toolkit'
import services from '../services/anecdotes'

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

const { setAnec, create } = anecdoteSlice.actions

export const initializeAnec = () => {
  return async (dispatch) => {
    const anecdotes = await services.getAll()
    dispatch(setAnec(anecdotes))
  }
}

export const appendAnec = (content) => {
  return async (dispatch) => {
    await services.create(content)
    dispatch(create(content))
  }
}

export const { vote } = anecdoteSlice.actions

export default anecdoteSlice.reducer