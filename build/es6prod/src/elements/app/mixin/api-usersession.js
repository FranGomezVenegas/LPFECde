define(["exports","../../../config/api-config.js","../../../store.js","../Redux/actions/notifications_actions.js","../Redux/actions/app_actions.js"],function(_exports,_apiConfig,_store,_notifications_actions,_app_actions){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.UserSession=void 0;//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
/**
 * @mixinFunction
 * @polymer
 */const UserSession=superClass=>class extends superClass{getAppHeader(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.appHeaderListApiUrl+"?"+data.paramsUrl;if(!data.finalToken){return}//console.log('getAppHeader', data.prefixName, data.actionName, apiUrl, data.paramsUrl);
axios.get(apiUrl).then(response=>{if(200==response.status){//            console.log(response.data);
_store.store.dispatch((0,_app_actions.userInfo)(response.data));//if (data.callBackFunction){data.callBackFunction();}
return}//if (data.callBackFunctionError){data.callBackFunctionError();}        
// this.dispatchEvent(new CustomEvent('toast-message', {
//     bubbles: true,
//     composed: true,
//     detail: error.message
// })); 
// store.dispatch(addNotification({
//     notificationName: data.prefixName+'.'+data.actionName,
//     label_en: error.message, label_es:error.message,
//     new_sample:0,
//     diagnoses: 'ERROR'
// }));
}).catch(function(error){//        console.log('api-usersession >> .catch(error)', error.message);
// if (data.callBackFunctionError){data.callBackFunctionError();}
// this.dispatchEvent(new CustomEvent('toast-message', {
//     bubbles: true,        composed: true,
//     detail: 'Error on authentication'+error.message
//   }));           
}).then(function(){})}};_exports.UserSession=UserSession});