import moxios from "moxios";
import {
  authLoading,
  logoutUserAction,
  stopLoading,
  storeInLocal,
  authUserLoginAction,
  authUserSignupAction
} from "../../../redux/actionCreators/authActions";

describe("Test the auth action creators", () => {
  it("Should test the synchronous actions", () => {
    const user = { user: "user" };
    expect(Boolean(authLoading())).toBe(true);
    expect(Boolean(logoutUserAction())).toBe(true);
    expect(Boolean(stopLoading())).toBe(true);
    storeInLocal("token", user, localStorage);
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
      username: "mkzyyy",
      email: "mkz@gmail.com",
      firstname: "test",
      lastname: "test",
      othername: "othernames",
      phoneNumber: "12345678907",
      password: "12345678",
      confirmPassword: "12345678"
    };

    const expectedResponse = {
      data: [
        {
          token:
            "iwiZW1haWNoYxNTU1OTY3Nzg0fQ.M-Wf3y_8OdIjH5YAjjGkFXxDcoqtU9geE",
          user: {
            id: 1,
            username: "mkz",
            email: "mkz@gmail.com",
            firstname: "test",
            lastname: "test",
            phoneNumber: "12345678907",
            profileImage:
              "https://res.cloudinary.com/shaddsolidsdnmkz/dd/uplddsdsoad/v1553840626/afasf.jpg",
            isAdmin: true
          }
        }
      ]
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: expectedResponse });
    });

    const result = await authUserSignupAction(mockRequest);
    expect(result.type).toEqual("AUTH_USER");
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
      emailUsername: "mkzyyy",
      password: "12345678"
    };

    const expectedResponse = {
      data: [
        {
          token:
            "iwiZW1haWNoYxNTU1OTY3Nzg0fQ.M-Wf3y_8OdIjH5YAjjGkFXxDcoqtU9geE",
          user: {
            id: 1,
            username: "mkz",
            email: "mkz@gmail.com",
            firstname: "test",
            lastname: "test",
            phoneNumber: "12345678907",
            profileImage:
              "https://res.cloudinary.com/shaddsolidsdnmkz/dd/uplddsdsoad/v1553840626/afasf.jpg",
            isAdmin: true
          }
        }
      ]
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    const result = await authUserLoginAction(mockRequest);
    expect(result.type).toEqual("AUTH_USER");
  });


  it('should return the ERROR action when there is a descriptive error in login', async () => {
    const mockRequest = {
      emailUsername: "y",
      password: "1"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { error: 'username or password is incorrect' } });
    });
    await authUserLoginAction(mockRequest);
  });

  it('should return the ERROR action when there is a descriptive error in signup', async () => {
    const mockRequest = {
      username: "y",
      email: "mkz@gmail.com",
      firstname: "t",
      lastname: "t",
      othername: "y",
      phoneNumber: "12345678907",
      password: "12345678",
      confirmPassword: "12345678"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { error: 'username length should above 2' } });
    });
    await authUserSignupAction(mockRequest);
  });
});
