import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'noti',
    initialState: null,
    reducers:{
        setNoti(state, action){
            return action.payload
        }
    }
})

export const { setNoti } = notificationSlice.actions

export default notificationSlice.reducer