import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/api";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    logoutUser: state => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.body.token;
    });
  },
});

export default slice.reducer;

export const { logoutUser } = slice.actions;
