import { combineReducers } from "redux";
import userReducer from './userReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  authData: authReducer,
  userData: userReducer,
});

export default rootReducer;
