import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../components/commonViews/404/404.jsx";


describe("NotFound component should be rendered", () => {
  const NotFoundComp = shallow(<NotFound />);

  it("It should contain a NotFound component", () => {
    expect(NotFoundComp.find("img").exists()).toBe(true);
  });

  it("It should contain an img and h1 tag", () => {
    expect(NotFoundComp.find("div img").length).toBe(1);
    expect(NotFoundComp.find("div h1").length).toBe(1);
  });
});
