/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "../thunks/user.thunk";

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "user",
  initialState: { user: null, tab:"", loading: true, error: false },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setUser, setTab } = userSlice.actions;
export const userReducer = userSlice.reducer;
