/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  fetchTasks,
  deleteTask,
  updateTask,
} from "../thunks/task.thunk";

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
      state.tasks = action.payload.map((task) => {
        return {
          startDate: new Date(task.start_date),
          endDate: new Date(task.end_date),
          title: task.name,
          id: task.id,
        };
      });
      state.loading = false;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    //DELETE TASK
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      state.loading = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    //UPDATE TASK
  },
});

export const { setTask, setTasks } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
