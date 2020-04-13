export const ADD_TAB = 'ADD_TAB';
export const ADD_SYSTEM_TAB = 'ADD_SYSTEM_TAB';
export const CLOSE_TAB = 'CLOSE_TAB';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const DO_LOGOUT_TAB = 'DO_LOGOUT_TAB';

export function addSystemTab(tab, tabName, tabEn, tabEs, tabEsignRequired, tabConfirmUserRequired) {
  //console.log('tab_actions.addTab', 'procedure', procedure);
  return {
    type: ADD_SYSTEM_TAB,
    tab: tab,
    tabName: tabName,
    tabLabel_en: tabEn,
    tabLabel_es: tabEs,
    tabEsignRequired: tabEsignRequired,
    tabConfirmUserRequired: tabConfirmUserRequired    
  }
}

export function addTab(tab, tabName, tabEn, tabEs, procedure, tabEsignRequired, tabConfirmUserRequired) {
  //console.log('tab_actions.addTab', 'procedure', procedure);
  return {
    type: ADD_TAB,
    tab,
    tabName: tabName,
    tabLabel_en: tabEn,
    tabLabel_es: tabEs,
    tabEsignRequired: tabEsignRequired,
    tabConfirmUserRequired: tabConfirmUserRequired,
    procedure: procedure
  }
}
export function closeTab(tabName, tabIndex) {
  return {
    type: CLOSE_TAB,
    tabName: tabName, tabIndex: tabIndex
  }
}
export function setCurrentTab(currentTab) {
  return {
    type: SET_CURRENT_TAB,
    currentTab
  }
}

export function doLogoutTab() {
  //console.log('DoLogout');
  return {
    type: DO_LOGOUT_TAB
  }
}  