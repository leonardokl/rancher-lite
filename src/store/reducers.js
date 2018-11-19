import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";
import actions from "./actions";
import servers from "../tmp/servers";

export default combineReducers({
  loading: handleActions(
    {
      [actions.showLoader]: () => true,
      [actions.hideLoader]: () => false
    },
    false
  ),

  servers: handleAction(
    actions.addServer,
    (state, { payload }) => state.concat(payload),
    servers
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
