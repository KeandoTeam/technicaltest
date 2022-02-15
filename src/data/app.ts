import { createAsyncThunk, createSlice, bindActionCreators, PayloadAction } from '@reduxjs/toolkit'
import { useRef } from 'react'
import { useAppDispatch } from '../redux/hooks'
import CustomApiProvider from '../services/CustomApiProvider'
import { Endpoints } from '../utils/endpoints'
import { Strings } from '../utils/strings'

//User types

export interface User {
    uid: string;
    email: string;
}

export interface AppState {
    user?: User
    error?: string
    loading?: boolean
}

const initialState: AppState = {
    user: undefined,
    error: '',
    loading: false
}

//User Reducer
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      reset: () => initialState,
      clearError: (state: AppState, action: PayloadAction) => {
        state.error = '';
      },
      setError: (state: AppState, action: PayloadAction<string>) => {
        state.error = action.payload;
      },
      logOut: (state: AppState, action: PayloadAction) => {
        state.user = undefined;
      },
      setLoading: (state: AppState, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
    },
    extraReducers: builder => {
      builder.addCase(loginUser.pending, state => {
        state.error = ''
        state.loading = true
        state.user = undefined
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload?.user || undefined
        state.error = state.user === undefined ? Strings.userError : ''
      }),
      builder.addCase(loginUser.rejected, state => {
        state.loading = false
        state.user = state.user
        state.error = state.user === undefined ? Strings.userError : ''
      })
  }
})

export interface Credentials{
  email:string
  password:string
}

export const loginUser = createAsyncThunk('app/loginUser',async (credentials: Credentials) => {
  try{
    const authUsers = await CustomApiProvider.get(Endpoints.loginUsers) as any[];
    const foundUser = authUsers && authUsers.filter(({email, password})=> email === credentials.email && credentials.password)[0] as User;
    return { user: foundUser }
  }catch(e){
    console.error(`${e}`)
    return { error: `${e}` }
  }
});

//Custom hook
export function useAppActions() {
    const dispatch = useAppDispatch()
    const actions = {
      ...appSlice.actions,
      loginUser,
    }
    const refActions = useRef(bindActionCreators(actions, dispatch))
    return refActions.current
}