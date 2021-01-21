import React from "react";
import { shallow } from "enzyme";
import Home from "./index";

import KeywordForm from "../../components/KeywordForm";
import ActionButton from "../../components/ActionButton";

describe("Home page render test", () => {
  it("renders Home with KeywordForm", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(KeywordForm)).toBeTruthy();
  });

  it("renders Home with ActionButton", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(ActionButton)).toBeTruthy();
  });
});
