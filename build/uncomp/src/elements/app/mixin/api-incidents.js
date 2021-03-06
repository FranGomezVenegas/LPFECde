import{backendUrl,ApiIncidentsUrl}from"../../../config/api-config.js";import{store}from"../../../store.js";//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
import{addNotification}from"../Redux/actions/notifications_actions.js";/**
 * @mixinFunction
 * @polymer
 */export const ApiIncidents=superClass=>class extends superClass{incidentsEndPoint(data){var apiUrl=backendUrl+ApiIncidentsUrl+"?"+data.paramsUrl;//console.log('App >> ApiIncidents >> incidentsEndPoint ', 'data', data);    
//    console.log('process-us>api-sample>incidentsEndPoint', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);     
//axios.get(apiUrl)
axios({method:"post",url:apiUrl//data:JSON.stringify({firstName: 'Finn', lastName: 'Williams' })
}).then(response=>{var state=store.getState(),language=state.app.user.appLanguage,message="";switch(language){case"es":message=response.data.message_es;break;default:message=response.data.message_en;break;}//this.getSelectedUserIncidentDetail({finalToken: this.finalToken, incidentId: data.incidentId});
store.dispatch(addNotification(response.data));if("LABPLANET_TRUE"==response.data.diagnostic){this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:message//language +'>'+response.data.message_es //ApiMessage.errorMessage(response.data)
}))}else{this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:message//response.data.message_es //ApiMessage.errorMessage(response.data)
}))}if(200==response.status){if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}}).catch(function(error){console.log(error.message);if(data.callBackFunctionError){data.callBackFunctionError()}store.dispatch(addNotification({notificationName:data.schemaPrefix+"."+data.actionName,label_en:error.message,label_es:error.message,diagnoses:"ERROR"}))}).then(function(){})}};