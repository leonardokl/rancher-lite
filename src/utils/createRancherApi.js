function createRancherApi({ url, accessKey, secretKey }) {
  const baseURL = `${url}/v2-beta/`;
  const auth = `${accessKey}:${secretKey}`;
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${btoa(auth)}`,
      "X-Api-Csrf": "66E0A423F1",
      'Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
    }
  };

  return {
    get: async pathName => {
      const response = await fetch(`${baseURL}${pathName}`, options);

      console.log('HEADERS');
      console.log(response.headers.get('Content-Type'));
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
