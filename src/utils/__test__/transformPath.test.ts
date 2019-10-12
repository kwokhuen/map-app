import { transformPath } from "../transformPath";

const mockPath: [string, string][] = [
  ["22.372081", "114.107877"],
  ["22.326442", "114.167811"],
  ["22.284419", "114.159510"]
];

const mockOutput = [
  {
    lat: 22.372081,
    lng: 114.107877
  },
  {
    lat: 22.326442,
    lng: 114.167811
  },
  {
    lat: 22.284419,
    lng: 114.15951
  }
];

describe("transformPath", () => {
  it("should transform path correctly", () => {
    expect(transformPath(mockPath)).toStrictEqual(mockOutput);
  });
});
