import 'rxjs';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import actions from './actions';
import reducers from './reducers';
import epics from './epics';
import { logger } from 'redux-logger'

const epicMiddleware = createEpicMiddleware();
const enhancer = applyMiddleware(epicMiddleware, logger);
const store = createStore(reducers, enhancer);

epicMiddleware.run(epics);

export { actions };
export * from './selectors';
export default store;
