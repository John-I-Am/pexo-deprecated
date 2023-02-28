/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceStatus = "idle" | "loading" | "succeeded" | "failed"

interface UserState {
  token: string;
  id: string;
  status: SliceStatus;
}

const userSlice = createSlice({
  name: "users",
  initialState: {
    token: "",
    id: "",
  } as UserState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<any>) {
      state.token = action.payload.token;
      state.id = action.payload.userId;
    },
    clearUser() {
      window.localStorage.clear();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
