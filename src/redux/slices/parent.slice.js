import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllKids,
  fetchTaskByKid,
  createKid,
} from "../thunks/parent.thunk";

const parentSlice = createSlice({
  name: "parent",
  initialState: {
    kids: [],
    kidTasks: [],
    loading: true,
    error: false,
    message: "",
    kid: {
      openModal: false,
    },
  },
  reducers: {
    setKids: (state, action) => {
      state.kids = action.payload;
    },
    toggleKidModal: (state, action) => {
      state.kid.openModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllKids.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllKids.fulfilled, (state, action) => {
      state.kids = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllKids.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    // FETCH TASK BY KID
    builder.addCase(fetchTaskByKid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTaskByKid.fulfilled, (state, action) => {
      state.kidTasks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTaskByKid.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    // CREATE KID
    builder.addCase(createKid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createKid.fulfilled, (state, action) => {
      state.kids.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createKid.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const parentReducer = parentSlice.reducer;
export const { setKids , toggleKidModal} = parentSlice.actions;
