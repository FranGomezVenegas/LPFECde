export const ADD_SESSION = 'ADD_SESSION';

export function addSession(data) {
    //console.log('tab_actions.addTab', 'data', data);
    return {
      type: ADD_SESSION,      
      sessionId: data.sessionId,
      userRole: data.userRole,
      startDate: data.startDate,
      tabsOpenOnLogin: data.tabsOpenOnLogin
    }
  }
  