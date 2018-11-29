import get from "lodash/get";
import createRancherApi from "../utils/createRancherApi";
import searchByName from "../utils/searchByName";

export const getSelectedServer = state =>
  state.servers.find(server => server.id === state.selectedServer);

export const getProjects = state => {
  const projectIds = get(state, `entities.servers.${state.selectedServer}.projects`, []);
  const projects = projectIds.map(id => state.entities.projects[id]);

  return projects;
};

export const getSelectedProject = state =>
  state.entities.projects[state.selectedProject];

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

  return searchByName(state.stacks, query);
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

  return searchByName(services, query);
};
