import { toast, ToastType } from "react-toastify";
import { AUTH_USER, LOGOUT_USER } from "../actionTypes";
import notifyUser from "../../components/Toast.jsx";
import HelperUtils from "../../utils/helperUtils";

/**
 * @description function to return initial state
 * @param {object} localStorage the local storage to query (to be mocked for testing)
 * @returns {object} the initial state
 */
export const initialState = localStorage => ({
  user: localStorage.getItem("user") || "",
  isAdmin: HelperUtils.verifyToken(localStorage.getItem("token")).isAdmin,
  token: localStorage.getItem("token") || "",
  isLoggedIn: !!HelperUtils.verifyToken(localStorage.getItem("token"))
});

/**
 * @description handles the login on change
 * @param {object} state
 * @param {object} action
 * @return {undefined}
 */
const userReducer = (state = initialState(localStorage), { payload, type }) => {
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
