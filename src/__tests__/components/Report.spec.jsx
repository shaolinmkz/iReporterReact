import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import ReportComp, {
  Report
} from "../../components/commonViews/Report/Report.jsx";

const report = new Report();

describe("Test the Report component with mount", () => {
  const mockFunc = jest.fn();
  const wrapper1 = mount(
    <Provider store={store}>
      <Router>
        <ReportComp
          isLoggedIn={true}
          lng={1.34324}
          lat={13.1344}
          isAdmin
          createRedflag={mockFunc}
          createIntervention={mockFunc}
          dispatchGeneralLoading={mockFunc}
          stopGeneralLoading={mockFunc}
          generalLoading
        />
      </Router>
    </Provider>
  );

  it("It should render the Report component and find an HTML section tag", () => {
    wrapper1.find("section.crime-form-container").exists();
  });

  it("It should mock all the report methods", () => {
    const mockImageData = new File(["image content"], { type: "image/*" });
    /**
     * @description noop
     * @returns {object} obj
     */
    const noOp = () => {};
    if (typeof window.URL.createObjectURL === "undefined") {
      Object.defineProperty(window.URL, "createObjectURL", { value: noOp });
    }

    const event1 = {
      target: {
        name: "title",
        files: [mockImageData]
      }
    };
    const event2 = {
      target: {
        name: "images",
        files: [mockImageData]
      }
    };
    const event3 = {
      target: {
        name: "videos",
        files: [mockImageData]
      }
    };
    report.handleLineBreaks();
    report.handleLineBreaks(3);
    report.handleChange(event1);
    report.handleChange(event2);
    report.handleChange(event3);
    report.handleVideoUpload(mockImageData);
    report.handleImageUpload(mockImageData);

    const e = {
      preventDefault: () => "prevent default"
    };

    report.handleSubmit(e);
  });
});

describe("Test the Report component with shallow", () => {
  const mockFuntion = jest.fn();
  const wrapper2 = shallow(
    <Router>
      <ReportComp
        isLoggedIn={false}
        lng={1.34324}
        lat={13.1344}
        isAdmin
        createRedflag={mockFuntion}
        createIntervention={mockFuntion}
        dispatchGeneralLoading={mockFuntion}
        stopGeneralLoading={mockFuntion}
        generalLoading
      />
    </Router>
  );
  it("It should render the Report component and find an HTML section tag", () => {
    expect(wrapper2.find("section.crime-report-container").exists()).toBe(
      false
    );
  });
  it("It should test the report methods", () => {
    const shallowWrapper = shallow(
      <Report
        isLoggedIn
        lng={1.34324}
        lat={13.1344}
        isAdmin
        createRedflag={jest.fn()}
        createIntervention={jest.fn()}
        dispatchGeneralLoading={jest.fn()}
        stopGeneralLoading={jest.fn()}
        generalLoading
      />
    );
    shallowWrapper.setProps({
      generalLoading: false,
      imagePreview: ["adasds", "fdszds"]
    });
    shallowWrapper.find("#send-Incident").simulate("submit");
    shallowWrapper.find(".crime-form-container.clearfix").simulate("load");
    shallowWrapper.instance().handleSubmit();
  });
});
