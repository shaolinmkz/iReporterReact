import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Footer from "../components/commonViews/Footer/Footer.jsx";

configure({ adapter: new Adapter() });

describe("Footer component should be rendered", () => {
  const footerComp = shallow(<Footer />);

  it("It should contain a footer component", () => {
    expect(footerComp.find("footer").exists()).toBe(true);
  });

  it("It should contain a footer tag with a paragraph tag inside", () => {
    expect(footerComp.find("footer p").length).toBe(1);
  });

  it("It should contain a defined footer component", () => {
    expect(footerComp).toBeDefined();
  });
});
