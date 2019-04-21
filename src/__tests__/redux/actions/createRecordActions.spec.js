import moxios from "moxios";
import {
  dispatchGeolocationAction,
  generalLoadingAction,
  stopGeneralLoadingAction,
  redflagCreatenAction,
  interventionCreateAction
} from "../../../redux/actionCreators/createRecordAction";

describe("Test the auth action creators for create record", () => {
  it("Should test the synchronous actions", () => {
    expect(Boolean(dispatchGeolocationAction())).toBe(true);
    expect(Boolean(generalLoadingAction())).toBe(true);
    expect(Boolean(stopGeneralLoadingAction())).toBe(true);
  });
});

describe("user signUp", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should sign up a user", async () => {
    const mockRequest = {
      mockData: "mock data"
    };

    const expectedResponse = {
      data: [
        {
          mockData: "mock data"
        }
      ]
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: expectedResponse });
    });

    const result = await redflagCreatenAction(mockRequest);
    expect(result.type).toEqual("CREATE_NEW_RECORD");
  });
});

describe("user Login", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should login a user", async () => {
    const mockRequest = {
      mockData: "mock data"
    };

    const expectedResponse = {
      data: [
        {
          mockData: "mock data"
        }
      ]
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    const result = await interventionCreateAction(mockRequest);
    expect(result.type).toEqual("CREATE_NEW_RECORD");
  });

  it("should return the ERROR action when there is a descriptive error in login", async () => {
    const mockRequest = {
      mockData: "mock data"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { error: "title is required" }
      });
    });
    await redflagCreatenAction(mockRequest);
  });

  it("should return the ERROR action when there is a descriptive error in signup", async () => {
    const mockRequest = {
      mockData: "mock data"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { error: "location is required" }
      });
    });
    await interventionCreateAction(mockRequest);
  });
});
