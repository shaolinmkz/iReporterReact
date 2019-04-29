import { EDIT_LOADING, STOP_EDIT_LOADING, DELETE_RECORD } from "../actionTypes";

/**
 * @description function to return initial state
 * @returns {object} the initial state
 */
export const initialState = {
  editLoading: false
};

/**
 * @description handles the modify reducer
 * @param {object} state
 * @param {object} actionType
 * @return {undefined}
 */
const modifyReducer = (state = initialState, { type }) => {
  switch (type) {
  case EDIT_LOADING:
    return {
      ...state,
      editLoading: true
    };
  case DELETE_RECORD:
    return {
      ...state,
      editLoading: false
    };
  case STOP_EDIT_LOADING:
    return {
      ...state,
      editLoading: false
    };
  default:
    return state;
  }
};

export default modifyReducer;
