import React from "react";
import { shallow } from "enzyme";
import Footer from "../../components/commonViews/Footer/Footer.jsx";

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
