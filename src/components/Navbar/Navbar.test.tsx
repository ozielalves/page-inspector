import renderer from "react-test-renderer";
import React from "react";
import Navbar from "./index";

describe("Navbar render test", () => {
  it("should render the correct Navbar correctly", () => {
    const tree = renderer
      .create(<Navbar/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
