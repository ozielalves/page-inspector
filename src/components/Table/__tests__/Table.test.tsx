import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import React from "react";
import Table from "../index";

import TableItem from "../TableItem";

describe("Table render test", () => {
  const data = [
    {
      id: "OJOaad",
      apiId: "POossSE",
      status: "done",
      urls: ["www.exemplo.com", "www.exemplo.com", "www.exemplo.com"],
    },
    {
      id: "sdfsdf",
      apiId: "sdfwewr",
      status: "active",
      urls: ["www.exemplo.com", "www.exemplo.com", "www.exemplo.com"],
    },
  ];

  it("renders correctly ActionButtom", () => {
    const wrapper = shallow(
      <Table data={data} handleDelete={() => {}} setFilter={() => {}} />
    );
    expect(wrapper.find(TableItem)).toBeTruthy();
  });

  it("should render the correct Table", () => {
    const tree = renderer
      .create(
        <Table data={data} handleDelete={() => {}} setFilter={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
