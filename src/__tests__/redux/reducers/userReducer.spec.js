import userReducer from "../../../redux/reducers/userReducer";
import authReducer from "../../../redux/reducers/authReducer";
import recordReducer from "../../../redux/reducers/recordReducer";
import {
  AUTH_USER,
  LOGOUT_USER,
  AUTH_LOADING,
  STOP_LOADING,
  GENERAL_LOADING,
  CLEAR_GENERAL_LOADING,
  STOP_GENERAL_LOADING,
  SAVE_GEOLOCATION,
  CREATE_NEW_RECORD
} from "../../../redux/actionTypes";

describe("Unit test the user reducer", () => {
  const payload = {
    user: {},
    token: "xyz"
  };

  const initialState = {};
  it("Should test all the action types using mock payloads", () => {
    const type = AUTH_USER;
    userReducer(initialState, { payload, type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = LOGOUT_USER;
    userReducer(initialState, { payload, type });
  });
});

describe("Unit test the auth reducer", () => {
  const payload = {
    user: {},
    token: "xyz"
  };

  const initialState = {};
  it("Should test all the action types using mock payloads", () => {
    const type = AUTH_LOADING;
    authReducer(initialState, { payload, type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = STOP_LOADING;
    authReducer(initialState, { payload, type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = AUTH_USER;
    authReducer(initialState, { payload, type });
  });
});

describe("Unit test the record reducer with mock data", () => {
  const payload = {
    user: {},
    token: "xyz"
  };

  const initialState = {};
  it("Should test all the action types using mock payloads", () => {
    const type = GENERAL_LOADING;
    recordReducer(initialState, { payload, type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = CLEAR_GENERAL_LOADING;
    recordReducer(initialState, { payload, type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = STOP_GENERAL_LOADING;
    recordReducer(initialState, { payload, type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = SAVE_GEOLOCATION;
    recordReducer(initialState, { payload, type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = CREATE_NEW_RECORD;
    recordReducer(initialState, { payload, type });
  });
});
