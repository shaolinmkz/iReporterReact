import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Header,
  mapDispatchToProps,
  mapStateToProps
} from "../../components/commonViews/Header/Header.jsx";

describe("Test the header component", () => {
  const mockFunc = jest.fn();
  const HeaderComp = shallow(
    <Header isLoggedIn={false} logoutUser={mockFunc} isAdmin={false} />
  );

  const HeaderCompOffline = shallow(
    <Header isLoggedIn logoutUser={mockFunc} isAdmin />
  );

  it("It should contain a Header component", () => {
    expect(HeaderComp.find("header").exists()).toBe(true);
    expect(HeaderCompOffline.find("header").exists()).toBe(true);
  });

  it("It should containe a Header with paragraph tag", () => {
    expect(HeaderComp.find("header nav").length).toBe(2);
  });

  it("It should trigger the signout method", () => {
    const HeaderComp2 = mount(
      <Router>
        <Header isLoggedIn logoutUser={mockFunc} isAdmin />
      </Router>
    );
    HeaderComp2.find("a#signout_online_desktop").simulate("click");
  });

  it("It should be truthy if component is defined", () => {
    expect(HeaderComp).toBeDefined();
  });

  it("It should mock the map dispatch to props", () => {
    mapDispatchToProps(jest.fn());
  });

  it("It should mock the map state to props", () => {
    const obj ={
      userData: {
        isLoggedIn: true,
        isAdmin: true
      }
    }
    mapStateToProps(obj);
  });

  it("It should call the handleOnlick method in the header component", () => {
    HeaderComp.instance().handleOnclick();
  });
  it("It should call the componentDidMount method in the header component which in turn checks for screen resize", () => {
    // Test for 500px
    global.innerWidth = 700;
    global.dispatchEvent(new Event("resize"));
    HeaderComp.instance().componentDidMount();

    global.dispatchEvent(new Event("load"));
    HeaderComp.instance().componentDidMount();
    // Test for 1200px
    global.innerWidth = 1200;
    global.dispatchEvent(new Event("resize"));
    HeaderComp.instance().componentDidMount();

    global.dispatchEvent(new Event("load"));
    HeaderComp.instance().componentDidMount();
  });
  it("It should call the handleHamburger method in the header component", () => {
    // Test for first hamburger click
    HeaderComp.instance().handleHamburger();
    // Test for second hamburger click
    HeaderComp.instance().handleHamburger();
  });
});
