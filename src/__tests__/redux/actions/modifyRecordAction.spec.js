import moxios from "moxios";
import sinon from "sinon";
import {
  editLoadingAction,
  stopEditLoadingAction,
  editLocationAction,
  editCommentAction
} from "../../../redux/actionCreators/modifiyRecordAction";
import HelperUtils from "../../../utils/helperUtils";

describe("modify record actions", () => {
  it("should start edit loading", () => {
    expect(editLoadingAction()).toEqual({ type: "EDIT_LOADING" });
  });
  it("should stop edit loading", () => {
    expect(stopEditLoadingAction()).toEqual({ type: "STOP_EDIT_LOADING" });
  });
});

describe("modify record location actions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should start edit loading", async () => {
    const expectedResponse = { message: "mock response" };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    const RecordRequestObject = { location: "1.234243, -113.424224" };
    const recordId = 2;
    const token = HelperUtils.generateToken({ id: 2 });

    sinon.stub(localStorage, "setItem");
    sinon.stub(window.location, "assign");
    await editLocationAction(RecordRequestObject, recordId, token);
  });

  it("should start edit loading", async () => {
    const expectedResponse = { message: "mock response" };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: expectedResponse });
    });

    const RecordRequestObject = { location: "1.234243, -113.424224" };
    const recordId = 2;
    const token = HelperUtils.generateToken({ id: 2 });

    await editLocationAction(RecordRequestObject, recordId, token);
  });
});

describe("modify record comment actions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should start edit loading", async () => {
    const expectedResponse = { message: "mock response" };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    const RecordRequestObject = { location: "1.234243, -113.424224" };
    const recordId = 2;
    const token = HelperUtils.generateToken({ id: 2 });

    await editCommentAction(RecordRequestObject, recordId, token);
  });

  it("should start edit loading", async () => {
    const expectedResponse = { message: "mock response" };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });

    const RecordRequestObject = { location: "1.234243, -113.424224" };
    const recordId = 2;
    const token = HelperUtils.generateToken({ id: 2 });

    await editCommentAction(RecordRequestObject, recordId, token);
  });
});
