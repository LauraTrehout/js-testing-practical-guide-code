import { describe, it, expect, vi } from "vitest";

import { generateReportData, storeData } from "./data";

const writeData = vi.fn(() => 'ok');
const mockStoreData = vi.fn((data) => {
  return new Promise((resolve, reject) => {
    resolve(writeData(data, "test.txt"));
  });
});

describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    const logger = vi.fn();

    // logger.mockImplementationOnce(() => {});

    generateReportData(logger);

    expect(logger).toBeCalled();
  });
});

describe("storeData()", () => {
  it("should throw an error if no data is provided", () => {
    const data = undefined;
    const result = () => storeData(data);
    return expect(result).rejects.toThrow(/no data received/i);
  });
  it("should call writeData with correct arguments", () => {
    const data = "test";

    mockStoreData(data);
    expect(writeData).toHaveBeenCalledTimes(1);
    expect(writeData).toHaveBeenCalledWith("test", "test.txt");
  });
  it("should resolve to no value if called correctly", async () => {
    const data = "test";
    const result = await mockStoreData(data);
    expect(result).toBe('ok')
  });
});
