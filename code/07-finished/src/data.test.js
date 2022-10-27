import { describe, it, expect, vi } from "vitest";

import { generateReportData, storeData } from "./data";

import * as dataFn from "./data";

vi.spyOn(dataFn, "storeData");

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
    const writeData = vi.fn(() => Promise.resolve("ok"));
    dataFn.storeData.mockImplementation((data, text) => {
      return new Promise((resolve, reject) => {
        resolve(writeData(data, text));
      });
    });
    storeData(data, "test.txt");
    expect(writeData).toHaveBeenCalledTimes(1);
    expect(writeData).toHaveBeenCalledWith("test", "test.txt");
  });
  it("should resolve ok string if called correctly", async () => {
    const data = "test";
    const result = await storeData(data);
    expect(result).toBe("ok");
  });
});
