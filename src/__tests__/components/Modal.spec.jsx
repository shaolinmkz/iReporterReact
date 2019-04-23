import React from "react";
import { shallow } from "enzyme";
import Modal from "../../components/Modal.jsx";

describe("Modal component", () => {
  it("should shallow render the Modal component", () => {
    const modalShallow = shallow(
      <Modal parentStyle={{}} innerBox={{}} onClick={jest.fn()}>
        {" "}
        <span>Testing 101</span>
      </Modal>
    );
    expect(modalShallow.find("section.outer-modal").exists()).toBe(true);
  });
});
