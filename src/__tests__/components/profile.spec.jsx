import "babel-polyfill";
import React from "react";
import moxios from "moxios";
import sinon from "sinon";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import {
  Profile,
  mapStateToProps
} from "../../components/commonViews/Profile/Profile.jsx";
import HelperUtils from "../../utils/helperUtils";

sinon.stub(window, "scroll");
sinon.stub(window.location, "assign");

const mockFunc = jest.fn();

const e = {
  preventDefault: mockFunc,
  target: {
    files: ["file1", "file2"]
  }
};

const mockUser = {
  firstname: "mockUser",
  lastname: "mockUser",
  image: "mockUser",
  username: "mockUser",
  email: "mockUser",
  phoneNumber: "mockUser",
  id: 2
};

describe("Test the Profile component with mount", () => {
  const profileWrapper = mount(
    <Provider store={store}>
      <Router>
        <Profile
          isLoggedIn={true}
          token={HelperUtils.generateToken(mockUser)}
        />
      </Router>
    </Provider>
  );
  localStorage.setItem("user", JSON.stringify(mockUser));
  it("It should render the Profile component and find an HTML section tag", () => {
    expect(profileWrapper.find("section#profile").exists()).toBe(true);
  });
});

describe("Test the Profile component with shallow", () => {
  const profileWrapper2 = shallow(
    <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
  );

  it("It should run the profile methods", async () => {
    localStorage.setItem("deleted", "true");
    await profileWrapper2.instance().componentDidMount();
  });

  it("It should mock the map state to prop function", (done) => {
    const userReducer = {
      userData: {
        isLoggedIn: true,
        token: "mock_token"
      }
    };
    expect(mapStateToProps(userReducer)).toEqual({
      isLoggedIn: true,
      token: "mock_token"
    });
    done();
  });

  it("It should run the profile methods", async () => {
    localStorage.setItem("deleted", "true");
    await profileWrapper2.instance().componentDidMount();
  });
});
describe("Test the Profile component", () => {
  const profileWrapperII = shallow(
    <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
  );

  it("It should run the profile methods", () => {
    profileWrapperII.setState({
      interventionRecord: [{ title: " this is a title", id: 2 }],
      redflagRecord: [{ title: " this is a title", id: 2 }]
    });
    profileWrapperII.instance().render();
  });
});

describe("Test the Profile component with shallow for offline users", () => {
  const profileWrapper2 = shallow(
    <Profile isLoggedIn={false} token={HelperUtils.generateToken(mockUser)} />
  );

  it("It should redirect offline users to the home page", async () => {
    expect(profileWrapper2.find("Redirect").exists()).toBe(true);
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("It should mock profile image upload method for success", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );

    await profileWrapper3.instance().handleImageUpload(e);
  });

  it("It should mock profile image upload method for errors", async done => {
    jest.setTimeout(50000);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );
    await profileWrapper3.instance().handleImageUpload(e);
    done();
  });

  it("It should mock fetch red flag count method for success", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );

    await profileWrapper3.instance().fetchRedflagCount();
  });

  it("It should mock fetch red flag count method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );
    await profileWrapper3.instance().fetchRedflagCount();
    done();
  });

  it("It should mock fetch intervention count method for success", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );

    await profileWrapper3.instance().fetchInterventionCount();
  });

  it("It should mock fetch intervention count method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );
    await profileWrapper3.instance().fetchInterventionCount();
    done();
  });

  it("It should mock fetch red flag record method for success", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );

    await profileWrapper3.instance().fetchRedflagRecord();
  });

  it("It should mock fetch red flag record method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );
    await profileWrapper3.instance().fetchRedflagRecord();
    done();
  });

  it("It should mock fetch intervention record method for success", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );

    await profileWrapper3.instance().fetchInterventionRecord();
  });

  it("It should mock fetch intervention record method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );
    await profileWrapper3.instance().fetchInterventionRecord();
    done();
  });

  it("It should mock upload to cloudinary method for success", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );

    await profileWrapper3.instance().updateProfileImage();
  });

  it("It should mock upload to cloudinary method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={HelperUtils.generateToken(mockUser)} />
    );
    await profileWrapper3.instance().updateProfileImage();
    done();
  });
});