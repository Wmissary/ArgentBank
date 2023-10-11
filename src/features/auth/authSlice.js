import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/api";

import { getTokenFromStorage } from "../../app/utils/storage";

const checkIfAuth = token => (token ? true : false);

const initialState = {
  token: getTokenFromStorage(),
  isAuth: checkIfAuth(getTokenFromStorage()),
  lastAuthPageVisitedBeforeLogin: null,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, { token }) => {
      state.token = token;
      state.isAuth = true;
    },
    logout: state => {
      state.token = null;
      state.isAuth = false;
    },
    setLastAuthPageVisitedBeforeLogin: (state, { payload }) => {
      state.lastAuthPageVisitedBeforeLogin = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      slice.caseReducers.login(state, { token: payload.body.token });
    });
    builder.addMatcher(api.endpoints.getProfile.matchRejected, state => {
      slice.caseReducers.logout(state);
    });
    builder.addMatcher(api.endpoints.updateName.matchRejected, state => {
      slice.caseReducers.logout(state);
    });
  },
});

export default slice.reducer;

export const { login, logout, setLastAuthPageVisitedBeforeLogin } = slice.actions;
