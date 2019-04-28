import React from "react";
import { shallow } from "enzyme";
import LandingPage from "../../components/commonViews/LandingPage/LandingPage.jsx";

describe("LandingPage component should be rendered", () => {
  const LandingPageComponent = shallow(<LandingPage />);

  it("It should contain a LandingPage component", () => {
    expect(LandingPageComponent.find("section.body-container").exists()).toBe(true);
  });
});
