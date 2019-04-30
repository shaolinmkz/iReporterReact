import "babel-polyfill";
import React from "react";
import moxios from "moxios";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import {
  Profile,
  mapStateToProps
} from "../../components/commonViews/Profile/Profile.jsx";
import HelperUtils from "../../utils/helperUtils";

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

const token = HelperUtils.generateToken(mockUser);

describe("Test the Profile component with mount", () => {
  beforeEach(() => {});
  const profileWrapper = mount(
    <Provider store={store}>
      <Router>
        <Profile isLoggedIn={true} token={token} />
      </Router>
    </Provider>
  );
  localStorage.setItem("user", JSON.stringify(mockUser));
  test("It should render the Profile component and find an HTML section tag", () => {
    expect(profileWrapper.find("section#profile").exists()).toBe(true);
  });
});

describe("Test the Profile component with shallow", () => {
  const profileWrapper2 = shallow(<Profile isLoggedIn={true} token={token} />);

  test("It should run the profile methods", done => {
    localStorage.setItem("deleted", "true");
    profileWrapper2.instance().componentDidMount();
    done();
  });

  test("It should mock the map state to prop function", done => {
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

  test("It should run the profile methods", done => {
    localStorage.setItem("deleted", "true");
    profileWrapper2.instance().componentDidMount();
    done();
  });
});
describe("Test the Profile component", () => {
  beforeEach(() => {});
  const profileWrapperII = shallow(<Profile isLoggedIn={true} token={token} />);

  test("It should run the profile methods", async done => {
    profileWrapperII.setState({
      interventionRecord: [{ title: " this is a title", id: 2 }],
      redflagRecord: [{ title: " this is a title", id: 2 }]
    });
    await profileWrapperII.instance().render();
    done();
  });
});

describe("Test the Profile component with shallow for offline users", () => {
  beforeEach(() => {});
  const profileWrapper2 = shallow(<Profile isLoggedIn={false} token={token} />);

  test("It should redirect offline users to the home page", async done => {
    expect(profileWrapper2.find("Redirect").exists()).toBe(true);
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("It should mock profile image upload method for success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );

    await profileWrapper3.instance().handleImageUpload(e);
    done();
  });
});

describe("Mock the Profile component", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch red flag count method for success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );
    await profileWrapper3.instance().fetchRedflagCount();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch red flag count method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );
    await profileWrapper3.instance().fetchRedflagCount();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch intervention count method for success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );

    await profileWrapper3.instance().fetchInterventionCount();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch intervention count method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );
    await profileWrapper3.instance().fetchInterventionCount();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch red flag record method for success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );

    await profileWrapper3.instance().fetchRedflagRecord();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch red flag record method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );
    await profileWrapper3.instance().fetchRedflagRecord();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch intervention record method for success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );

    await profileWrapper3.instance().fetchInterventionRecord();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock fetch intervention record method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );
    await profileWrapper3.instance().fetchInterventionRecord();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock upload to cloudinary method for success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );

    await profileWrapper3.instance().updateProfileImage();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock upload to cloudinary method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );
    await profileWrapper3.instance().updateProfileImage();
    done();
  });
});

describe("Mock the Profile component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("It should mock profile image upload method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const profileWrapper3 = shallow(
      <Profile isLoggedIn={true} token={token} />
    );
    await profileWrapper3.instance().handleImageUpload(e);
    done();
  });
});
