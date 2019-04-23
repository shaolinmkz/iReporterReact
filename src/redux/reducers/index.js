import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import recordReducer from "./recordReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  authData: authReducer,
  userData: userReducer,
  recordData: recordReducer,
  modalData: modalReducer
});

export default rootReducer;
