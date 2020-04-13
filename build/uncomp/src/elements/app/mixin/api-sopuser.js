import{backendUrl,ApiSopUserUrl}from"../../../config/api-config.js";import{store}from"../../../store.js";//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
import{addNotification}from"../Redux/actions/notifications_actions.js";/**
 * @mixinFunction
 * @polymer
 */export const ApiSopUser=superClass=>class extends superClass{sopUserEndPoint(data){var apiUrl=backendUrl+ApiSopUserUrl+"?"+data.paramsUrl;//console.log('process-us>api-sample>sopUserAPI', 'data', data);    
//console.log('process-us>api-sample>sopUserAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl); 
axios.get(apiUrl).then(response=>{var notifObj=[];notifObj.notificationName=data.schemaPrefix+"."+data.actionName;notifObj.label_en=response.data.error_value_en;notifObj.label_es=response.data.error_value_es;notifObj.diagnostic=response.data.diagnostic;//console.log('process-us>api-sample>sopUserAPI.addNotification', 'notifObj', notifObj);
store.dispatch(addNotification(notifObj));var state=store.getState(),language=state.app.user.appLanguage,message="";switch(language){case"es":message=response.data.message_es;break;default:message=response.data.message_en;break;}if("LABPLANET_TRUE"==response.data.diagnostic){this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:message// response.data.error_value_es //ApiMessage.errorMessage(response.data)
}))}else{this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:message//response.data.error_value_es //ApiMessage.errorMessage(response.data)
}))}if(200==response.status){if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}}).catch(function(error){console.log(error.message);if(data.callBackFunctionError){data.callBackFunctionError()}store.dispatch(addNotification({notificationName:data.schemaPrefix+"."+data.actionName,label_en:error.message,label_es:error.message,diagnoses:"ERROR"}))}).then(function(){})}};