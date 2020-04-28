import { combineReducers } from 'redux'

import {UPDATE_PAGE,  DO_LOGIN,  DO_LOGOUT,  SET_APP_LANGUAGE,  SET_APP_PROCEDURE_LIST, UPDATE_FINAL_TOKEN ,USER_INFO, CHANGE_LOADING
    } from '../actions/app_actions.js';

import { ADD_SESSION } from '../actions/session_actions.js';

//import { ADD_NOTIFICATION } from '../actions/notifications_actions.js';

/*
* Reducer para la navegación
*/
function navigation(state = '', action) {
  switch(action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
} 

const InitialUserState = {
  loggedIn: false,
  appLanguage: 'en',
  finalToken: '',
  userDB: '',
  userID: '',
  tabsOpenOnLogin: '',
  appProcedureList: [],
  userInfo: [],
  loading: false,
}

function user(state = InitialUserState, action) {
  switch(action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: action
      }
    case DO_LOGIN:
      return {
        ...state,
        loggedIn: true,
        finalToken: action.token,
        userDB: action.userDB,
        userID: action.userID,
        tabsOpenOnLogin: action.tabsOpenOnLogin        
      }
    case DO_LOGOUT:
      return {
        InitialUserState,        
        loggedIn: false        
      }            
    case UPDATE_FINAL_TOKEN:
      return {
        ...state,
        finalToken: action.token,
      }
    case SET_APP_LANGUAGE:
      return {
        ...state,        
        appLanguage: action.appLanguage
      }   
    case SET_APP_PROCEDURE_LIST:
    //console.log('SET_APP_PROCEDURE_LIST', action);
      return {
        ...state,
        appProcedureList: action.procListData
      }    
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.loading
      };       
    default:
      return state;
  }
}

const InitialSessionState = {
  sessionId: 0,
  userRole: '',
  startDate: ''
}

function session(state = InitialSessionState, action) {
  switch(action.type) {
    case ADD_SESSION:
      return {
        ...state,
        sessionId: action.sessionId,
        userRole: action.userRole,
        startDate: action.startDate
      } 
    default:
      return state;      
  }
}
/*
const InitialNotificationsState = {
  sessionId: 0,
  userRole: ''
}

function notifications(state = InitialNotificationsState, action) {
  switch(action.type) {
    case ADD_SESSION:
      return {
        ...state,
        sessionId: 1,
        userRole: 'userRole'
      } 
    default:
      return state;      
  }
}
*/
export const app = combineReducers({
  user
  , navigation
  , session
  //, tabs
  //, notifications
})

