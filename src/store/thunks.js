import sortBy from "lodash/sortBy";
import pick from "lodash/pick";
import actions from "./actions";
import { getApi, getSelectedStack, getSelectedService } from "./selectors";
import notification from "../utils/notification";

export const fetchProjects = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);

  dispatch(actions.showLoader());

  try {
    const response = await api.get("projects");

    if (!response.data.length) {
      dispatch(actions.hideLoader());
    }

    dispatch(actions.setProjects(response.data));
  } catch (ex) {
    console.error(ex);
    dispatch(actions.hideLoader());
    notification.error(ex.message);
  }
};

export const fetchStacks = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);

  dispatch(actions.showLoader());

  try {
    const response = await api.get(
      `projects/${state.selectedProject}/stacks?limit=-1&sort=name`
    );

    dispatch(actions.setStacks(response.data));
  } catch (ex) {
    console.error(ex);
    dispatch(actions.setStacks([]));
    notification.error(ex.message);
  } finally {
    dispatch(actions.hideLoader());
  }
};

export const subscribeToResourceChange = () => (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);

  const socket = api.subscribeToResourceChange(state.selectedProject);

  socket.addEventListener("open", () => console.log("Socket opened"));

  socket.addEventListener("close", () => console.log("Socket closed"));

  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    const { resourceType, name, data } = message;

    if (name === "resource.change" && data && resourceType === "service") {
      const { resource } = data;

      dispatch(actions.updateService(resource));
    }
  });

  return socket;
};

export const fetchServices = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const stack = getSelectedStack(state);

  dispatch(actions.showLoader());

  try {
    const response = await api.get(
      `projects/${state.selectedProject}/stacks/${
        stack.id
      }/services?limit=-1&sort=name`
    );

    dispatch(actions.setServices(sortBy(response.data, "name")));
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
  const service = getSelectedService(state);
  const form = {
    rollingRestartStrategy: {
      batchSize: 1,
      intervalMillis: 2000
    }
  };

  try {
    const response = await api.post(
      `projects/${state.selectedProject}/services/${service.id}?action=restart`,
      {
        body: JSON.stringify(form)
      }
    );

    dispatch(actions.updateService(response));
  } catch (ex) {
    console.error(ex);
    notification.error(ex.message);
  }
};

export const finishServiceUpgrade = () => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
  const service = getSelectedService(state);

  try {
    const response = await api.post(
      `projects/${state.selectedProject}/services/${
        service.id
      }?action=finishupgrade`
    );

    dispatch(actions.updateService(response));
  } catch (ex) {
    console.error(ex);
    notification.error(ex.message);
  }
};
export const upgradeService = image => async (dispatch, getState) => {
  const state = getState();
  const api = getApi(state);
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
      `projects/${state.selectedProject}/services/${
        state.selectedService
      }?action=upgrade`,
      {
        body: JSON.stringify(form)
      }
    );

    dispatch(actions.updateService(response));
  } catch (ex) {
    console.error(ex);
    notification.error(ex.message);
    throw ex;
  }
};
