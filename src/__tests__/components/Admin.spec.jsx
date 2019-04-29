import "babel-polyfill";
import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import {
  Admin,
  mapStateToProps
} from "../../components/commonViews/Admin/Admin.jsx";
import HelperUtils from "../../utils/helperUtils";

sinon.stub(window, "scroll");
sinon.stub(window.location, "assign");

// const mockFunc = jest.fn();

// const e = {
//   preventDefault: mockFunc,
//   target: {
//     files: ["file1", "file2"]
//   }
// };

const mockUser = {
  firstname: "mockUser",
  lastname: "mockUser",
  image: "mockUser",
  username: "mockUser",
  email: "mockUser",
  phoneNumber: "mockUser",
  id: 2
};

describe("Test the Admin component with mount", () => {
  const AdminWrapper = mount(
    <Provider store={store}>
      <Router>
        <Admin
          isLoggedIn={true}
          token={HelperUtils.generateToken(mockUser)}
          isAdmin={true}
        />
      </Router>
    </Provider>
  );
  it("It should render the Admin component and find an HTML section tag", () => {
    expect(AdminWrapper.find("section#admin").exists()).toBe(true);
  });

  it("It should mock the map state to prop function", done => {
    const userReducer = {
      userData: {
        isLoggedIn: true,
        token: "mock_token",
        isAdmin: true
      }
    };
    expect(mapStateToProps(userReducer)).toEqual({
      isLoggedIn: true,
      token: "mock_token",
      isAdmin: true
    });
    done();
  });
});
