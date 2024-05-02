import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userData/userSlice'

export const store = configureStore({
    reducer: {
        users: userReducer
    }
})