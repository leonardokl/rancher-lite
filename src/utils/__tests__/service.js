import { getImage, getImageTag } from "../service";

const service = {
  upgrade: {
    inServiceStrategy: {
      launchConfig: {
        imageUuid: "docker:sentry:1.0.0"
      }
    }
  }
};

describe("getImage", () => {
  it("get the image name given a service", () => {
    const actual = getImage(service);
    const expected = "sentry:1.0.0";

    expect(actual).toBe(expected);
  });
});

describe("getImageTag", () => {
  it("get the image tag given a service", () => {
    const actual = getImageTag(service);
    const expected = "1.0.0";

    expect(actual).toBe(expected);
  });
});