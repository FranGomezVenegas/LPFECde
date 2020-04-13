define(["exports","require","../actions/tabs_actions.js","../../../../config/api-config.js"],function(_exports,_require,_tabs_actions,_apiConfig){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.default=void 0;_require=babelHelpers.interopRequireWildcard(_require);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object))}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});return keys}function _objectSpread(target){for(var i=1,source;i<arguments.length;i++){source=null!=arguments[i]?arguments[i]:{};if(i%2){ownKeys(source,!0).forEach(function(key){babelHelpers.defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}const InitialTabState={tabs:[],tabIndex:0,currentTab:"",currentTab_sops:[],currTabEsignRequired:!1,currTabConfirmUserRequired:!1},eventExists=(tabs,tab)=>{return tabs.find(e=>e.tabName===tab.tabName)},tabsReducer=(state=InitialTabState,action)=>{switch(action.type){case _tabs_actions.ADD_SYSTEM_TAB:var tabUrl=_apiConfig.systemTabContentUrl;tabUrl=tabUrl+action.tab.lp_frontend_page_name;//console.log('ADD_SYSTEM_TAB', tabUrl);
new Promise((res,rej)=>_require.default([tabUrl],res,rej));//import('../../01-main-views/sop/my-sops.js');
var found=state.tabs.find(function(tab){//console.log('tab reducer find', tab.tabName, action.tab.tabName);
return tab.tabName==action.tab.tabName});//console.log('tab reducer', action, state, found);
if(found==void 0){return _objectSpread({},state,{tabIndex:state.tabIndex+1,tabs:[...state.tabs,action.tab]})}else{return _objectSpread({},state,{currentTab:action.currentTab})}case _tabs_actions.ADD_TAB:var tabUrl=_apiConfig.tabContentUrl;tabUrl=tabUrl.replace("#ModuleName",action.tab.procedure.name);tabUrl=tabUrl.replace("#PageName",action.tab.tabName);//tabUrl = tabUrl.replace('#PageName', action.tab.procedure.name+'-'+action.tab.lp_frontend_page_name);
//console.log('ADD_TAB', 'tabUrl', tabUrl);              
new Promise((res,rej)=>_require.default([tabUrl],res,rej));var found=state.tabs.find(function(tab){return tab.tabName==action.tab.tabName});if(found==void 0){return _objectSpread({},state,{tabIndex:state.tabIndex+1,tabs:[...state.tabs,action.tab]})}else{return _objectSpread({},state,{currentTab:action.currentTab})}case _tabs_actions.CLOSE_TAB:let tabI,newCurrentTab;if(1>=state.tabs.length){newCurrentTab="";action.tabName="";// console.log('CLOSE_TAB for 0 or 1 tab');//, 'action', action, 'state.tabIndex', state.tabIndex);
return{tabIndex:0,currentTab:"",tabs:[],currTabEsignRequired:!1,currTabConfirmUserRequired:!1}}else{if(0>=action.tabIndex){tabI=1}else if(0<action.tabIndex&&action.tabIndex<=state.tabs.length-1){tabI=action.tabIndex-1}else{tabI=state.tabIndex-1}newCurrentTab=state.tabs[tabI].tabName;//console.log('CLOSE TAB > 1', 'action', action, 'newCurrentTab', newCurrentTab);
return _objectSpread({},state,{tabIndex:tabI,currentTab:newCurrentTab,tabs:state.tabs.filter(tab=>{return tab.tabName!=action.tabName})})}case _tabs_actions.SET_CURRENT_TAB:return _objectSpread({},state,{currentTab:action.currentTab.tabName,currentTab_sops:action.currentTab.sops,currTabEsignRequired:action.currentTab.currTabEsignRequired,currTabConfirmUserRequired:action.currentTab.currTabConfirmUserRequired});case _tabs_actions.DO_LOGOUT_TAB:return{tabs:[],tabIndex:0,currentTab:"",currTabEsignRequired:!1,currTabConfirmUserRequired:!1};default:return state;}};var _default=tabsReducer;_exports.default=_default});