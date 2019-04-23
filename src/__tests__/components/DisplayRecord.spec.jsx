import React from "react";
import { shallow } from "enzyme";
import DisplayRecordCard from "../../components/DisplayRecordCard.jsx";

describe("Display Record component", () => {
  it("should shallow render the Display Record", () => {
    const displayCardWrapper = shallow(
      <DisplayRecordCard
        profileImage="test"
        username="test101"
        title="test title"
        incidentIcon="test icon url"
        comment="test comment"
        status="test status"
        location="test location"
        images={["image url"]}
        videos={["video url"]}
        id={2}
        onMouseDown={jest.fn()}
      />
    );
    expect(displayCardWrapper.find("div.post").exists()).toBe(true);
  });

  it("should shallow render the Display Record", () => {
    const displayCardWrapper = shallow(
      <DisplayRecordCard
        profileImage="test"
        username="test101"
        title="test title"
        incidentIcon="test icon url"
        comment="test comment"
        status="test status"
        location="test location"
        images={[]}
        videos={[]}
        id={2}
        onMouseDown={jest.fn()}
      />
    );
    expect(displayCardWrapper.find("div.post").exists()).toBe(true);
  });
});
