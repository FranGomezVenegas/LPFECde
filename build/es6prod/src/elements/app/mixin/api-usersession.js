define(["exports","../../../config/api-config.js","../../../store.js","../Redux/actions/notifications_actions.js"],function(_exports,_apiConfig,_store,_notifications_actions){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.UserSession=void 0;//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
/**
 * @mixinFunction
 * @polymer
 */const UserSession=superClass=>class extends superClass{getAppHeader(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.appHeaderListApiUrl+"?"+data.paramsUrl;if(!data.finalToken){return}//console.log('getAppHeader', data.prefixName, data.actionName, apiUrl, data.paramsUrl);
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
this.appHeaderContent=response.data;if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:error.message}));_store.store.dispatch((0,_notifications_actions.addNotification)({notificationName:data.prefixName+"."+data.actionName,label_en:error.message,label_es:error.message,new_sample:0,diagnoses:"ERROR"}))}).catch(function(error){console.log(error.message);if(data.callBackFunctionError){data.callBackFunctionError()}this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:"Error on authentication"+error.message}))}).then(function(){})}};_exports.UserSession=UserSession});