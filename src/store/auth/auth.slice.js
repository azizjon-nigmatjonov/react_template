import { createSlice } from "@reduxjs/toolkit"


export const {
  actions: authActions,
  reducer: authReducer
} = createSlice({
  name: "auth",
  initialState: {
    isAuth: true
  },
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
    }
  }
})