import{lazyReducerEnhancer}from"../node_modules/pwa-helpers/lazy-reducer-enhancer.js";import{app}from"./elements/app/Redux/reducers/app_reducers.js";import{createStore,compose,combineReducers,applyMiddleware}from"../node_modules/redux/es/redux.js";import thunk from"../node_modules/redux-thunk/es/index.js";// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;export const store=createStore(state=>state,devCompose(lazyReducerEnhancer(combineReducers),applyMiddleware(thunk)));store.addReducers({app});import tabsReducer from"./elements/app/Redux/reducers/tabs_reducers.js";store.addReducers({tabs:tabsReducer});import incidentsReducer from"./elements/app/Redux/reducers/incidents_reducers.js";store.addReducers({incidents:incidentsReducer});import sopReducer from"./elements/app/Redux/reducers/sop_reducers.js";store.addReducers({SOPS:sopReducer});import notificationsReducer from"./elements/app/Redux/reducers/notifications_reducers.js";store.addReducers({notifications:notificationsReducer});import esignReducer from"./elements/app/Redux/reducers/esign-reducers.js";store.addReducers({esignDialog:esignReducer});import confirmUserReducer from"./elements/app/Redux/reducers/confirmuser-reducers.js";store.addReducers({confirmUserDialog:confirmUserReducer});import procedureManagementReducer from"./elements/modules/procedures/02Redux/procedures_reducers.js";store.addReducers({sateliteProcedures:procedureManagementReducer});import processUsReducer from"./elements/modules/process-us/02Redux/process-us_reducers.js";store.addReducers({processUs:processUsReducer});import emDemoAReducer from"./elements/modules/em-demo-a/02Redux/em-demo-a_reducers.js";store.addReducers({emDemoA:emDemoAReducer});/*
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