import {
  GENERAL_LOADING,
  SAVE_GEOLOCATION,
  CLEAR_GENERAL_LOADING,
  STOP_GENERAL_LOADING,
  CREATE_NEW_RECORD
} from "../actionTypes";

/**
 * @description function to return initial state
 * @param {object} localStorage the local storage to query (to be mocked for testing)
 * @returns {object} the initial state
 */
export const initialState = {
  generalLoading: false,
  lat: 6.465422,
  lng: 3.406448,
  RecordId: ''
};

/**
 * @description handles the record reducer
 * @param {object} state
 * @param {object} actionTypeAndPayload
 * @return {undefined}
 */
const recordReducer = (state = initialState, { payload, type }) => {
  switch (type) {
  case GENERAL_LOADING:
    return {
      ...state,
      generalLoading: true
    };
  case CLEAR_GENERAL_LOADING:
    return {
      ...state,
      generalLoading: false
    };
  case STOP_GENERAL_LOADING:
    return {
      ...state,
      generalLoading: false
    };
  case SAVE_GEOLOCATION:
    return {
      ...state,
      lat: payload.lat,
      lng: payload.lng
    };
  case CREATE_NEW_RECORD:
    return {
      ...state,
      RecordId: payload.id,
      generalLoading: false
    };
  default:
    return state;
  }
};

export default recordReducer;
