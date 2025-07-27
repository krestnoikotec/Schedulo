import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  username: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  uid: null,
  email: null,
  username: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        username: string;
      }>,
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      state.uid = null;
      state.email = null;
      state.username = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
