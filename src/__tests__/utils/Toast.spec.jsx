import React from "react";
import { shallow } from "enzyme";
import Toast from "../../components/Toast.jsx";

describe("Test the Toast component", () => {
  const wrapper = shallow(<Toast />)
  it("It should contain a div", () => {
    expect(wrapper.find("div").exists()).toBe(true);
  });
});
