import { AUTH_LOADING, STOP_LOADING, AUTH_USER } from "../actionTypes";

/**
 * @description function to return initial state
 * @returns {object} the initial state
 */
export const initialState = { loading: false };

/**
 * @description handles the login on change
 * @param {object} state
 * @param {object} action
 * @return {undefined}
 */
const authReducer = (state = initialState, { type }) => {
  switch (type) {
  case AUTH_LOADING:
    return {
      ...state,
      loading: true
    };
  case STOP_LOADING:
    return {
      ...state,
      loading: false
    };
  case AUTH_USER:
    return {
      ...state,
      loading: false
    }
  default:
    return state;
  }
};

export default authReducer;
