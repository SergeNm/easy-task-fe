/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchSignup } from "../thunks/user.thunk";

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    snackbar: {
      showSnackbar: false,
      message: "",
      severity: "",
    },
    tab: "",
    loading: true,
    error: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    toggleSnackbar: (state, action) => {
      state.snackbar.showSnackbar = action.payload.showSnackbar;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    //Signup
    builder.addCase(fetchSignup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSignup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSignup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { setUser, setTab, toggleSnackbar } = userSlice.actions;
export const userReducer = userSlice.reducer;
