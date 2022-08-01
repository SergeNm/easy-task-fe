import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

const token = localStorage.getItem("token");

export const createTask = createAsyncThunk(
  "task/create",
  async ({ name, start_date, end_date }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/tasks",
        {
          name,
          start_date,
          end_date,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "task/fetch",
  async (thunkApi, { rejectWithValue }) => {
    try {
      const response = await api.get("/tasks", {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
