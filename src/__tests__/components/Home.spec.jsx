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
      />
    );
    await home.instance().handleRedflagSwitch();
  });

  it("should get redflag record", async () => {

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
      />
    );
    await home.instance().handleInterventionSwitch();
  });

  it("should get incident record when component mounts", async () => {

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
