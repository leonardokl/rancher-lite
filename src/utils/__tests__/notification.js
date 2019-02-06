/* global chrome */

import notification from "../notification";

describe("success", () => {
  it("creates a success notification given a name", () => {
    const spy = jest.spyOn(chrome.notifications, "create");
    const message = "Everything went well";

    notification.success(message);

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][1].title).toBe("Success");
    expect(spy.mock.calls[0][1].message).toBe(message);

    spy.mockRestore();
  });
});

describe("error", () => {
  it("create a error notification given a name", () => {
    const spy = jest.spyOn(chrome.notifications, "create");
    const message = ":(";

    notification.error(message);

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][1].title).toBe("Error");
    expect(spy.mock.calls[0][1].message).toBe(message);

    spy.mockRestore();
  });
});
