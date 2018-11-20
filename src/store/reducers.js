import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";
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
      }
    },
    null
  ),

  projects: handleAction(
    actions.setProjects,
    (state, { payload }) => payload,
    []
  ),
  selectedProject: handleActions(
    {
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
      [actions.selectServer]: () => null,
      [actions.selectProject]: () => null,
      [actions.selectStack]: (state, { payload }) => payload
    },
    null
  ),

  services: handleAction(
    actions.setServices,
    (state, { payload }) => payload,
    []
  ),

  selectedService: handleActions(
    {
      [actions.selectServer]: () => null,
      [actions.selectProject]: () => null,
      [actions.selectStack]: () => null,
      [actions.selectService]: (state, { payload }) => payload
    },
    null
  )
});
