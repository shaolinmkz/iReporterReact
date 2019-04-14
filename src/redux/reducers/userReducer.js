import { toast, ToastType } from "react-toastify";
import { AUTH_USER, LOGOUT_USER } from "../actionTypes";
import notifyUser from "../../components/Toast.jsx";

/**
 * @description function to return initial state
 * @param {object} localStorage the local storage to query (to be mocked for testing)
 * @returns {object} the initial state
 */
export const initialState = {
  user: localStorage.getItem('user') || "",
  token: localStorage.getItem('token') || "",
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false
};

/**
 * @description handles the login on change
 * @param {object} state
 * @param {object} action
 * @return {undefined}
 */
const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
  case AUTH_USER:
    toast(notifyUser("LOGIN SUCCESSFUL"), { type: ToastType.SUCCESS });
    return {
      ...state,
      user: payload.user,
      token: payload.token,
      isLoggedIn: true
    };
  case LOGOUT_USER:
    toast(notifyUser("LOGOUT SUCCESSFUL"), { type: ToastType.INFO });
    localStorage.clear();
    return {
      ...state,
      user: "",
      token: "",
      isLoggedIn: false
    };
  default:
    return state;
  }
};

export default userReducer;
