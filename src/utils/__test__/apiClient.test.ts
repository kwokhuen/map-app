import { createClient } from "../apiClient";

describe("createClient", () => {
  it("should return an axios instance with 10s timeout by default", () => {
    const instance = createClient();
    expect(instance.defaults.timeout).toBe(10000);
  });

  it("should accept options", () => {
    const instance = createClient({
      baseURL: "https://example.com",
      timeout: 3000
    });
    expect(instance.defaults.baseURL).toBe("https://example.com");
    expect(instance.defaults.timeout).toBe(3000);
  });
});
