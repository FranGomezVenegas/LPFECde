define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.navigate=navigate;_exports.doLogin=doLogin;_exports.doLogout=doLogout;_exports.setAppLanguage=setAppLanguage;_exports.setAppProcedureList=setAppProcedureList;_exports.SET_APP_PROCEDURE_LIST=_exports.SET_APP_LANGUAGE=_exports.DO_LOGOUT=_exports.DO_LOGIN=_exports.UPDATE_PAGE=void 0;/*
* Action types
*/const UPDATE_PAGE="UPDATE_PAGE";_exports.UPDATE_PAGE=UPDATE_PAGE;const DO_LOGIN="DO_LOGIN";_exports.DO_LOGIN=DO_LOGIN;const DO_LOGOUT="DO_LOGOUT";_exports.DO_LOGOUT=DO_LOGOUT;const SET_APP_LANGUAGE="SET_APP_LANGUAGE";_exports.SET_APP_LANGUAGE=SET_APP_LANGUAGE;const SET_APP_PROCEDURE_LIST="SET_APP_PROCEDURE_LIST";//export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
/*
* Action creators
*/_exports.SET_APP_PROCEDURE_LIST=SET_APP_PROCEDURE_LIST;function navigate(path){//console.log('app_actions.navigate', path)
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
}return{type:UPDATE_PAGE,page:page}}function doLogin(finalToken,userDB,userID){return{type:DO_LOGIN,token:finalToken,userDB:userDB,userID:userID}}function doLogout(){//console.log('DoLogout');
return{type:DO_LOGOUT}}function setAppLanguage(language){//console.log('setAppLanguage', language);
return{type:SET_APP_LANGUAGE,appLanguage:language}}function setAppProcedureList(data){// console.log('setAppProcedureList', data);
return{type:SET_APP_PROCEDURE_LIST,procListData:data}}/*export function addUserToken(finalToken) {
  console.log('AddUserToken');
  return {
    type: ADD_USER_TOKEN,
    token: finalToken
  }        
}
*/});