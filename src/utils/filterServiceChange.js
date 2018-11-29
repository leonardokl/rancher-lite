const filterServiceChange = cb => event => {
  try {
    const message = JSON.parse(event.data);
    const { resourceType, name, data } = message;

    if (name === "resource.change" && data && resourceType === "service") {
      const { resource } = data;

      cb(resource);
    }
  } catch (ex) {}
};

export default filterServiceChange;
