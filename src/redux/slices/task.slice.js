/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { createTask, fetchTasks } from "../thunks/task.thunk";

const taskSlice = createSlice({
  name: "createTask",
  initialState: { tasks: null, task: null, loading: true, error: false },
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    //CREATE TASK
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.task = action.payload;
      state.loading = false;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    //FETCH TASKS
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setTask, setTasks } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
