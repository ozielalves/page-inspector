import React from "react";
import ActionButton from "./index";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { ReactComponent as LogoOziel } from "../../assets/logo-oziel.svg";

describe("<ActionButton />", () => {
  let wrapper: HTMLDivElement;

  beforeEach(() => {
    wrapper = document.createElement("div");
    document.body.appendChild(wrapper);
  });

  afterEach(() => {
    document.body.removeChild(wrapper);
  });

  it("can render and click the Action Button", () => {
    console.log = jest.fn();
    // Teste da primeira renderização
    act(() => {
      ReactDOM.render(
        <ActionButton className="test" onClick={console.log("TESTE")}>
          <LogoOziel />
        </ActionButton>,
        wrapper
      );
    });
    const button = wrapper.querySelector("button");
    expect(wrapper.querySelector(".test")).toBeInTheDocument();
    expect(wrapper.querySelector("button")).toBeInTheDocument();
    expect(wrapper.querySelector("svg")).toBeInTheDocument();

    // Teste click para verificar chamada da funçao passada como prop
    act(() => {
      button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(console.log).toHaveBeenCalledWith("TESTE");
  });
});
