import { useState } from "react";
import createUseContext from "constate";

type Path = [string, string][];

export type Data = {
  status: "success" | "failure" | "in progress";
  error?: string;
  path?: Path;
  total_distance?: number;
  total_time?: number;
};

const usePath = () => {
  const [data, setData] = useState<Data>();
  return { data, setData };
};

export const usePathContext = createUseContext(usePath);
