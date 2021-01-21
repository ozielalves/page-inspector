import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import React from "react";
import Modal from "../index";

import ActionButtom from "../../ActionButton";

describe("Modal render test", () => {
  it("renders correctly ActionButtom", () => {
    const wrapper = shallow(
      <Modal onClose={() => {}} open={true}/>
    );
    expect(wrapper.find(ActionButtom)).toBeTruthy();
  });

  it("should render the correct Modal title", () => {
    const tree = renderer
      .create(<Modal onClose={() => {}} open={true} title="Normal Title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
