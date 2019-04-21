import React from "react";
import { shallow } from "enzyme";
import HowItWorks from "../../components/commonViews/HowItWorks/HowItWorks.jsx";

describe("HowItWorks component should be rendered", () => {
  const HowItWorksComp = shallow(<HowItWorks />);

  it("It should contain a HowItWorks component", () => {
    expect(HowItWorksComp.find("article").exists()).toBe(true);
  });

  it("It should contain a article tag with an embeded paragraph tag", () => {
    expect(HowItWorksComp.find("article p").length).toBe(2);
  });
});
