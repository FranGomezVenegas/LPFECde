define(["exports","../../../config/api-config.js","../../../store.js","../Redux/actions/notifications_actions.js","../Redux/actions/sop_actions.js"],function(_exports,_apiConfig,_store,_notifications_actions,_sop_actions){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.FrontendSopUser=void 0;/**
 * @mixinFunction
 * @polymer
 */const FrontendSopUser=superClass=>class extends superClass{fieldButtonClickedForSops(e){console.log("optionPressed",e.detail.buttonName,"selectedSampleAnalysis",e.target.value);//console.log('optionPressed', e.detail.buttonName, 'selectedSample', this.selectedObject);                
if(null==this.selectedObject){this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Please select one sample analysis first"}));//return;
}var datas=[],paramsUrl="",actionName="",schemaPrefix=e.target.value.procedure;switch(e.detail.buttonName){case"sopMarkAsCompleted":actionName="SOP_MARK_AS_COMPLETED";var sopName=e.target.value.sop_name;console.log("sopMarkAsCompleted");datas.sopName=sopName;paramsUrl=paramsUrl+"&sopName="+sopName;break;default:return;}paramsUrl="&actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+schemaPrefix+paramsUrl;datas.schemaPrefix=schemaPrefix;datas.actionName=actionName;datas.paramsUrl=paramsUrl;//datas.callbackFunction=myCallbackFunctionTrigger.bind(this);
var tabInfo={currTabEsignRequired:this.currTabEsignRequired,currTabConfirmUserRequired:this.currTabConfirmUserRequired};datas.tabInfo=tabInfo;console.log("process-us-sample-reception >> itemSelected >> SampleAPI",paramsUrl,datas);this.sopUserEndPoint(datas)}frontEndSopUserAPI(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.frontEndSopUrl+"?"+data.paramsUrl;if(!data.finalToken){return}//    console.log('frontEndSopUserAPI', apiUrl, data.paramsUrl);
axios.get(apiUrl).then(response=>{if(200==response.status){//            console.log('frontEndSopUserAPI', apiUrl, data.paramsUrl, data.actionName, response.data);
switch(data.actionName){case"ALL_MY_SOPS":_store.store.dispatch((0,_sop_actions.userAllSop)(response.data));case"MY_PENDING_SOPS":_store.store.dispatch((0,_sop_actions.userPendingSop)(response.data));case"PROCEDURE_SOPS":_store.store.dispatch((0,_sop_actions.procedureSops)(response.data));default:return;}if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}// this.dispatchEvent(new CustomEvent('toast-error', {
//     bubbles: true,
//     composed: true,
//     detail: 'error.message'
// })); 
_store.store.dispatch((0,_notifications_actions.addNotification)({notificationName:data.prefixName+"."+data.actionName,label_en:error.message,label_es:error.message,new_sample:0,diagnoses:"ERROR"}))}).catch(function(error){console.log(error.message);if(data.callBackFunctionError){data.callBackFunctionError()}/*this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
            }));  */}).then(function(){})}getSopPane(data){var apiUrl=_apiConfig.backendUrl+_apiConfig.frontEndSopUrl+"?"+"actionName=SOP_TREE_LIST_ELEMENT&finalToken="+data.finalToken;if(!data.finalToken){return}//console.log('getSopPane', apiUrl, data.finalToken);
axios.get(apiUrl,{params:{finalToken:data.finalToken}}).then(response=>{if(200==response.status){//            console.log(response.data);
this.SOPList=response.data;if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Error on "+apiUrl+" although the connectivity with the API ended with success! Status: "+response.status}))}).catch(function(error){if(data.callBackFunctionError){data.callBackFunctionError()}console.log("FrontEnd.sopuser.js >> getSopPane",error.message);this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Error on authentication"+error.message}))}).then(function(){})}};_exports.FrontendSopUser=FrontendSopUser});