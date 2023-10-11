import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/api";
import { logout } from "../auth/authSlice";

import { getUserFromStorage } from "../../app/utils/storage";

const { firstName, lastName } = JSON.parse(getUserFromStorage());

const initialState = {
  firstName,
  lastName,
};

const slice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setName(state, { firstName, lastName }) {
      state.firstName = firstName;
      state.lastName = lastName;
    },
    clearName: state => {
      state.firstName = null;
      state.lastName = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, state => {
      slice.caseReducers.clearName(state);
    });
    builder.addMatcher(api.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
      slice.caseReducers.setName(state, { firstName: payload.body.firstName, lastName: payload.body.lastName });
    });
    builder.addMatcher(api.endpoints.updateName.matchFulfilled, (state, { payload }) => {
      slice.caseReducers.setName(state, { firstName: payload.body.firstName, lastName: payload.body.lastName });
    });
  },
});

export default slice.reducer;
