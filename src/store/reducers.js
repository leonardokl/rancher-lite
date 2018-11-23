import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";
import keyBy from "lodash/keyBy";
import actions from "./actions";

export default combineReducers({
  loading: handleActions(
    {
      [actions.showLoader]: () => true,
      [actions.hideLoader]: () => false,
      [actions.setStacks]: () => false,
      [actions.setServices]: () => false,
      [actions.setProjects]: () => false
    },
    false
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
      [actions.addServer]: (state, { payload }) => {
        if (!state) return payload.id;

        return state;
      },
      [actions.manageServers]: () => null
    },
    null
  ),

  projects: handleActions(
    {
      [actions.setProjects]: (state, { payload }) => payload,
      [actions.manageServers]: () => [],
    },
    []
  ),
  selectedProject: handleActions(
    {
      [actions.manageServers]: () => null,
      [actions.selectServer]: () => null,
      [actions.selectProject]: (state, { payload }) => payload,
      [actions.setProjects]: (state, { payload }) => {
        if (payload.length) return payload[payload.length - 1].id;

        return state;
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
