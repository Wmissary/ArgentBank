import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/api";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {
      firstName: null,
      lastName: null,
    },
    token: null,
  },
  reducers: {
    logoutUser: state => {
      state.user = {
        firstName: null,
        lastName: null,
      };
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.body.token;
    });
    builder.addMatcher(api.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
      state.user = { firstName: payload.body.firstName, lastName: payload.body.lastName };
    });
    builder.addMatcher(api.endpoints.updateName.matchFulfilled, (state, { payload }) => {
      state.user = { firstName: payload.body.firstName, lastName: payload.body.lastName };
    });
  },
});

export default slice.reducer;

export const { logoutUser } = slice.actions;
