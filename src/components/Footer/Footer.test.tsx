import renderer from "react-test-renderer";
import React from "react";
import Footer from "./index";

describe("Footer render test", () => {
  it("should render the correct Footer correctly", () => {
    const tree = renderer
      .create(<Footer/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
