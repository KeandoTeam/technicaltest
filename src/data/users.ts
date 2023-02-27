import { createAsyncThunk, createSlice, bindActionCreators, PayloadAction } from '@reduxjs/toolkit'
import { useRef } from 'react'
import { useAppDispatch } from '../redux/hooks'
import CustomApiProvider from '../services/CustomApiProvider'
import { Endpoints } from '../utils/endpoints'

export interface ParkUser {
    uid: string
    firstName: string
    lastName?: string
    picture?: string
    phone: number
    id: number
    email?: string
    country?: string
    state?: string
    city?: string
    address?: string
    birthday?: string
    mainRol:string
    companyRol: string
    workingIn?: string[]
    modules: any[]
    badge: string[]
}

export interface ParkUsersState {
    parkUsers?: ParkUser[]
}

const initialState: ParkUsersState = {
    parkUsers:[]
}

//User Reducer
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      reset: () => initialState,
      setParkUsers: (state: ParkUsersState, action: PayloadAction<ParkUser[]>) => {
        state.parkUsers = action.payload;
      }
    },
    extraReducers: builder => {}
})

export const getParkUsers = ():Promise<ParkUser[]> =>  {
  return new Promise((resolve,reject)=>{
    return CustomApiProvider.get(Endpoints.displayUsers).then((results)=> {
      resolve(results as ParkUser[])
    }).catch((e)=>reject(e));
  })
}

//Custom hook
export function useUsersActions() {
    const dispatch = useAppDispatch()
    const actions = {
      ...usersSlice.actions,
    }
    const refActions = useRef(bindActionCreators(actions, dispatch))
    return refActions.current
}