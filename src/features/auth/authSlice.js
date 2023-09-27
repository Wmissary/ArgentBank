import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/api";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.body.token;
    });
  },
});

export default slice.reducer;

export const selectCurrentUser = state => state.auth.user;
