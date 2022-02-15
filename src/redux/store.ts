import { configureStore } from '@reduxjs/toolkit'
import { usersSlice } from '../data/users'
import { appSlice } from '../data/app'

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    users: usersSlice.reducer
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
