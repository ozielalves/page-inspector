import React from "react";
import { shallow } from "enzyme";
import RequestsPage from "./index";

import ActionButton from "../../components/ActionButton";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import CircularProgress from "../../components/CircularProgress";

describe("Requests page render test", () => {
  it("renders Home with ActionButton", () => {
    const wrapper = shallow(<RequestsPage />);
    expect(wrapper.find(ActionButton)).toBeTruthy();
  });

  it("renders Home with Table", () => {
    const wrapper = shallow(<RequestsPage />);
    expect(wrapper.find(Table)).toBeTruthy();
  });

  it("renders Home with Modal", () => {
    const wrapper = shallow(<RequestsPage />);
    expect(wrapper.find(Modal)).toBeTruthy();
  });

  it("renders Home with CircularProgress", () => {
    const wrapper = shallow(<RequestsPage />);
    expect(wrapper.find(CircularProgress)).toBeTruthy();
  });
});
