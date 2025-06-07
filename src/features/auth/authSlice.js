import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};

const initialState = {
  user: storedAuth.user || null,
  role: storedAuth.role || null,
  isAuthenticated: storedAuth.isAuthenticated || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          role: state.role,
          isAuthenticated: state.isAuthenticated,
        })
      );
    },
    logout() {
      localStorage.removeItem("auth");
      return {
        user: null,
        role: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
