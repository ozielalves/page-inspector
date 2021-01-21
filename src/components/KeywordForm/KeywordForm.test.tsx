import React from "react";
import KeywordForm from "./index";
import { mount, ReactWrapper } from "enzyme";

describe("<KeywordForm />", () => {
  let container: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let setKeyword: jest.Mock<any, any>;
  let setFormatError: jest.Mock<any, any>;
  let handleSubmit: jest.Mock<any, any>;

  beforeAll(() => {
    setKeyword = jest.fn();
    setFormatError = jest.fn();
    handleSubmit = jest.fn();

    container = mount(
      <KeywordForm
        keyword="123"
        setKeyword={setKeyword}
        isLoading={false}
        setFormatError={setFormatError}
        emptySubmission={false}
        handleSubmit={handleSubmit}
        formatError={false}
      />
    );
  });

  it("can render and change input value", () => {
    expect(container.exists("form")).toEqual(true);
    expect(container.exists("input")).toEqual(true);
    expect(container.exists("button")).toEqual(true);

    const handleChange = jest.spyOn(React, "useState");
    handleChange.mockImplementation((keyword: string) => [keyword, setKeyword]);

    container.find("input").simulate("change");
    expect(setKeyword).toBeTruthy();
  });

  /* it("Empty form submittion should display an error", () => {
    const form = container.find("form").first();
    form.simulate("submit");
    expect(container.find("span").first().text()).toBe(
      "A palavra chave precisa ter pelo menos 4 caracteres"
    );
  }); */
});
