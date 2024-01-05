import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateAdminStart: (state) => {
      state.loading = true;
    },
    updateAdminSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteAdminStart: (state) => {
      state.loading = true;
    },
    deleteAdminSuccess: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
    },
    deleteAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateAdminStart,
  updateAdminSuccess,
  updateAdminFailure,
  deleteAdminStart,
  deleteAdminSuccess,
  deleteAdminFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = adminSlice.actions;
export default adminSlice.reducer;
