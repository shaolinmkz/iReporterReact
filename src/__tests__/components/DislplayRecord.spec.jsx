import React from "react";
import { mount, shallow } from "enzyme";
import moxios from "moxios";
import sinon from "sinon";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import DisplayPage, {
  DisplayRecord
} from "../../components/commonViews/DisplayRecord/DisplayRecord.jsx";
import HelperUtils from "../../utils/helperUtils";

const sampleUser = {
  email: "sampleuser.sampleuser@gmail.com",
  firstname: "sampleuser",
  id: 1,
  isAdmin: true,
  lastname: "sampleuser",
  phoneNumber: "09076336554",
  profileImage:
    "https://res.cloudinary.com/sampleuser/image/upload/v1553840626/sampleuser.jpg",
  username: "sampleuser101"
};

const mockRecord = {
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae orci dolor. Nunc commodo ligula non aliquam placerat. Donec a rhoncus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed semper bibendum convallis. Praesent faucibus massa tristique, vehicula nisl accumsan, malesuada diam. Nulla sed erat imperdiet mi venenatis sagittis vitae id est. Vivamus elementum dictum maximus",
  createdby: 11,
  createdon: "2011-01-03T00:35:00.544Z",
  email: "mock-email",
  firstname: "mock-firstname",
  id: 2,
  images: [
    "https://res.cloudinary.com/shaolinmkz/image/upload/v1546475677/dctwibggbv9qqardw9ow.jpg",
    "https://res.cloudinary.com/shaolinmkz/image/upload/v1546475692/wht3xahnwzrhysjkbmzg.jpg"
  ],
  isadmin: false,
  lastname: "mock-lastname",
  location: "6.492631700, 3.348967100",
  othername: "mock-othername",
  phonenumber: "12345678901",
  profileimage:
    "https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/avatar.png",
  status: "resolved",
  title: "Stolen Passwords",
  type: "red-flag",
  username: "mock-username",
  videos: []
};

const matchObj = {
  params: {
    id: 2
  }
};
describe("displayPage component", () => {
  it("should shallow render the displayPage component", () => {
    const displayPage = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    displayPage.setState({
      record: mockRecord
    });
    const e = {
      target: {
        className: "outer-modal"
      }
    };
    const e2 = {
      target: {
        className: "outer-failed-if"
      }
    };
    sinon.stub(window, "scrollTo");
    displayPage.instance().scrollTop();
    displayPage.instance().closeModal(e);
    displayPage.instance().closeModal(e2);
    expect(displayPage.find("section.home-feeds").exists()).toBe(true);
  });

  it("should shallow render the displayPage component", () => {
    const displayPage = shallow(
      <DisplayRecord
        isLoggedIn={false}
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    displayPage.setState({
      record: mockRecord
    });
    expect(displayPage.find("section.home-feeds").exists()).toBe(false);
  });

  it("should mount render the displayPage component", () => {
    const disp = mount(
      <Provider store={store}>
        <Router>
          <DisplayPage
            isLoggedIn
            modalDisplay={"block"}
            triggerModalClose={jest.fn()}
            triggerModalOpen={jest.fn()}
            token={HelperUtils.generateToken(sampleUser)}
            match={matchObj}
          />
        </Router>
      </Provider>
    );
    disp.setState({
      record: mockRecord
    });
  });
});

describe("Get Incident record", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should get a record", async () => {
    const expectedResponse = {
      data: [
        {
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae orci dolor. Nunc commodo ligula non aliquam placerat. Donec a rhoncus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed semper bibendum convallis. Praesent faucibus massa tristique, vehicula nisl accumsan, malesuada diam. Nulla sed erat imperdiet mi venenatis sagittis vitae id est. Vivamus elementum dictum maximus",
          createdby: 11,
          createdon: "2011-01-03T00:35:00.544Z",
          email: "mock-email",
          firstname: "mock-firstname",
          id: 2,
          images: [
            "https://res.cloudinary.com/shaolinmkz/image/upload/v1546475677/dctwibggbv9qqardw9ow.jpg",
            "https://res.cloudinary.com/shaolinmkz/image/upload/v1546475692/wht3xahnwzrhysjkbmzg.jpg"
          ],
          isadmin: false,
          lastname: "mock-lastname",
          location: "6.492631700, 3.348967100",
          othername: "mock-othername",
          phonenumber: "12345678901",
          profileimage:
            "https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/avatar.png",
          status: "resolved",
          title: "Stolen Passwords",
          type: "red-flag",
          username: "mock-username",
          videos: []
        }
      ]
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const display = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    await display.instance().componentWillMount();
  });

  it("should get a record", async () => {
    const expectedResponse = {
      data: [
        {
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae orci dolor. Nunc commodo ligula non aliquam placerat. Donec a rhoncus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed semper bibendum convallis. Praesent faucibus massa tristique, vehicula nisl accumsan, malesuada diam. Nulla sed erat imperdiet mi venenatis sagittis vitae id est. Vivamus elementum dictum maximus",
          createdby: 11,
          createdon: "2011-01-03T00:35:00.544Z",
          email: "mock-email",
          firstname: "mock-firstname",
          id: 2,
          images: [
            "https://res.cloudinary.com/shaolinmkz/image/upload/v1546475677/dctwibggbv9qqardw9ow.jpg",
            "https://res.cloudinary.com/shaolinmkz/image/upload/v1546475692/wht3xahnwzrhysjkbmzg.jpg"
          ],
          isadmin: false,
          lastname: "mock-lastname",
          location: "6.492631700, 3.348967100",
          othername: "mock-othername",
          phonenumber: "12345678901",
          profileimage:
            "https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/avatar.png",
          status: "resolved",
          title: "Stolen Passwords",
          type: "intervention",
          username: "mock-username",
          videos: []
        }
      ]
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const display = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    display.setState({ type: "intervention" });
    sinon.stub(localStorage, 'getItem');
    localStorage.setItem("updated", 'true')
    await display.instance().componentWillMount();
  });

  it("should get incident record when component mounts", async () => {
    const expectedResponse = {
      status: 404,
      message: "record not found"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 404, response: expectedResponse });
    });
    const display = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    display.setState({ status: 404 });
    await display.instance().componentWillMount();
  });

  it("should handle the change method", async () => {
    const display = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    const e = {
      preventDefault: jest.fn(),
      target: {
        value: "title"
      }
    };
    const matchProp = {
      params: {
        id: 2
      }
    };
    display.setProps({
      lng: 112.32132214,
      lat: -1.141442145,
      match: matchProp,
      token: HelperUtils.generateToken({ id: 2 }),
      triggerEditLoading: jest.fn(),
      stopDeleteLoading: jest.fn()
    });
    display.instance().handleChangeLocationSave(e);
    display.instance().handleCommentSave(e);
    display.instance().handleChange(e);
  });
  it("should handle the change method", async () => {
    const display = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    display.setProps({ editLoading: true });
  });
});


describe("Delete Incident record", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should delete a record", async () => {
    const expectedResponse = {
      message: "deleted successfully"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const display = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    const e = {
      preventDefault: jest.fn(),
      target: {
        value: "title"
      }
    };
    const matchProp = {
      params: {
        id: 2
      }
    };
    display.setProps({
      match: matchProp,
      token: HelperUtils.generateToken({ id: 2 }),
      triggerEditLoading: jest.fn(),
      stopDeleteLoading: jest.fn()
    });
    sinon.stub(localStorage, 'setItem');
    sinon.stub(window.location, 'assign');
    await display.instance().handleDelete(e);
  });

  it("should throw a 400 on attempt to delete a record", async () => {
    const expectedResponse = {
      message: "delete failed"
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });
    const display = shallow(
      <DisplayRecord
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
        match={matchObj}
      />
    );
    const e = {
      preventDefault: jest.fn(),
      target: {
        value: "title"
      }
    };
    const matchProp = {
      params: {
        id: 2
      }
    };
    display.setProps({
      match: matchProp,
      token: HelperUtils.generateToken({ id: 2 }),
      triggerEditLoading: jest.fn(),
      stopDeleteLoading: jest.fn()
    });
    await display.instance().handleDelete(e);
  });
});

