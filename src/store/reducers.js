import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";
import keyBy from "lodash/keyBy";
import merge from 'lodash/merge';
import actions from "./actions";

const defaultEntities = {
  servers: {},
  projects: {},
  stacks: {},
  services: {}
};

const entities = (state = defaultEntities, { payload }) => {
  if (payload && payload.entities) {
    return merge({}, state, payload.entities)
  }

  return state
}

export default combineReducers({
  entities,

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

  selectedProject: handleActions(
    {
      [actions.manageServers]: () => null,
      [actions.selectServer]: () => null,
      [actions.selectProject]: (state, { payload }) => payload,
      [actions.selectDefaultProject]: (state, { payload }) => {
        const defaultProject = payload.find(i => i.default);

        if (defaultProject) return defaultProject._id;
        if (payload.length) return payload[0]._id;

        return null;
      }
    },
    null
  ),

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
