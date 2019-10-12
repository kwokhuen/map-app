import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { usePathContext, Data } from "../usePathContext";

const mockData: Data = {
  status: "in progress"
};

describe("usePathContext", () => {
  it("should set data correctly", () => {
    const { result } = renderHook(() => usePathContext(), {
      wrapper: props => <usePathContext.Provider {...props} />
    });

    expect(result.current.data).toBe(undefined);

    act(() => {
      result.current.setData(mockData);
    });

    expect(result.current.data).toStrictEqual(mockData);
  });
});
