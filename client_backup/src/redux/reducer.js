import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: ""
  },
  token: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { setLogin, setLogout, setUser } =
  appSlice.actions;
export default appSlice.reducer;
