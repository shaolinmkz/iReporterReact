import { OPEN_MODAL, CLOSE_MODAL } from "../actionTypes";

const initialState = {
  modalDisplay: "none"
};
/**
 * @description handles the modal state
 * @param {object} state
 * @param {object} action
 * @return {undefined}
 */
const modalReducer = (state = initialState, { type }) => {
  switch (type) {
  case OPEN_MODAL:
    return {
      ...state,
      modalDisplay: "block"
    };
  case CLOSE_MODAL:
    return {
      ...state,
      modalDisplay: "none"
    };
  default:
    return state;
  }
};

export default modalReducer;
