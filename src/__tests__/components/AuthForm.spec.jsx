import React from "react";
import { mount, shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import AuthFormView, { AuthForm } from "../../components/AuthForm/AuthForm.jsx";

const authForm = new AuthForm();

const e = {
  preventDefault: jest.fn()
};

describe("Test the Report component with mount", () => {
  const mockFunc = jest.fn();
  const wrapper1 = mount(
    <Provider store={store}>
      <Router>
        <AuthFormView
          authLoader
          authLoginUser={mockFunc}
          authSignupUser={mockFunc}
          isLoggedIn={false}
          loading
        />
      </Router>
    </Provider>
  );
  it("It should render the Report component and find an HTML tag", () => {
    expect(wrapper1.find("input").exists()).toBe(true);
  });

  it("It should render the Report component and find an HTML tag with a defined class", () => {
    wrapper1.find("span.switch-signup").simulate("click");
    wrapper1.find("span.switch-signin").simulate("click");
  });

  it("It should test the Auth form methods", () => {
    const e = {
      target: {
        name: "",
        value: "",
        parentNode: {
          reset: mockFunc
        }
      }
    };
    authForm.handleLoginChange(e);
    authForm.handleSignupChange(e);
    authForm.switchFormBelowSignup(e);
    authForm.switchFormBelowLogin(e);
  });
});

describe("Test the Report component with mount", () => {
  const mockFunc = jest.fn();
  const wrapperII = shallow(
    <AuthForm
      authLoader
      authLoginUser={mockFunc}
      authSignupUser={mockFunc}
      isLoggedIn={true}
      loading
    />
  );
  it("It should render the Report component and find an HTML tag", () => {
    expect(wrapperII.find("input").exists()).toBe(false);
    wrapperII.setProps({ authSignupUser: jest.fn(), authLoader: jest.fn() });
    wrapperII.instance().handleSignupSubmit(e);

    wrapperII.setProps({ authLoginUser: jest.fn(), authLoader: jest.fn() });
    wrapperII.instance().handleLoginSubmit(e);
  });
});
