/* global chrome */

const extensionURL = chrome.extension.getURL("");

function isExtensionRequest(details) {
  // chrome
  if (details.initiator) {
    return extensionURL.indexOf(details.initiator) !== -1;
  }

  // firefox
  return details.originUrl.indexOf(extensionURL) !== -1;
}

function beforeSendHeaders() {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      const requestHeaders = isExtensionRequest(details)
        ? details.requestHeaders.filter(header => header.name !== "User-Agent")
        : details.requestHeaders;

      if (details.type === "websocket") {
        const url = new URL(details.url);

        requestHeaders.push({
          name: "Authorization",
          value: `Basic ${url.searchParams.get("token")}`
        });
      }

      return {
        requestHeaders
      };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
  );
}

export default beforeSendHeaders;
