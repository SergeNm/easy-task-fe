import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const fetchAllKids = createAsyncThunk(
  "user/getAllKids",
  async (thunkApi, { rejectWithValue }) => {
    try {
      const response = await api.get("/parent/kid", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskByKid = createAsyncThunk(
  "task/getTaskByKid",
  async (kidId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/parent/${kidId}/tasks`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createKid = createAsyncThunk(
  "user/createKid",
  async ({ fullname, email, phone, password }, { rejectWithValue }) => {
    const tel = "0" + phone.toString();
    try {
      const response = await api.post(
        "/kids",
        {
          fullname,
          email,
          password,
          phone:tel,  
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
