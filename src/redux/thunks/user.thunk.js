import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const fetchLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
