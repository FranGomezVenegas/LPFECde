define(["exports","../node_modules/pwa-helpers/lazy-reducer-enhancer.js","./elements/app/Redux/reducers/app_reducers.js","../node_modules/redux/es/redux.js","../node_modules/redux-thunk/es/index.js","./elements/app/Redux/reducers/tabs_reducers.js","./elements/app/Redux/reducers/incidents_reducers.js","./elements/app/Redux/reducers/sop_reducers.js","./elements/app/Redux/reducers/notifications_reducers.js","./elements/app/Redux/reducers/esign-reducers.js","./elements/app/Redux/reducers/confirmuser-reducers.js","./elements/modules/procedures/02Redux/procedures_reducers.js","./elements/modules/process-us/02Redux/process-us_reducers.js","./elements/modules/em-demo-a/02Redux/em-demo-a_reducers.js"],function(_exports,_lazyReducerEnhancer,_app_reducers,_redux,_index,_tabs_reducers,_incidents_reducers,_sop_reducers,_notifications_reducers,_esignReducers,_confirmuserReducers,_procedures_reducers,_processUs_reducers,_emDemoA_reducers){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.store=void 0;_index=babelHelpers.interopRequireDefault(_index);_tabs_reducers=babelHelpers.interopRequireDefault(_tabs_reducers);_incidents_reducers=babelHelpers.interopRequireDefault(_incidents_reducers);_sop_reducers=babelHelpers.interopRequireDefault(_sop_reducers);_notifications_reducers=babelHelpers.interopRequireDefault(_notifications_reducers);_esignReducers=babelHelpers.interopRequireDefault(_esignReducers);_confirmuserReducers=babelHelpers.interopRequireDefault(_confirmuserReducers);_procedures_reducers=babelHelpers.interopRequireDefault(_procedures_reducers);_processUs_reducers=babelHelpers.interopRequireDefault(_processUs_reducers);_emDemoA_reducers=babelHelpers.interopRequireDefault(_emDemoA_reducers);// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||_redux.compose,store=(0,_redux.createStore)(state=>state,devCompose((0,_lazyReducerEnhancer.lazyReducerEnhancer)(_redux.combineReducers),(0,_redux.applyMiddleware)(_index.default)));_exports.store=store;store.addReducers({app:_app_reducers.app});store.addReducers({tabs:_tabs_reducers.default});store.addReducers({incidents:_incidents_reducers.default});store.addReducers({SOPS:_sop_reducers.default});store.addReducers({notifications:_notifications_reducers.default});store.addReducers({esignDialog:_esignReducers.default});store.addReducers({confirmUserDialog:_confirmuserReducers.default});store.addReducers({sateliteProcedures:_procedures_reducers.default});store.addReducers({processUs:_processUs_reducers.default});store.addReducers({emDemoA:_emDemoA_reducers.default});/*
import processEuReducer from './elements/modules/pr-eu/02Redux/pr-eu_reducers.js';
  store.addReducers({
  processEu: processEuReducer
});
*/ // import emDemobReducer from './elements/modules/em-demo-b/02Redux/reducers.js';
//   store.addReducers({
//   emDemoB: emDemobReducer
// });
// import emDemoTestReducer from './elements/modules/em-DemoTest/02Redux/reducers.js';
//   store.addReducers({
//   emDemoTest: emDemoTestReducer
// });
});