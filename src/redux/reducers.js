import { taskReducer } from "./slices/task.slice";
import { userReducer } from "./slices/user.slice";

const reducers = {
  user: userReducer,
  task: taskReducer,
};

export default reducers;
