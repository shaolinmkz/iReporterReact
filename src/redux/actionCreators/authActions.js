import "babel-polyfill";
import { post } from "axios";
import { toast, ToastType } from "react-toastify";
import notifyUser from "../../components/Toast.jsx";
import { loginURL, signupURL } from "./endPoints";
import { AUTH_USER, AUTH_LOADING, STOP_LOADING } from "../actionTypes";



/**
 * @description function for creating an action for loading
 * @param {object} actionType
 * @returns {object} action
 */
export const authLoading = () => ({ type: AUTH_LOADING });


/**
 * @description function for craeting a stopping action the loading action
 * @param {object} actionType
 * @returns {object} action
 */
export const stopLoading = () => ({ type: STOP_LOADING });


/**
 * @description function for storing platform data in localStorage
 * @param {object} token the user details to be stored in local storage
 * @param {string} user the user details to be stored in local storage
 * @param {object} localStorage the local storage to be used ( to be mocked for testing )
 * @returns {undefined}
 */
export const storeInLocal = (token, user, localStorage) => {
  localStorage.token = token;
  localStorage.user = JSON.stringify(user);
  localStorage.isLoggedIn = true
};

/**
 * @description function for dispatching action for logging in user
 * @param {object} loginRequestObject - user input
 * @returns {object} action
 */
export const authUserLoginAction = async loginRequestObject => {
  try {
    const response = await post(loginURL, loginRequestObject);
    // destructuring response object
    const { user, token } = response.data.data[0];

    // saving to local storage
    storeInLocal(token, user, localStorage);

    // return action type and payload to reducer
    return {
      type: AUTH_USER,
      payload: { user, token }
    };
  } catch (err) {
    const { error } = err.response.data;
    toast(notifyUser(error), { type: ToastType.ERROR });
    return {
      type: STOP_LOADING
    };
  }
};

/**
 * @description function for creating action for signing up a user
 * @param {object} signupRequestObject - users input
 * @returns {object} action
 */
export const authUserSignupAction = async signupRequestObject => {
  try {
    const response = await post(signupURL, signupRequestObject);
    // destructuring response object
    const { user, token } = response.data.data[0];

    // saving to local storage
    storeInLocal(token, user, localStorage);

    // return action type and payload to reducer
    return {
      type: AUTH_USER,
      payload: { user, token }
    };
  } catch (err) {
    const { error } = err.response.data;
    toast(notifyUser(error), { type: ToastType.ERROR });
    return {
      type: STOP_LOADING
    };
  }
};
