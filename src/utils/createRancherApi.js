function createRancherApi({ url, accessKey, secretKey }) {
  const baseURL = `${url}/v2-beta/`;
  const auth = `${accessKey}:${secretKey}`;
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${btoa(auth)}`,
      "X-Api-Csrf": "",
      'Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
    }
  };

  return {
    get: async pathName => {
      const response = await fetch(`${baseURL}${pathName}`, options);

      return response.json();
    },
    post: async (pathName, opts = {}) => {
      const response = await fetch(`${baseURL}${pathName}`, {
        ...options,
        ...opts,
        method: "POST"
      });

      return response.json();
    }
  };
}

export default createRancherApi;
