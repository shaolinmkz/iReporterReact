import modifyReducer from "../../../redux/reducers/modifyRecordReducer";
import { EDIT_LOADING, STOP_EDIT_LOADING, DELETE_RECORD} from "../../../redux/actionTypes";

describe("Unit test the modify reducer", () => {

  const initialState = {};
  it("Should test all the action types using mock payloads", () => {
    const type = EDIT_LOADING;
    modifyReducer(initialState, { type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = STOP_EDIT_LOADING;
    modifyReducer(initialState, { type });
  });

  it("Should test all the action types using mock payloads", () => {
    const type = DELETE_RECORD;
    modifyReducer(initialState, { type });
  });
});

