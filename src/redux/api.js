import axios from "axios";

export const api = axios.create({
  baseURL: "https://easy-tasks-be.herokuapp.com/api/v1",
});