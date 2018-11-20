import createRancherApi from "../utils/createRancherApi";

export const getSelectedServer = state =>
  state.servers.find(server => server.id === state.selectedServer);

export const getApi = state => {
  const server = getSelectedServer(state);

  if (server) {
    return createRancherApi(server);
  }
};

export const getWebsocketUrl = state => {
  const server = getSelectedServer(state);
  const { host } = new URL(server.url);

  return `wss://${server.accessKey}:${
    server.secretKey
  }@${host}/v2-beta/projects/${
    state.selectedProject
  }/subscribe?eventNames=resource.change`;
};

export const getFilteredStacks = (state, query) => {
  if (!query) {
    return state.stacks;
  }

  return state.stacks.filter(stack => stack.name.indexOf(query) !== -1);
};

export const getSelectedStack = state =>
  state.stacks.find(stack => stack.id === state.selectedStack);

export const getSelectedService = state =>
  state.servicesById[state.selectedService];

export const getFilteredServices = (state, query) => {
  const services = state.servicesIds.map(id => state.servicesById[id]);

  if (!query) {
    return services;
  }

  return services.filter(service => service.name.indexOf(query) !== -1);
};
