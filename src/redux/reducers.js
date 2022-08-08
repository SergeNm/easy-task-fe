import { parentReducer } from "./slices/parent.slice";
import { taskReducer } from "./slices/task.slice";
import { userReducer } from "./slices/user.slice";

const reducers = {
  user: userReducer,
  task: taskReducer,
  parent: parentReducer
};

export default reducers;
