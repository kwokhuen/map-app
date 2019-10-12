import { useCallback, useEffect, useRef, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { message } from "antd";
import { usePathContext } from "./usePathContext";

type Path = [string, string][];

type Token = {
  token: string;
};

type Params = {
  origin: string;
  destination: string;
};

type PathResponse = {
  status: "success" | "failure" | "in progress";
  error?: string;
  path?: Path;
  total_distance?: number;
  total_time?: number;
};

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default () => {
  const { setData } = usePathContext();
  const [params, setParams] = useState<Params>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFirstRun = useRef(true);

  const getToken = useCallback(
    async () =>
      await apiClient.post<Token>("/route", {
        params
      }),
    [params]
  );

  const getPath = useCallback(
    async (
      token: Token["token"],
      retryAfterMs = 500
    ): Promise<PathResponse> => {
      const {
        data,
        data: { status, error }
      } = await apiClient.get<PathResponse>(`/route/${token}`);
      switch (status) {
        case "success":
          message.success("Success!");
          return data;
        case "failure":
          message.error(`Sorry. ${error}.`);
          return data;
        case "in progress":
          message.info(
            "Hang in there! We're trying to retrieve your information."
          );
          await timeout(retryAfterMs);
          return await getPath(token, retryAfterMs * 2);
        default:
          return Promise.reject(new Error("Unknown status"));
      }
    },
    []
  );

  useEffect(() => {
    const fetchResource = async () => {
      setIsLoading(true);
      try {
        const {
          data: { token }
        } = await getToken();
        const data = await getPath(token);
        setData(data);
      } catch (e) {
        message.error("Internal server error, please try again later.");
        setData(undefined);
      }
      setIsLoading(false);
    };

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    fetchResource();
  }, [params]);

  const fetch = useCallback((value: Params) => setParams(value), [params]);

  return {
    fetch,
    isLoading
  };
};
