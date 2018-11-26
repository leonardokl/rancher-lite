import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";
import keyBy from "lodash/keyBy";
import actions from "./actions";

export default combineReducers({
  loading: handleActions(
    {
      [actions.showLoader]: () => true,
      [actions.hideLoader]: () => false
    },
    false
  ),

  addServerForm: handleActions(
    {
      [actions.updateAddServerForm]: (state, { payload }) => ({
        ...state,
        ...payload
      }),
      [actions.selectServer]: () => ({}),
      [actions.resetAddServerForm]: () => ({}),
      [actions.addServer]: () => ({})
    },
    {}
  ),

  servers: handleActions(
    {
      [actions.addServer]: (state, { payload }) => state.concat(payload),
      [actions.removeServer]: (state, { payload }) =>
        state.filter(server => server.id !== payload)
    },
    []
  ),

  selectedServer: handleActions(
    {
      [actions.selectServer]: (state, { payload }) => payload,
      [actions.addServer]: (state, { payload }) => payload.id,
      [actions.manageServers]: () => "manageServers"
    },
    null
  ),

  projects: handleActions(
    {
      [actions.setProjects]: (state, { payload }) => payload,
      [actions.manageServers]: () => []
    },
    []
  ),
  selectedProject: handleActions(
    {
      [actions.manageServers]: () => null,
      [actions.selectServer]: () => null,
      [actions.selectProject]: (state, { payload }) => payload,
      [actions.setProjects]: (state, { payload }) => {
        const defaultProject = payload.find(i => i.default);

        if (defaultProject) return defaultProject.id;
        if (payload.length) return payload[0].id;

        return null;
      }
    },
    null
  ),

  stacks: handleAction(actions.setStacks, (state, { payload }) => payload, []),
  selectedStack: handleActions(
    {
      [actions.manageServers]: () => null,
      [actions.selectServer]: () => null,
      [actions.selectProject]: () => null,
      [actions.selectStack]: (state, { payload }) => payload
    },
    null
  ),

  servicesIds: handleAction(
    actions.setServices,
    (state, { payload }) => payload.map(service => service.id),
    []
  ),

  servicesById: handleActions(
    {
      [actions.setServices]: (state, { payload }) => keyBy(payload, "id"),
      [actions.updateService]: (state, { payload }) => ({
        ...state,
        [payload.id]: payload
      })
    },
    []
  ),

  selectedService: handleActions(
    {
      [actions.manageServers]: () => null,
      [actions.selectServer]: () => null,
      [actions.selectProject]: () => null,
      [actions.selectStack]: () => null,
      [actions.selectService]: (state, { payload }) => payload
    },
    null
  )
});
