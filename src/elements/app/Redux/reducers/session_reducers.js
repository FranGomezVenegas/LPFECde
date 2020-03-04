import {
    ADD_SESSION
  } from '../actions/session_actions.js';
  
  const INITIAL_STATE = {
    sessionId: 0,
    userRole: '',
    startDate: '',
    tabsOpenOnLogin: ''
  };

  const sessionReducer = (state = INITIAL_STATE, action) => {
    console.log('sessionReducer', action);
    switch(action.type) {
      case ADD_SESSION:      
        return {
          ...state,
          sessionId: action.sessionId,
          userRole: action.userRole,
          startDate: action.startDate,
          tabsOpenOnLogin: action.tabsOpenOnLogin
        }
      default:
        return state;
    }
  }
  
  export default sessionReducer;