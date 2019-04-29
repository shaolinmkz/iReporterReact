import modalReducer from "../../../redux/reducers/modalReducer";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../redux/actionTypes";

describe("Unit test the modal reducer", () => {

  const initialState = {};
  it("Should test all the action types using mock payloads", () => {
    const type = OPEN_MODAL;
    modalReducer(initialState, { type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = CLOSE_MODAL;
    modalReducer(initialState, { type });
  });
});

