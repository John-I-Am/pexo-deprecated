import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/users/usersSlice";
import deckReducer from "./features/decks/decksSlice";
import { apiSlice } from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    user: usersReducer,
    decks: deckReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
