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
    post: async (pathName, data) => {
      const opts = {
        method: "POST",
        ...options,
        body: data ? JSON.stringify(data) : undefined
      };

      const response = await fetch(`${baseURL}${pathName}`, opts);
      const json = await response.json();

      if (!validateStatus(response)) {
        throw new Error((json && json.message) || response.statusText);
      }

      return json;
    },
    subscribeToResourceChange: projectId => {
      const { host } = new URL(url);
      const wsUrl = `wss://${host}/v2-beta/projects/${projectId}/subscribe?eventNames=resource.change&token=${btoa(
        auth
      )}`;

      return new WebSocket(wsUrl);
    }
  };
}

export default createRancherApi;
