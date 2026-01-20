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

const { setNoti } = notificationSlice.actions

export const setNotification = (msg, time) => {
    return async (dispatch) => {
        dispatch(setNoti(msg))
        setTimeout(() => {
            dispatch(setNoti(null))
        }, time*1000)
    }
}

export default notificationSlice.reducer