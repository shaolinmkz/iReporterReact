import "babel-polyfill";
import React from "react";
import { mount, shallow } from "enzyme";
import moxios from "moxios";
import sinon from "sinon";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import { createStore, applyMiddleware, combineReducers } from "redux";
import store from "../../redux/store";
import HomePage, { Home } from "../../components/commonViews/Home/Home.jsx";
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
  map: jest.fn(),
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

/**
 * @description Mocks the user reducer
 * @returns {object} Returns the initial state.
 */
const userReducer = () => ({
  token: HelperUtils.generateToken(sampleUser),
  isLoggedIn: true
});

/**
 * @description Mocks the modal reducer
 * @returns {object} Returns the initial state.
 */
const modalReducer = () => ({
  modalDisplay: "none"
});

/**
 * @description Mocks the modal reducer
 * @returns {object} Returns the initial state.
 */
const recordReducer = () => ({
  generalLoading: false,
  lat: 6.465422,
  lng: 3.406448
});

/**
 * @description Mocks the auth reducer
 * @returns {object} Returns the initial state.
 */
const authReducer = () => ({
  loading: false
});

// mock root reducer
const rootReducer = combineReducers({
  authData: authReducer,
  userData: userReducer,
  recordData: recordReducer,
  modalData: modalReducer
});

createStore(rootReducer, applyMiddleware(ReduxPromise));


describe("HomePage component", () => {
  it("should shallow render the HomePage component", () => {
    const homePage = shallow(
      <Home
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
      />
    );
    homePage.setState({
      redflagRecords: mockRecord,
      interventionRecords: mockRecord
    });
    homePage.setProps({ token: HelperUtils.generateToken(sampleUser) });
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
        token={HelperUtils.generateToken(sampleUser)}
      />
    );
    expect(homePage.find("section.home-feeds").exists()).toBe(false);
  });

  it("should mount render the HomePage component", () => {
    const newHomeMount = mount(
      <Provider store={store}>
        <Router>
          <HomePage
            isLoggedIn
            modalDisplay={"block"}
            triggerModalClose={jest.fn()}
            triggerModalOpen={jest.fn()}
            token={HelperUtils.generateToken(sampleUser)}
          />
        </Router>
      </Provider>
    );
    newHomeMount.setState({
      redflagRecords: mockRecord,
      interventionRecords: mockRecord
    });
    newHomeMount.setProps({ token: HelperUtils.generateToken(sampleUser) });
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
        token={HelperUtils.generateToken(sampleUser)}
      />
    );
    home.setState({
      redflagRecords: mockRecord,
      interventionRecords: mockRecord
    });
    home.setProps({ token: HelperUtils.generateToken(sampleUser) });
    await home.instance().handleRedflagSwitch();
  });

  it("should get redflag record", async () => {
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
        token={HelperUtils.generateToken(sampleUser)}
      />
    );
    home.setState({
      redflagRecords: mockRecord,
      interventionRecords: mockRecord
    });
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
        token={HelperUtils.generateToken(sampleUser)}
      />
    );
    home.setState({
      redflagRecords: mockRecord,
      interventionRecords: mockRecord
    });
    home.setProps({ token: HelperUtils.generateToken(sampleUser) });
    await home.instance().componentWillMount();
  });

  it("should handle the change method", async () => {
    const home = shallow(
      <Home
        isLoggedIn
        modalDisplay={"block"}
        triggerModalClose={jest.fn()}
        triggerModalOpen={jest.fn()}
        token={HelperUtils.generateToken(sampleUser)}
      />
    );
    const e = {
      target: {
        value: "title"
      }
    };
    home.setState({
      redflagRecords: mockRecord,
      interventionRecords: mockRecord
    });
    home.setProps({ token: HelperUtils.generateToken(sampleUser) });
    home.instance().handleChange(e);
  });
});
