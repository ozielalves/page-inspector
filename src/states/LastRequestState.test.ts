import { lastRequestState } from "./LastRequestState";

describe("Request State", () => {
  it("create new request", () => {
    lastRequestState.setApiId("ABCsrt");
    lastRequestState.setKeyword("security");
    expect(lastRequestState.apiId).toBe("ABCsrt");
    expect(lastRequestState.keyword).toBe("security");
  });
});
