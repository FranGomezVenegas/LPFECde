// For ADD_SYSTEM_TAB, two things required, example below:
// In app_config:
// export const pendingSOPTab={
//   lp_frontend_page_name: 'sop/my-pending-sops.js',        
//   tabName: 'sop-myPendingSops',
//   tabLabel_en: 'My Pending SOPs',
//   tabLabel_es: 'Mis PNT Pendientes',
//   procedure:'sop',
//   tabEsignRequired: false, tabConfirmUserRequired: false
// }
// in app-center-tabs
// <my-pending-sops tab-index="{{tabIndex}}" name="sop-myPendingSops"> </my-pending-sops>
import{ADD_TAB,ADD_SYSTEM_TAB,CLOSE_TAB,SET_CURRENT_TAB,DO_LOGOUT_TAB}from"../actions/tabs_actions.js";import{systemTabContentUrl,tabContentUrl}from"../../../../config/api-config.js";const InitialTabState={tabs:[],tabIndex:0,currentTab:"",currentTab_sops:[],currTabEsignRequired:!1,currTabConfirmUserRequired:!1},eventExists=(tabs,tab)=>{return tabs.find(e=>e.tabName===tab.tabName)},tabsReducer=(state=InitialTabState,action)=>{switch(action.type){case ADD_SYSTEM_TAB:var tabUrl=systemTabContentUrl;tabUrl=tabUrl+action.tab.lp_frontend_page_name;//console.log('ADD_SYSTEM_TAB', tabUrl);
import(tabUrl);//import('../../01-main-views/sop/my-sops.js');
var found=state.tabs.find(function(tab){//console.log('tab reducer find', tab.tabName, action.tab.tabName);
return tab.tabName==action.tab.tabName});//console.log('tab reducer', action, state, found);
if(found==void 0){return{...state,tabIndex:state.tabIndex+1,tabs:[...state.tabs,action.tab]}}else{return{...state,currentTab:action.currentTab}}case ADD_TAB:var tabUrl=tabContentUrl;tabUrl=tabUrl.replace("#ModuleName",action.tab.procedure.name);tabUrl=tabUrl.replace("#PageName",action.tab.tabName);//tabUrl = tabUrl.replace('#PageName', action.tab.procedure.name+'-'+action.tab.lp_frontend_page_name);
//console.log('ADD_TAB', 'tabUrl', tabUrl);              
import(tabUrl);var found=state.tabs.find(function(tab){return tab.tabName==action.tab.tabName});if(found==void 0){return{...state,tabIndex:state.tabIndex+1,tabs:[...state.tabs,action.tab]}}else{return{...state,currentTab:action.currentTab}}case CLOSE_TAB:let tabI,newCurrentTab;if(1>=state.tabs.length){newCurrentTab="";action.tabName="";// console.log('CLOSE_TAB for 0 or 1 tab');//, 'action', action, 'state.tabIndex', state.tabIndex);
return{tabIndex:0,currentTab:"",tabs:[],currTabEsignRequired:!1,currTabConfirmUserRequired:!1}}else{if(0>=action.tabIndex){tabI=1}else if(0<action.tabIndex&&action.tabIndex<=state.tabs.length-1){tabI=action.tabIndex-1}else{tabI=state.tabIndex-1}newCurrentTab=state.tabs[tabI].tabName;//console.log('CLOSE TAB > 1', 'action', action, 'newCurrentTab', newCurrentTab);
return{...state,tabIndex:tabI,currentTab:newCurrentTab,tabs:state.tabs.filter(tab=>{return tab.tabName!=action.tabName})}}case SET_CURRENT_TAB:return{...state,currentTab:action.currentTab.tabName,currentTab_sops:action.currentTab.sops,currTabEsignRequired:action.currentTab.currTabEsignRequired,currTabConfirmUserRequired:action.currentTab.currTabConfirmUserRequired};case DO_LOGOUT_TAB:return{tabs:[],tabIndex:0,currentTab:"",currTabEsignRequired:!1,currTabConfirmUserRequired:!1};default:return state;}};export default tabsReducer;