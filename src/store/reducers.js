import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import mergeWith from 'lodash/mergeWith';
import actions from "./actions";

const defaultEntities = {
  servers: {},
  projects: {},
  stacks: {},
  services: {}
};

function mergeStrategy(objValue, srcValue, key) {
  if (key === 'actions') {
    return srcValue;
  }
}

const entities = (state = defaultEntities, { payload }) => {
  if (payload && payload.entities) {
    return mergeWith({}, state, payload.entities, mergeStrategy);
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
    },
    ''
  ),

  selectedProject: handleActions(
    {
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
      [actions.selectServer]: () => null,
      [actions.selectProject]: () => null,
      [actions.selectStack]: (state, { payload }) => payload
    },
    null
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
