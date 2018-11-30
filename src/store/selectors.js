import get from "lodash/get";
import createRancherApi from "../utils/createRancherApi";
import searchByName from "../utils/searchByName";

export const getSelectedServer = state =>
  state.servers.find(server => server.id === state.selectedServer);

export const getProjects = state => {
  const projectIds = get(
    state,
    `entities.servers.${state.selectedServer}.projects`,
    []
  );
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

export const getStacks = (state, query) => {
  const stackIds = get(
    state,
    `entities.projects.${state.selectedProject}.stacks`,
    []
  );
  const stacks = stackIds.map(id => state.entities.stacks[id]);

  if (!query) {
    return stacks;
  }

  return searchByName(stacks, query);
};

export const getSelectedStack = state =>
  state.entities.stacks[state.selectedStack];

export const getSelectedService = state =>
  state.entities.services[state.selectedService];

export const getFilteredServices = (state, query) => {
  const serviceIds = get(
    state,
    `entities.stacks.${state.selectedStack}.services`,
    []
  );
  const services = serviceIds.map(id => state.entities.services[id]);

  if (!query) {
    return services;
  }

  return searchByName(services, query);
};
