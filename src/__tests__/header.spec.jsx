import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../components/commonViews/Header/Header.jsx";

configure({ adapter: new Adapter() });

describe("Test the header component", () => {
  const HeaderComp = shallow(<Header />);

  it("It should contain a Header component", () => {
    expect(HeaderComp.find("header").exists()).toBe(true);
  });

  it("It should containe a Header with paragraph tag", () => {
    expect(HeaderComp.find("header nav").length).toBe(2);
  });

  it("It should be truthy if component is defined", () => {
    expect(HeaderComp).toBeDefined();
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
