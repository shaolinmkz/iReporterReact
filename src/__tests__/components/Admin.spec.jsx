import "babel-polyfill";
import React from "react";
import sinon from "sinon";
import moxios from "moxios";
import { mount, shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import {
  Admin,
  mapStateToProps
} from "../../components/commonViews/Admin/Admin.jsx";
import AdminSelect from "../../components/AdminSelect.jsx";
import HelperUtils from "../../utils/helperUtils";

sinon.stub(window, "scroll");
sinon.stub(window.location, "assign");

const mockFunc = jest.fn();

const e = {
  preventDefault: mockFunc,
  target: {
    files: ["file1", "file2"],
    className: "outer-modal",
    value: "mock value"
  }
};

const mockUser = {
  firstname: "mockUser",
  lastname: "mockUser",
  image: "mockUser",
  username: "mockUser",
  email: "mockUser",
  phoneNumber: "mockUser",
  id: 2
};

describe("Test the Admin component with mount", () => {
  const AdminWrapper = mount(
    <Provider store={store}>
      <Router>
        <Admin
          isLoggedIn={true}
          token={HelperUtils.generateToken(mockUser)}
          isAdmin={true}
        />
      </Router>
    </Provider>
  );
  it("It should render the Admin component and find an HTML section tag", () => {
    expect(AdminWrapper.find("section#admin").exists()).toBe(true);
  });

  it("It should mock the map state to prop function", done => {
    const userReducer = {
      userData: {
        isLoggedIn: true,
        token: "mock_token",
        isAdmin: true
      }
    };
    expect(mapStateToProps(userReducer)).toEqual({
      isLoggedIn: true,
      token: "mock_token",
      isAdmin: true
    });
    done();
  });
});

describe("Test the Admin component with mount", () => {
  mount(
    <Provider store={store}>
      <Router>
        <Admin
          isLoggedIn={true}
          token={HelperUtils.generateToken(mockUser)}
          isAdmin={false}
        />
      </Router>
    </Provider>
  );
});

describe("Test the Admin Select component with shallow", () => {
  const AdminSelectWrapper = shallow(
    <AdminSelect
      id={0}
      status="rejected"
      title="Any title is okay"
      onSubmit={() => "do nothing"}
      loading={false}
      onClick={() => "do nothing"}
      onChange={() => "do nothing"}
    />
  );
  it("It should render the Admin Select component and find an HTML section tag", () => {
    expect(AdminSelectWrapper.find("section.outer-modal").exists()).toBe(true);
  });
});

describe("Test the Admin Select component with shallow", () => {
  const AdminSelectWrapper = shallow(<AdminSelect loading={true} />);
  it("It should render the Admin Select component and find an HTML section tag if props are not specified", () => {
    expect(AdminSelectWrapper.find("section.outer-modal").exists()).toBe(true);
    AdminSelect.defaultProps.onSubmit();
    AdminSelect.defaultProps.onClick();
    AdminSelect.defaultProps.onChange();
  });
});

describe("Mock the Admin component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("It should mock Admin page for fetch red-flag recordn for success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const AdminView = shallow(
      <Admin
        id={0}
        status="rejected"
        title="Any title is okay"
        onSubmit={() => "do nothing"}
        loading={false}
        onClick={() => "do nothing"}
        onChange={() => "do nothing"}
      />
    );
    await AdminView.instance().fetchRedflag();
    AdminView.instance().handleUpdate(1, "rejected", "this is a title");
    done();
  });
});

describe("Mock the Admin component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("It should mock Admin page for fetch red-flag errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { message: "mock_response" }
      });
    });
    const AdminView = shallow(
      <Admin
        id={0}
        status="rejected"
        title="Any title is okay"
        onSubmit={() => "do nothing"}
        loading={false}
        onClick={() => "do nothing"}
        onChange={() => "do nothing"}
      />
    );
    await AdminView.instance().fetchRedflag();
    done();
  });
});

describe("Mock the Admin component with shallow", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("It should mock Admin page for intervention success", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const AdminView = shallow(
      <Admin
        id={0}
        status="rejected"
        title="Any title is okay"
        onSubmit={() => "do nothing"}
        loading={false}
        onClick={() => "do nothing"}
        onChange={() => "do nothing"}
      />
    );
    await AdminView.instance().fetchIntervention();
    done();
  });
  it("It should mock Admin page for fetch intervention", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const AdminView = shallow(
      <Admin
        id={0}
        status="rejected"
        title="Any title is okay"
        onSubmit={() => "do nothing"}
        loading={false}
        onClick={() => "do nothing"}
        onChange={() => "do nothing"}
      />
    );
    await AdminView.instance().fetchIntervention();
    done();
  });
});

describe("Mock the Admin component submit handler", () => {
  beforeEach(() => {
    jest.setTimeout(10000);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("It should mock Admin submit method for errors", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: "mock_response" }
      });
    });
    const AdminView = shallow(
      <Admin
        id={0}
        status="rejected"
        title="Any title is okay"
        onSubmit={() => "do nothing"}
        loading={false}
        onClick={() => "do nothing"}
        onChange={() => "do nothing"}
      />
    );
    await AdminView.instance().handleSubmit(e);
    done();
  });
  it("It should mock Admin submit method for success", done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: "mock_response" }
      });
    });
    const AdminView = shallow(
      <Admin
        id={2}
        status="draft"
        title="Any title is okay"
        onSubmit={() => "do nothing"}
        loading={false}
        onClick={() => "do nothing"}
        onChange={() => "do nothing"}
      />
    );
    AdminView.instance().handleSubmit(e);
    AdminView.instance().hideModal(e);
    AdminView.instance().hideModal({ target: { className: "musah" } });
    AdminView.instance().handleSelect(e);
    AdminView.instance().handleRFSwitch();
    AdminView.instance().handleIntSwitch();
    done();
  });
});
