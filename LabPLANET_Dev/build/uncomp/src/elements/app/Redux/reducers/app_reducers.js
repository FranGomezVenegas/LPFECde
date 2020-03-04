import{combineReducers}from"../../../../../node_modules/redux/es/redux.js";import{UPDATE_PAGE,DO_LOGIN,DO_LOGOUT,SET_APP_LANGUAGE,SET_APP_PROCEDURE_LIST}from"../actions/app_actions.js";import{ADD_SESSION}from"../actions/session_actions.js";//import { ADD_NOTIFICATION } from '../actions/notifications_actions.js';
/*
* Reducer para la navegación
*/function navigation(state="",action){switch(action.type){case UPDATE_PAGE:return{...state,page:action.page};default:return state;}}const InitialUserState={loggedIn:!1,appLanguage:"en",finalToken:"",userDB:"",userID:"",appProcedureList:[]};function user(state=InitialUserState,action){switch(action.type){case DO_LOGIN:return{...state,loggedIn:!0,finalToken:action.token,userDB:action.userDB,userID:action.userID};case DO_LOGOUT:return{InitialUserState,loggedIn:!1};case SET_APP_LANGUAGE:return{...state,appLanguage:action.appLanguage};case SET_APP_PROCEDURE_LIST://console.log('SET_APP_PROCEDURE_LIST', action);
return{...state,appProcedureList:action.procListData};default:return state;}}const InitialSessionState={sessionId:0,userRole:"",startDate:""};function session(state=InitialSessionState,action){switch(action.type){case ADD_SESSION:return{...state,sessionId:action.sessionId,userRole:action.userRole,startDate:action.startDate};default:return state;}}/*
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
*/export const app=combineReducers({user,navigation,session//, tabs
//, notifications
});