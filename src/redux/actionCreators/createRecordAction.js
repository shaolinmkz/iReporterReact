import "babel-polyfill";
import { post } from "axios";
import { Redirect } from "react-router-dom";
import { toast, ToastType } from "react-toastify";
import notifyUser from "../../components/Toast.jsx";
import { interventionURL, redflagURL } from "./endPoints";
import {
  GENERAL_LOADING,
  SAVE_GEOLOCATION,
  CLEAR_GENERAL_LOADING,
  CREATE_NEW_RECORD,
  STOP_GENERAL_LOADING
} from "../actionTypes";

/**
 * @description function for creating an action for loading
 * @param {object} payload
 * @returns {object} action
 */
export const dispatchGeolocationAction = payload => ({
  type: SAVE_GEOLOCATION,
  payload
});

/**
 * @description function for creating an action for general loading
 * @param {object} actionType
 * @returns {object} action
 */
export const generalLoadingAction = () => ({
  type: GENERAL_LOADING
});

/**
 * @description function to stop general loading
 * @param {object} actionType
 * @returns {object} action
 */
export const stopGeneralLoadingAction = () => ({
  type: STOP_GENERAL_LOADING
});

/**
 * @description function for dispatching action for creating records
 * @param {object} RecordRequestObject - record data
 * @returns {object} action
 */
export const redflagCreatenAction = async RecordRequestObject => {
  const token = localStorage.getItem("token");
  try {
    const response = await post(redflagURL, RecordRequestObject, {
      headers: {
        Authorization: token
      }
    });
    // destructuring response object
    const { message, id } = response.data.data[0];

    toast(notifyUser(message), { type: ToastType.SUCCESS });

    window.location.assign(`/record/${id}`);
    // return action type and payload to reducer
    return {
      type: CREATE_NEW_RECORD,
      payload: { id }
    };
  } catch (err) {
    const { error } = err.response.data;
    toast(notifyUser(error), { type: ToastType.ERROR });
    return {
      type: CLEAR_GENERAL_LOADING
    };
  }
};

/**
 * @description function for dispatching action for creating records
 * @param {object} RecordRequestObject - record data
 * @returns {object} action
 */
export const interventionCreateAction = async RecordRequestObject => {
  const token = localStorage.getItem("token");
  try {
    const response = await post(interventionURL, RecordRequestObject, {
      headers: {
        Authorization: token
      }
    });

    // destructuring response object
    const { message, id } = response.data.data[0];

    toast(notifyUser(message), { type: ToastType.SUCCESS });
  
    window.location.assign(`/record/${id}`);
    // return action type and payload to reducer
    return {
      type: CREATE_NEW_RECORD,
      payload: { id }
    };
  } catch (err) {
    const { error } = err.response.data;
    toast(notifyUser(error), { type: ToastType.ERROR });
    return {
      type: CLEAR_GENERAL_LOADING
    };
  }
};
