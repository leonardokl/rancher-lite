// import 'rxjs';
import { combineEpics } from 'redux-observable';
// import { pathEq } from 'lodash/fp';
// import actions from './actions';

// const showLogin = action$ =>
//   action$
//     .ofType(actions.addServer)
//     .filter(pathEq('payload.responseStatus', 401))
//     .mapTo(actions.showLogin());

export default combineEpics(
  // showLogin,
);
