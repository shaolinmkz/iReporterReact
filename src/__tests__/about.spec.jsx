import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import About from "../components/commonViews/About/About.jsx";

configure({ adapter: new Adapter() });

describe("About component should be rendered", () => {
  const AboutComp = shallow(<About />);

  it("It should contain a About component", () => {
    expect(AboutComp.find("div").exists()).toBe(true);
  });

  it("It should contain three (3) paragraph tags within the article element", () => {
    expect(AboutComp.find("div article p").length).toBe(3);
  });
});
