import{store}from"../../../store.js";import{backendUrl,appAuthenticateApiUrl}from"../../../config/api-config.js";import{addNotification}from"../Redux/actions/notifications_actions.js";import{diagnosticToNotification}from"../app-functions/notification-obj.js";import{updateFinalToken}from"../Redux/actions/app_actions.js";export const Appapi=superClass=>class extends superClass{appActionTriggerAPI(schemaPrefix,finalToken,actionName,selectedRow,tabInfo,callBackFunction2){//console.log('invoked Appapi >> appActionTriggerAPI');
this.appActionControllerAPI(schemaPrefix,finalToken,actionName,selectedRow,tabInfo,callBackFunction2)}appActionControllerAPI(schemaPrefix,finalToken,actionName,selectedRow,tabInfo,callBackFunction2){this.internalCallbackFunction=callBackFunction2;console.log("selectedRow",selectedRow);actionName=actionName.toUpperCase();var paramsUrl="";switch(actionName){case"USER_CHANGE_PSWD":if(!selectedRow.newPassword){dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"newPassword is mandatory"}))}paramsUrl=paramsUrl+"&newPassword="+selectedRow.newPassword;paramsUrl=paramsUrl+"&userToCheck="+selectedRow.userToCheck;paramsUrl=paramsUrl+"&passwordToCheck="+selectedRow.passwordToCheck;break;case"USER_CHANGE_ESIGN":if(!selectedRow.newEsign){dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"newEsign is mandatory"}))}paramsUrl=paramsUrl+"&newEsign="+selectedRow.newEsign;paramsUrl=paramsUrl+"&userToCheck="+selectedRow.userToCheck;paramsUrl=paramsUrl+"&passwordToCheck="+selectedRow.passwordToCheck;break;case"SET_DEFAULT_TABS_ON_LOGIN":paramsUrl=paramsUrl+"&tabsString="+selectedRow.tabsString;break;default:var errorMsg="action "+actionName+" not declared on api-env-monit >> appActionControllerAPI.";console.log(errorMsg);dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:errorMsg}));return;}if(selectedRow.eSignToVerify){paramsUrl=paramsUrl+"&eSignToCheck="+selectedRow.eSignToVerify}paramsUrl="actionName="+actionName+"&finalToken="+finalToken+"&schemaPrefix="+schemaPrefix+paramsUrl;var datas=[];datas.schemaPrefix=schemaPrefix;datas.actionName=actionName;datas.paramsUrl=paramsUrl;if(null!=this.callBackFunction2){datas.callBackFunction=this.callBackFunction2.bind(this)}//console.log('api-env-monit >> itemSelected >> EnvMonitAPI', paramsUrl, datas);            
this.appBackEndCallAPI(datas);//if (callBackFunction2){callBackFunction2();}
}appBackEndCallAPI(data){var apiUrl=backendUrl+appAuthenticateApiUrl+"?"+data.paramsUrl;//console.log('process-us>api-sample>sampleBackEndCallAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);    
axios.get(apiUrl).then(response=>{var notifObj=diagnosticToNotification(response.data,data);console.log("process-us>api-sample>sampleBackEndCallAPI.addNotification","notifObj",notifObj);store.dispatch(addNotification(notifObj));var state=store.getState(),language=state.app.user.appLanguage,message="";switch(language){case"es":message=response.data.message_es;break;default:message=response.data.message_en;break;}if("LABPLANET_TRUE"==response.data.diagnostic){this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:message//response.data.error_value_es //ApiMessage.errorMessage(response.data)
}))}else{this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:message//response.data.error_value_es //ApiMessage.errorMessage(response.data)
}))}if(200==response.status){this.finalToken=response.data.finalToken;store.dispatch(updateFinalToken(this.finalToken));if(this.callBackFunctionEnvMonitElem){this.callBackFunctionEnvMonitElem()}if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}}).catch(function(error){console.log(error.message);if(data.callBackFunctionError){data.callBackFunctionError()}// store.dispatch(addNotification({
//     notificationName: data.schemaPrefix+'.'+data.actionName,
//     label_en: error.message, 
//     label_es: error.message, 
//     diagnoses: 'ERROR'
// }));        
}).then(function(){})}};