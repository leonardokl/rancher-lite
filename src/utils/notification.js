/* global chrome */

function notification(title, message) {
  const options = {
    iconUrl: "logo128x128.png",
    type: "basic",
    title,
    message
  };

  chrome.notifications.create(null, options);
}

function successNotification(message) {
  notification("Success", message);
}

function errorNotification(message = 'Unknown Error') {
  notification("Error", message);
}

notification.success = successNotification;
notification.error = errorNotification;

export default notification;
