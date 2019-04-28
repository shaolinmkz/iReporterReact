import React from "react";
import { mount, shallow } from "enzyme";
import moxios from "moxios";
import sinon from "sinon";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import HomePage, { Home } from "../../components/commonViews/Home/Home.jsx";

describe("HomePage component", () => {
  it("should shallow render the HomePage component", () => {
    const homePage = shallow(
      <Home
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token="mock_token"
      />
    );
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
    homePage.instance().scrollTop();
    homePage.instance().closeModal(e);
    homePage.instance().closeModal(e2);
    expect(homePage.find("section.home-feeds").exists()).toBe(true);
  });

  it("should shallow render the HomePage component", () => {
    const homePage = shallow(
      <Home
        isLoggedIn={false}
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token="mock_token"
      />
    );
    expect(homePage.find("section.home-feeds").exists()).toBe(false);
  });

  it("should mount render the HomePage component", () => {
    mount(
      <Provider store={store}>
        <Router>
          <HomePage
            isLoggedIn
            modalDisplay={"block"}
            triggerModalClose={jest.fn()}
            triggerModalOpen={jest.fn()}
            token="mock_token"
          />
        </Router>
      </Provider>
    );
  });
});

describe("Get Incident record", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should get regflag record as default", async () => {

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
    const home = shallow(
      <Home
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token="mock_token"
      />
    );
    await home.instance().handleRedflagSwitch();
  });

  it("shold get redflag record", async () => {

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
    const home = shallow(
      <Home
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token="mock_token"
      />
    );
    await home.instance().handleInterventionSwitch();
  });

  it("should get incident record when component mounts", async () => {

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
    const home = shallow(
      <Home
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token="mock_token"
      />
    );
    await home.instance().componentWillMount();
  });

  it("should handle the change method", async () => {
    const home = shallow(
      <Home
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token="mock_token"
      />
    );
    const e = {
      target: {
        value: "title"
      }
    }
    home.instance().handleChange(e);
  });
});
