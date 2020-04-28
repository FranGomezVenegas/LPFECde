define(["exports","../../../config/api-config.js","../../../store.js","../Redux/actions/notifications_actions.js"],function(_exports,_apiConfig,_store,_notifications_actions){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.ApiSopUser=void 0;//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
/**
 * @mixinFunction
 * @polymer
 */const ApiSopUser=superClass=>class extends superClass{sopUserEndPoint(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.ApiSopUserUrl+"?"+data.paramsUrl;//console.log('process-us>api-sample>sopUserAPI', 'data', data);    
//console.log('process-us>api-sample>sopUserAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);     
axios.get(apiUrl).then(response=>{var notifObj=[];notifObj.notificationName=data.schemaPrefix+"."+data.actionName;notifObj.label_en=response.data.message_es;notifObj.label_es=response.data.message_es;notifObj.diagnostic=response.data.diagnostic;//console.log('process-us>api-sample>sopUserAPI.addNotification', 'notifObj', notifObj);
_store.store.dispatch((0,_notifications_actions.addNotification)(notifObj));var state=_store.store.getState(),language=state.app.user.appLanguage,message="";switch(language){case"es":message=response.data.message_es;break;default:message=response.data.message_en;break;}if("LABPLANET_TRUE"==response.data.diagnostic){this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:message// response.data.error_value_es //ApiMessage.errorMessage(response.data)
}))}else{this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:message//response.data.error_value_es //ApiMessage.errorMessage(response.data)
}))}if(200==response.status){//console.log('sopUserEndPoint >> status 200 ... calling the callBackFunction if so...');
if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}}).catch(function(error){console.log(error.message);if(data.callBackFunctionError){data.callBackFunctionError()}_store.store.dispatch((0,_notifications_actions.addNotification)({notificationName:data.schemaPrefix+"."+data.actionName,label_en:error.message,label_es:error.message,diagnoses:"ERROR"}))}).then(function(){})}};_exports.ApiSopUser=ApiSopUser});