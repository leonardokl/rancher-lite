import pick from "lodash/pick";
import keyBy from "lodash/keyBy";
import sortBy from "lodash/sortBy";
import getUserPreference from "../utils/getUserPreference";
import notification from "../utils/notification";
import filterServiceChange from "../utils/filterServiceChange";
import actions from "./actions";
import {
  getApi,
  getSelectedProject,
  getSelectedService,
  getSelectedStack,
  getProjects,
  getStacks
} from "./selectors";

export const fetchProjects = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const projects = getProjects(state);

  if (state.entities.servers[state.selectedServer]) {
    return dispatch(actions.selectDefaultProject(projects));
  }

  dispatch(actions.showLoader());

  try {
    const userPreferencesRequest = api.get(
      "userpreferences?name=defaultProjectId"
    );
    const projectsRequest = api.get("projects");
    const userPreferences = await userPreferencesRequest;
    const projects = await projectsRequest;
    const defaultProjectId = getUserPreference(
      userPreferences,
      "defaultProjectId"
    );
    const projectsData = projects.data.map(project => ({
      ...project,
      _id: `${state.selectedServer}/${project.id}`,
      default: project.id === defaultProjectId,
      stacks: []
    }));
    const result = projectsData.map(i => i._id);
    const entities = {
      servers: {
        [state.selectedServer]: {
          projects: result
        }
      },
      projects: keyBy(projectsData, "_id")
    };

    if (!projectsData.length) {
      dispatch(actions.hideLoader());
    }

    dispatch(
      actions.setProjects({
        result,
        entities,
        projects: projectsData
      })
    );

    if (!getSelectedProject(getState())) {
      dispatch(actions.selectDefaultProject(projectsData));
    }
  } catch (ex) {
    console.error(ex);
    dispatch(actions.hideLoader());
    notification.error(ex.message);
  }
};

export const fetchStacks = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const selectedProject = getSelectedProject(state);
  const stacks = getStacks(state);

  if (stacks.length) {
    return dispatch(actions.hideLoader());
  }

  dispatch(actions.showLoader());

  try {
    const response = await api.get(
      `projects/${selectedProject.id}/stacks?limit=-1&sort=name`
    );
    const stacksData = response.data.map(stack => ({
      ...stack,
      _id: `${state.selectedServer}/${stack.id}`,
      services: []
    }));
    const result = stacksData.map(i => i._id);
    const entities = {
      projects: {
        [selectedProject._id]: {
          stacks: result
        }
      },
      stacks: keyBy(stacksData, "_id")
    };

    dispatch(
      actions.setStacks({
        entities,
        result
      })
    );
  } catch (ex) {
    console.error(ex);
    notification.error(ex.message);
  } finally {
    dispatch(actions.hideLoader());
  }
};

export const subscribeToResourceChange = () => (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const selectedProject = getSelectedProject(state);

  const socket = api.subscribeToResourceChange(selectedProject.id);

  socket.addEventListener("open", () => console.log("Socket opened"));

  socket.addEventListener("close", () => console.log("Socket closed"));

  socket.addEventListener(
    "message",
    filterServiceChange(service => {
      const _id = `${state.selectedServer}/${service.id}`;
      const serviceData = {
        ...service,
        _id
      };

      if (getState().entities.services[_id]) {
        dispatch(actions.updateService(serviceData));
      }
    })
  );

  return socket;
};

export const fetchServices = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const stack = getSelectedStack(state);
  const selectedProject = getSelectedProject(state);

  dispatch(actions.showLoader());

  try {
    const response = await api.get(
      `projects/${selectedProject.id}/stacks/${
        stack.id
      }/services?limit=-1&sort=name`
    );
    const servicesData = sortBy(
      response.data.map(service => ({
        ...service,
        _id: `${state.selectedServer}/${service.id}`
      })),
      "name"
    );
    const result = servicesData.map(i => i._id);
    const entities = {
      stacks: {
        [stack._id]: {
          services: result
        }
      },
      services: keyBy(servicesData, "_id")
    };

    dispatch(
      actions.setServices({
        result,
        entities
      })
    );
  } catch (ex) {
    console.error(ex);
    dispatch(actions.setServices([]));
    notification.error(ex.message);
  } finally {
    dispatch(actions.hideLoader());
  }
};

export const restartService = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const selectedProject = getSelectedProject(state);
  const service = getSelectedService(state);
  const form = {
    rollingRestartStrategy: {
      batchSize: 1,
      intervalMillis: 2000
    }
  };

  try {
    const response = await api.post(
      `projects/${selectedProject.id}/services/${service.id}?action=restart`,
      {
        body: JSON.stringify(form)
      }
    );
    const serviceData = {
      ...response,
      _id: `${state.selectedServer}/${response.id}`
    };

    dispatch(actions.updateService(serviceData));
  } catch (ex) {
    console.error(ex);
    notification.error(ex.message);
  }
};

export const finishServiceUpgrade = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const selectedProject = getSelectedProject(state);
  const service = getSelectedService(state);

  try {
    const response = await api.post(
      `projects/${selectedProject.id}/services/${
        service.id
      }?action=finishupgrade`
    );
    const serviceData = {
      ...response,
      _id: `${state.selectedServer}/${response.id}`
    };

    dispatch(actions.updateService(serviceData));
  } catch (ex) {
    console.error(ex);
    notification.error(ex.message);
  }
};

export const upgradeService = image => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const selectedProject = getSelectedProject(state);
  const service = getSelectedService(state);
  const isDockerImage = /^docker:/.test(service.launchConfig.imageUuid);
  const imageUuid = isDockerImage ? `docker:${image}` : image;
  const inServiceStrategy = pick(service.upgrade.inServiceStrategy, [
    "batchSize",
    "intervalMillis",
    "launchConfig",
    "secondaryLaunchConfigs",
    "startFirst"
  ]);
  const launchConfig = {
    ...inServiceStrategy.launchConfig,
    imageUuid
  };
  const form = {
    inServiceStrategy: { ...inServiceStrategy, launchConfig }
  };

  try {
    const response = await api.post(
      `projects/${selectedProject.id}/services/${service.id}?action=upgrade`,
      {
        body: JSON.stringify(form)
      }
    );
    const serviceData = {
      ...response,
      _id: `${state.selectedServer}/${response.id}`
    };

    dispatch(actions.updateService(serviceData));
  } catch (ex) {
    console.error(ex);
    notification.error(ex.message);
    throw ex;
  }
};
