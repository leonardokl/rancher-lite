/* global chrome */

function removeUserAgentFromRequests() {
  const extensionPath = chrome.extension.getURL("");

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      const isExtensionInitiator =
        extensionPath.indexOf(details.initiator) !== -1;
      const requestHeaders = isExtensionInitiator
        ? details.requestHeaders.filter(header => header.name !== "User-Agent")
        : details.requestHeaders;

      return {
        requestHeaders
      };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
  );
}

export default removeUserAgentFromRequests;
