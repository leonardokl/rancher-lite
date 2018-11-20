function validateStatus(response) {
  return response.status >= 200 && response.status < 300;
}

function createRancherApi({ url, accessKey, secretKey }) {
  const baseURL = `${url}/v2-beta/`;
  const auth = `${accessKey}:${secretKey}`;
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${btoa(auth)}`,
      "X-Api-Csrf": process.env.REACT_APP_CSRF_TOKEN || "",
      Origin: "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*"
    }
  };

  return {
    get: async pathName => {
      const response = await fetch(`${baseURL}${pathName}`, options);
      const json = await response.json();

      if (!validateStatus(response)) {
        throw new Error((json && json.message) || response.statusText);
      }

      return json;
    },
    post: async (pathName, opts = {}) => {
      const response = await fetch(`${baseURL}${pathName}`, {
        ...options,
        ...opts,
        method: "POST"
      });
      const json = await response.json();

      if (!validateStatus(response)) {
        throw new Error((json && json.message) || response.statusText);
      }

      return json;
    }
  };
}

export default createRancherApi;
