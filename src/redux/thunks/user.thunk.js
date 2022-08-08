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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "user/signup",
  async ({ email, password, fullname, phone }, { rejectWithValue }) => {
    try {
      const tel = "0" + phone.toString();
      const response = await api.post("/users", {
        email,
        password,
        fullname,
        phone: tel,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
