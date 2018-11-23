/* global chrome */

function beforeSendHeaders() {
  const extensionPath = chrome.extension.getURL("");

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      const isExtensionInitiator =
        extensionPath.indexOf(details.initiator) !== -1;
      const requestHeaders = isExtensionInitiator
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
