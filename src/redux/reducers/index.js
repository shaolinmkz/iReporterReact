import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import recordReducer from "./recordReducer";

const rootReducer = combineReducers({
  authData: authReducer,
  userData: userReducer,
  recordData: recordReducer
});

export default rootReducer;
