/* global chrome */

function setItem(key, item) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: item }, () => {
      return resolve();
    });
  });
}

function getItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, response => {

      return resolve(response[key]);
    });
  });
}

function removeItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(key, () => {

      return resolve();
    });
  });
}

export default {
  setItem,
  getItem,
  removeItem
}