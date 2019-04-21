import React from "react";
import { shallow } from "enzyme";
import About from "../../components/commonViews/About/About.jsx";

describe("About component should be rendered", () => {
  const AboutComp = shallow(<About />);

  it("It should contain a About component", () => {
    expect(AboutComp.find("div").exists()).toBe(true);
  });

  it("It should contain three (3) paragraph tags within the article element", () => {
    expect(AboutComp.find("div article p").length).toBe(3);
  });
});
