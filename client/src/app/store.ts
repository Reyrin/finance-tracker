import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer from "../features/auth/authSlice";
import { listenerMiddleware } from "./middleware/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
