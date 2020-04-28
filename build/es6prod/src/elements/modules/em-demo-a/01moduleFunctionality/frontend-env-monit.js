define(["exports","../02Redux/em-demo-a_actions.js","../../../../config/api-config.js","../../../../store.js"],function(_exports,_emDemoA_actions,_apiConfig,_store){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.FrontendEnvMonit=void 0;/**
 * @mixinFunction
 * @polymer
 */const FrontendEnvMonit=superClass=>class extends superClass{getPrograms(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.frontEndEnvMonitUrl;//console.log('getSampleTemplates', apiUrl, data.schemaPrefix);
if(!data.schemaPrefix){return}if(!data.finalToken){return}axios.get(apiUrl,{params:{schemaPrefix:data.schemaPrefix,actionName:"PROGRAMS_LIST",finalToken:data.finalToken}}).then(response=>{if(200==response.status){//console.log('FrontendEnvMonit >> getPrograms', response.data);
_store.store.dispatch((0,_emDemoA_actions.getPrograms)(response.data.programsList));if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}/*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
              }));         */}).catch(function(error){if(data.callBackFunctionError){data.callBackFunctionError()}console.log(error.message);/*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on authentication'+error.message
              }));           */}).then(function(){})}setSelectedProgram(data){_store.store.dispatch((0,_emDemoA_actions.setSelectedProgram)(response.data));if(data.callBackFunction){data.callBackFunction()}return}setSelectedSamplingPoint(data){_store.store.dispatch((0,_emDemoA_actions.setSelectedSamplingPoint)(response.data));if(data.callBackFunction){data.callBackFunction()}return}getSelectedProgramCorrectiveAction(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.frontEndEnvMonitUrl;//console.log('getSampleTemplates', apiUrl, data.schemaPrefix);
if(!data.schemaPrefix){return}if(!data.finalToken){return}axios.get(apiUrl,{params:{schemaPrefix:data.schemaPrefix,actionName:"PROGRAM_CORRECTIVE_ACTION_LIST",finalToken:data.finalToken,programName:data.programName}}).then(response=>{if(200==response.status){//console.log('FrontendEnvMonit >> getSelectedProgramCorrectiveAction', response.data);
_store.store.dispatch((0,_emDemoA_actions.selectedProgramCorrectiveActionList)(response.data));if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}/*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
              }));         */}).catch(function(error){if(data.callBackFunctionError){data.callBackFunctionError()}console.log(error.message);/*this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: 'Error on authentication'+error.message
              }));           */}).then(function(){})}getActiveProductionLotsList(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.frontEndEnvMonitUrl;//console.log('getAnalysisList', apiUrl, data);
if(!data.finalToken){return}if(!data.schemaPrefix){return}axios.get(apiUrl,{params:{schemaPrefix:data.schemaPrefix,actionName:data.actionName,finalToken:data.finalToken//'sampleAnalysisFieldToRetrieve': data.sampleAnalysisFieldToRetrieve
}}).then(response=>{if(200==response.status){//console.log(response.data);
_store.store.dispatch((0,_emDemoA_actions.getActiveProductionLots)(response.data));if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Error on "+apiUrl+" although the connectivity with the API ended with success! Status: "+response.status}))}).catch(function(error){if(data.callBackFunctionError){data.callBackFunctionError()}//console.log(error.message);
this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Error on authentication"+error.message}))}).then(function(){})}getAllIncubators(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.frontEndEnvMonitIncubationUrl;console.log("getAllIncubators",apiUrl,data);if(!data.finalToken){return}if(!data.schemaPrefix){return}axios.get(apiUrl,{params:{schemaPrefix:data.schemaPrefix,actionName:"INCUBATORS_LIST",finalToken:data.finalToken//, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
//'whereFieldsName': data.samplesWhereFieldsName, 
//'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
}}).then(response=>{if(200==response.status){console.log(response.data);_store.store.dispatch((0,_emDemoA_actions.getAllIncubators)(response.data));if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}// this.dispatchEvent(new CustomEvent('toast-error', {
//     bubbles: true,        composed: true,
//     detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
//   }));         
}).catch(function(error){if(data.callBackFunctionError){data.callBackFunctionError()}console.log(error.message);// this.dispatchEvent(new CustomEvent('toast-error', {
//     bubbles: true,        composed: true,
//     detail: 'Error on authentication'+error.message
//   }));           
}).then(function(){})}getActiveBatches(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.frontEndEnvMonitIncubBatchUrl;//console.log('getActiveBatches', apiUrl, data);
if(!data.finalToken){return}if(!data.schemaPrefix){return}axios.get(apiUrl,{params:{schemaPrefix:data.schemaPrefix,actionName:"ACTIVE_BATCH_LIST",finalToken:data.finalToken//, 'sampleFieldToRetrieve':data.sampleFieldToRetrieve,
//'whereFieldsName': data.samplesWhereFieldsName, 
//'whereFieldsValue': data.samplesWhereFieldsValue, 'sortFieldsName':data.samplesTabSortFields
}}).then(response=>{if(200==response.status){//console.log(response.data);
_store.store.dispatch((0,_emDemoA_actions.getActiveBatches)(response.data));if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}// this.dispatchEvent(new CustomEvent('toast-error', {
//     bubbles: true,        composed: true,
//     detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
//   }));         
}).catch(function(error){if(data.callBackFunctionError){data.callBackFunctionError()}//console.log(error.message);
// this.dispatchEvent(new CustomEvent('toast-error', {
//     bubbles: true,        composed: true,
//     detail: 'Error on authentication'+error.message
//   }));           
}).then(function(){})}prodLotFieldButtonClicked(e){//console.log('frontend-env-monit-sample >> prodLotFieldButtonClicked ', 
//    'e.detail.buttonName', e.detail.buttonName, 'this.selectedObject', this.selectedObject, 'e.detail.buttonDefinition', e.detail.buttonDefinition);
// if (this.selectedObject==null){
// var message=''; 
// switch(this.selectedLanguage){
//     case 'es': message='Por favor selecciona un objeto primero'; break; //message=response.data.message_es; break;            
//     default: message='Please select one object first.'; break; //message=response.data.message_en; break;
// }                    
// this.dispatchEvent(new CustomEvent('toast-error', {
//     bubbles: true,
//     composed: true,
//     detail: message
//     }));        
// return;
// }    
var datas=[];datas.actionName=e.detail.buttonName;datas.selectedObject=this.selectedObject;if(this.refreshWindow){datas.callBackFunction=this.refreshWindow.bind(this)}var tabInfo={currTabEsignRequired:e.detail.buttonDefinition.esign_required,currTabConfirmUserRequired:e.detail.buttonDefinition.confirmuser_required};this.$.myElements.actionTrigger(e.detail.buttonName,datas,e.detail.buttonDefinition)}fieldButtonClicked(e){//console.log('frontend-env-monit >> fieldButtonClicked ', 
//    'e.detail.buttonName', e.detail.buttonName, 'datas', datas, 'e.detail.buttonDefinition', e.detail.buttonDefinition);
// if (this.selectedObject==null){
// var message=''; 
// switch(this.selectedLanguage){
//     case 'es': message='Por favor selecciona un objeto primero'; break; //message=response.data.message_es; break;            
//     default: message='Please select one object first.'; break; //message=response.data.message_en; break;
// }                    
// this.dispatchEvent(new CustomEvent('toast-error', {
//     bubbles: true,
//     composed: true,
//     detail: message
//     }));        
// return;
// }    
var datas=[];datas.actionName=e.detail.buttonName;datas.selectedObject=this.selectedObject;if(this.refreshWindow){datas.callBackFunction=this.refreshWindow.bind(this)}this.$.myElements.actionTrigger(e.detail.buttonName,datas,e.detail.buttonDefinition)}};_exports.FrontendEnvMonit=FrontendEnvMonit});