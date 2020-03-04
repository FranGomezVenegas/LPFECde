import{backendUrl,appHeaderListApiUrl}from"../../../config/api-config.js";import{store}from"../../../store.js";//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
import{addNotification}from"../Redux/actions/notifications_actions.js";/**
 * @mixinFunction
 * @polymer
 */export const UserSession=superClass=>class extends superClass{getAppHeader(data){var apiUrl=backendUrl+appHeaderListApiUrl+"?"+data.paramsUrl;if(!data.finalToken){return}//console.log('getAppHeader', data.prefixName, data.actionName, apiUrl, data.paramsUrl);
axios.get(apiUrl).then(response=>{if(200==response.status){// this.dispatchEvent(new CustomEvent('toast-message', {
//     bubbles: true,
//     composed: true,
//     detail: response.data
//       })); 
// store.dispatch(addNotification({
//     notificationName: data.prefixName+'.'+data.actionName,
//     label_en: response.data, label_es: response.data,
//     diagnoses: 'CORRECT'
// }));
//console.log('api-usersession >> getAppHeader', response.data);
this.appHeaderContent=response.data;if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:error.message}));store.dispatch(addNotification({notificationName:data.prefixName+"."+data.actionName,label_en:error.message,label_es:error.message,new_sample:0,diagnoses:"ERROR"}))}).catch(function(error){console.log(error.message);if(data.callBackFunctionError){data.callBackFunctionError()}this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:"Error on authentication"+error.message}))}).then(function(){})}};