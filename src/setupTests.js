global.chrome = {
  notifications: {
    create() {}
  },
  storage: {
    sync: {
      get: (_, cb) => {
        cb();
      },
      set: (_, cb) => {
        cb();
      },
      remove: (_, cb) => {
        cb();
      }
    }
  },
  webRequest: {
    onBeforeSendHeaders: {
      addListener() {}
    }
  },
  extension: {
    getURL: () => 'test'
  }
};
