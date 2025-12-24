import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "auth",
  initialState: {
    auth: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const { setAuth, logout } = userReducer.actions;
export default userReducer.reducer;
