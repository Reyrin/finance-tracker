import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User } from "../../app/types";
import { authApi } from "../../app/services/auth";

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const setUser = (
  state: AuthState,
  { payload }: { payload: { user: User } },
) => {
  state.user = payload.user;
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    const matchers = [
      authApi.endpoints.login.matchFulfilled,
      authApi.endpoints.registration.matchFulfilled,
      authApi.endpoints.checkToken.matchFulfilled,
    ];

    matchers.forEach((matcher) => {
      builder.addMatcher(matcher, setUser);
    });
  },
});

export const { logOut } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
