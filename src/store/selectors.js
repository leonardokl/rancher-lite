import createRancherApi from "../utils/createRancherApi";

export const getSelectedServer = state =>
  state.servers.find(server => server.id === state.selectedServer);

export const getApi = state => {
  const server = getSelectedServer(state);

  if (server) {
    return createRancherApi(server);
  }
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
  state.services.find(service => service.id === state.selectedService);

export const getFilteredServices = (state, query) => {
  if (!query) {
    return state.services;
  }

  return state.services.filter(service => service.name.indexOf(query) !== -1);
};
