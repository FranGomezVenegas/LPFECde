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

import {ADD_TAB, ADD_SYSTEM_TAB, CLOSE_TAB, SET_CURRENT_TAB, DO_LOGOUT_TAB} from '../actions/tabs_actions.js';
import {systemTabContentUrl, tabContentUrl} from '../../../../config/api-config.js';

  const InitialTabState = {
    tabs: [],
    tabIndex:0, 
    currentTab:'',
    currentTab_sops: [],
    currTabEsignRequired: false,
    currTabConfirmUserRequired: false
  };
  
  const eventExists = (tabs, tab) => {
    return tabs.find((e) => e.tabName === tab.tabName);
  }

  const tabsReducer = (state = InitialTabState, action) => {
    switch(action.type) {
      case ADD_SYSTEM_TAB:
        var tabUrl = systemTabContentUrl;
        tabUrl = tabUrl + action.tab.lp_frontend_page_name;
        //console.log('ADD_SYSTEM_TAB', tabUrl);

        import(tabUrl);
        //import('../../01-main-views/sop/my-sops.js');
        var found = state.tabs.find(function(tab) {
          //console.log('tab reducer find', tab.tabName, action.tab.tabName);
          return tab.tabName == action.tab.tabName;
        });      
      //console.log('tab reducer', action, state, found);
      if (found == undefined){
        return {
          ...state,
          tabIndex: state.tabIndex + 1,
          tabs: [
            ...state.tabs,
            action.tab           
          ]
        }
      }else{
        return {
          ...state,
          currentTab: action.currentTab
        }
      }
      case ADD_TAB:
        var tabUrl = tabContentUrl;
        tabUrl = tabUrl.replace('#ModuleName', action.tab.procedure.name);
        tabUrl = tabUrl.replace('#PageName', action.tab.procedure.name+'-'+action.tab.lp_frontend_page_name);
        //console.log('ADD_TAB', 'tabUrl', tabUrl);              
        import(tabUrl);
        var found = state.tabs.find(function(tab) {
          return tab.tabName == action.tab.tabName;
        });      
      if (found == undefined){
        return {
          ...state,
          tabIndex: state.tabIndex + 1,
          tabs: [
            ...state.tabs,
            action.tab           
          ]
        }
      }else{
        return {
          ...state,
          currentTab: action.currentTab
        }
      }
      case CLOSE_TAB:
        //console.log('CLOSE_TAB', action);
        let tabI;
        if (action.tabIndex==0){
          tabI = 0; 
          if (state.tabIndex==1) return InitialTabState;
        }else{tabI=action.tabIndex-1}
        return {
          ...state,
          tabIndex: state.tabIndex - 1,          
          currentTab: state.tabs[tabI].tabName,
          tabs: state.tabs.filter((tab) => {
            
            //console.log('CLOSE_TAB FILTER', tab, action);
            return (tab.tabName != action.tabName);
          })
        }
      case SET_CURRENT_TAB:
        return {
          ...state,
          currentTab: action.currentTab.tabName,
          currentTab_sops: action.currentTab.sops,
          currTabEsignRequired: action.currentTab.currTabEsignRequired,
          currTabConfirmUserRequired: action.currentTab.currTabConfirmUserRequired
        }
      case DO_LOGOUT_TAB:
        return {
          tabs: [],
          tabIndex:0, 
          currentTab:'',
          currTabEsignRequired: false,
          currTabConfirmUserRequired: false
        }          
      default:
        return state;
    }
  }
  
  export default tabsReducer;