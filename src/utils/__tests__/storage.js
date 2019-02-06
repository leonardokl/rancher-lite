/* global chrome */

import storage from "../storage";

describe("setItem", () => {
  it("calls the chrome api with the right arguments", async () => {
    expect.assertions(2);

    const spyChromeAPI = jest.spyOn(chrome.storage.sync, "set");
    const key = "test";
    const value = "123";

    await storage.setItem(key, value);

    expect(spyChromeAPI).toBeCalledTimes(1);
    expect(spyChromeAPI.mock.calls[0][0]).toEqual({ [key]: value });

    spyChromeAPI.mockRestore();
  });
});

describe("getItem", () => {
  it("calls the chrome api with the right arguments", async () => {
    expect.assertions(1);

    const mockChromeAPI = jest.fn((key, cb) => {
      cb({ [key]: true });
    });

    global.chrome.storage.sync.get = mockChromeAPI;

    const key = "test";

    const item = await storage.getItem(key);

    expect(item).toBe(true);

    mockChromeAPI.mockRestore();
  });
});

describe("removeItem", () => {
  it("calls the chrome api with the right arguments", async () => {
    expect.assertions(2);

    const spyChromeAPI = jest.spyOn(chrome.storage.sync, "remove");
    const key = "test";

    await storage.removeItem(key);

    expect(spyChromeAPI).toBeCalledTimes(1);
    expect(spyChromeAPI.mock.calls[0][0]).toEqual(key);

    spyChromeAPI.mockRestore();
  });
});
