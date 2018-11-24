import get from "lodash/get";

function getImage(service) {
  const imageUuid = get(
    service,
    "launchConfig.imageUuid",
    ""
  );

  return imageUuid.replace(/^docker:/, "");
}

function getImageTag(service) {
  const imageUuid = get(
    service,
    "upgrade.inServiceStrategy.launchConfig.imageUuid",
    ""
  );

  if (!imageUuid) return "";

  const regex = /(^docker:)(.*):(.*)/;

  if (imageUuid.match(regex)) {
    return imageUuid.replace(regex, "$3");
  }

  return "latest";
}

export { getImage, getImageTag };
