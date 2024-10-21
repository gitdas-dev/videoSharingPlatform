import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.token = action.payload.token;
      sessionStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.token = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.token = null;
      sessionStorage.clear();
    },
    subscribe: (state, action) => {
      if (
        !state.currentUser ||
        !Array.isArray(state.currentUser.others.subscribedUsers)
      ) {
        return;
      }

      const isSubscribed = state.currentUser.others.subscribedUsers.includes(
        action.payload
      );

      if (isSubscribed) {
        // Unsubscribe
        const index = state.currentUser.others.subscribedUsers.findIndex(
          (currUser) => currUser === action.payload
        );
        if (index !== -1) {
          state.currentUser.others.subscribedUsers.splice(index, 1);
        }
      } else {
        // Subscribe
        state.currentUser.others.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { loginFailure, loginStart, loginSuccess, logout, subscribe } =
  userSlice.actions;

export default userSlice.reducer;
