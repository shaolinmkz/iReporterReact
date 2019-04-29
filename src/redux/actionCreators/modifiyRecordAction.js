import "babel-polyfill";
import { patch } from "axios";
import { toast, ToastType } from "react-toastify";
import notifyUser from "../../components/Toast.jsx";
import { interventionURL as incidentURL } from "./endPoints";
import {
  EDIT_LOADING,
  STOP_EDIT_LOADING
} from "../actionTypes";

/**
 * @description function for creating an action for edit loading
 * @param {object} actionType
 * @returns {object} action
 */
export const editLoadingAction = () => ({
  type: EDIT_LOADING
});

/**
 * @description function to stop edit loading
 * @param {object} actionType
 * @returns {object} action
 */
export const stopEditLoadingAction = () => ({
  type: STOP_EDIT_LOADING
});

/**
 * @description function for dispatching action for edit location
 * @param {object} RecordRequestObject - record data
 * @param {number} recordId - record id
 * @param {string} token - token
 * @returns {object} action
 */
export const editLocationAction = async (
  RecordRequestObject,
  recordId,
  token
) => {
  try {
    await patch(`${incidentURL}/${recordId}/location`, RecordRequestObject, {
      headers: {
        Authorization: token
      }
    });
    localStorage.setItem('updated', 'true');
    window.location.assign(`/record/${recordId}`);

  } catch (err) {
    const { error } = err.response.data;
    toast(notifyUser(error), { type: ToastType.ERROR });
    return {
      type: STOP_EDIT_LOADING
    };
  }
};

/**
 * @description function for dispatching action for edit comment
 * @param {object} RecordRequestObject - record data
 * @param {number} recordId - record id
 * @param {string} token - token
 * @returns {object} action
 */
export const editCommentAction = async (
  RecordRequestObject,
  recordId,
  token
) => {
  try {
    await patch(`${incidentURL}/${recordId}/comment`, RecordRequestObject, {
      headers: {
        Authorization: token
      }
    });
    localStorage.setItem('updated', 'true');
    window.location.assign(`/record/${recordId}`);

  } catch (err) {
    const { error } = err.response.data;
    toast(notifyUser(error), { type: ToastType.ERROR });
    return {
      type: STOP_EDIT_LOADING
    };
  }
};
