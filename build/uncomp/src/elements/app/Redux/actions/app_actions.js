/*
* Action types
*/export const UPDATE_PAGE="UPDATE_PAGE";export const DO_LOGIN="DO_LOGIN";export const DO_LOGOUT="DO_LOGOUT";export const SET_APP_LANGUAGE="SET_APP_LANGUAGE";export const SET_APP_PROCEDURE_LIST="SET_APP_PROCEDURE_LIST";export const UPDATE_FINAL_TOKEN="UPDATE_FINAL_TOKEN";export const USER_INFO="USER_INFO";export const CHANGE_LOADING="CHANGE_LOADING";//export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
/*
* Action creators
*/export function userInfo(data){//    console.log('app_actions >> userInfo', data);
return{type:USER_INFO,data:data}}export function navigate(path){//console.log('app_actions.navigate', path)
let page="/"===path?"main":path.slice(1);switch(page){case"main":break;/*    case 'estadisticas':
      import('../elements/modules/todo/todo-stats.js');
      break;
    case 'contador':
      import('../elements/modules/todo/click-counter.js');
      break;
    case 'view2':
      import('../elements/modules/todo/my-view2.js');
      break;
    case 'link':
      import('../elements/modules/todo/imperative-link.js');
      break;
    case 'posts':
      import('../elements/modules/todo/post-list.js');
      break;
    case 'not-connected':
      import('../elements/modules/todo/not-connected-element.js');
      break;
    case 'connected':
      import('../elements/modules/todo/connected-element.js');
      break;
*/default://console.log('app_actions', 'navigate', 'Page '+page+' Not found')
//page = 'view404';
//Don't load the error-404 page otherwise is added to the tab content
//import('../elements/modules/todo/error-404.js');
}return{type:UPDATE_PAGE,page:page}}export function doLogin(finalToken,userDB,userID,tabsOpenOnLogin){return{type:DO_LOGIN,token:finalToken,userDB:userDB,userID:userID,tabsOpenOnLogin:tabsOpenOnLogin}}export function doLogout(){//console.log('DoLogout');
return{type:DO_LOGOUT}}export function updateFinalToken(finalToken){return{type:UPDATE_FINAL_TOKEN,token:finalToken}}export function setAppLanguage(language){//console.log('setAppLanguage', language);
return{type:SET_APP_LANGUAGE,appLanguage:language}}export function setAppProcedureList(data){// console.log('setAppProcedureList', data);
return{type:SET_APP_PROCEDURE_LIST,procListData:data}}export const startLoading=()=>{return changeLoading(!0)};export const stopLoading=()=>{return changeLoading(!1)};export const changeLoading=loading=>{return{type:CHANGE_LOADING,loading}};/*export function addUserToken(finalToken) {
  console.log('AddUserToken');
  return {
    type: ADD_USER_TOKEN,
    token: finalToken
  }        
}
*/