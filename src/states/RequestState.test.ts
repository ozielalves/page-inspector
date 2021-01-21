import { requestState } from "./RequestState";

describe("Request State", () => {
  it("create new request", () => {
    requestState.setApiId("ABCsrt");
    requestState.setKeyword("security");
    expect(requestState.apiId).toBe("ABCsrt");
    expect(requestState.keyword).toBe("security");
  });
});
