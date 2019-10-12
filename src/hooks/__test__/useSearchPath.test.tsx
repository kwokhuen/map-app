import { renderHook, act } from "@testing-library/react-hooks";
import React from "react";
import useSearchPath from "../useSearchPath";
import { usePathContext } from "../usePathContext";
import axios from "axios";
import { message } from "antd";
import {
  mockTokenResponse,
  mockPathResponse,
  mockSearchParams
} from "../__fixtures__/mockApi";

jest.mock("axios");
jest.mock("antd");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useSearchPath", () => {
  afterEach(() => {
    mockedAxios.post.mockReset();
    mockedAxios.get.mockReset();
  });

  it("should call api to get token and waypoints", async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.resolve(mockTokenResponse)
    );
    mockedAxios.get.mockImplementation(() => Promise.resolve(mockPathResponse));

    const { result, waitForNextUpdate } = renderHook(
      () => useSearchPath(mockedAxios),
      {
        wrapper: props => <usePathContext.Provider {...props} />
      }
    );
    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    act(() => {
      result.current.fetch(mockSearchParams);
    });
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(mockedAxios.post).toHaveBeenCalledWith("/route", {
      params: mockSearchParams
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `/route/${mockTokenResponse.data.token}`
    );
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle API error", async () => {
    message.error = jest.fn();
    const mockError = new Error("error!");
    mockedAxios.post.mockImplementation(() => Promise.reject(mockError));
    mockedAxios.get.mockImplementation(() => Promise.resolve(mockPathResponse));
    const { result, waitForNextUpdate } = renderHook(
      () => useSearchPath(mockedAxios),
      {
        wrapper: props => <usePathContext.Provider {...props} />
      }
    );
    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    act(() => {
      result.current.fetch(mockSearchParams);
    });
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toStrictEqual(false);
    expect(message.error).toHaveBeenCalledWith(
      "Internal server error, please try again later."
    );
  });
});
