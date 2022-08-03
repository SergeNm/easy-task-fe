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
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, name, start_date, end_date }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/tasks/${id}`,
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

export const deleteTask = createAsyncThunk(
  "task/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return { data: response.data, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
