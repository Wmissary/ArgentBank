import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/api";

import {
  getTokenFromStorage,
  setTokenInStorage,
  removeTokenFromStorage,
  getUserFromStorage,
  setUserInStorage,
  removeUserFromStorage,
} from "../../app/utils/storage";

const rememberMe = localStorage.getItem("token") ? true : false;

const initialState = {
  user: JSON.parse(getUserFromStorage(rememberMe)) ?? {
    firstName: null,
    lastName: null,
  },
  token: getTokenFromStorage(rememberMe) ?? null,
  rememberMe: rememberMe,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser: state => {
      state.user = {
        firstName: null,
        lastName: null,
      };
      state.token = null;
      removeTokenFromStorage(state.rememberMe);
      removeUserFromStorage(state.rememberMe);
    },
    rememberUser: (state, { payload }) => {
      state.rememberMe = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.body.token;
      setTokenInStorage(state.rememberMe, payload.body.token);
    });
    builder.addMatcher(api.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
      state.user = { firstName: payload.body.firstName, lastName: payload.body.lastName };
      setUserInStorage(state.rememberMe, JSON.stringify(state.user));
    });
    builder.addMatcher(api.endpoints.updateName.matchFulfilled, (state, { payload }) => {
      state.user = { firstName: payload.body.firstName, lastName: payload.body.lastName };
      setUserInStorage(state.rememberMe, JSON.stringify(state.user));
    });
  },
});

export default slice.reducer;

export const { logoutUser, rememberUser } = slice.actions;
