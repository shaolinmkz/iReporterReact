import { OPEN_MODAL, CLOSE_MODAL } from "../actionTypes";

/**
 * @description function for the open modal action
 * @returns {object} action
 */
export const openModalAction = () => ({ type: OPEN_MODAL });

/**
 * @description function for the close modal action
 * @param {object} actionType
 * @returns {object} action
 */
export const closeModalAction = () => ({ type: CLOSE_MODAL });
