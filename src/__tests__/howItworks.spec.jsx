import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HowItWorks from "../components/commonViews/HowItWorks/HowItWorks.jsx";

configure({ adapter: new Adapter() });

describe("HowItWorks component should be rendered", () => {
  const HowItWorksComp = shallow(<HowItWorks />);

  it("It should contain a HowItWorks component", () => {
    expect(HowItWorksComp.find("article").exists()).toBe(true);
  });

  it("It should contain a article tag with an embeded paragraph tag", () => {
    expect(HowItWorksComp.find("article p").length).toBe(2);
  });
});
