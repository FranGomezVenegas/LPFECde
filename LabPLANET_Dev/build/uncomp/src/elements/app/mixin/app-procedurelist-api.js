import{backendUrl,appProcedureListApiUrl}from"../../../config/api-config.js";import{store}from"../../../store.js";import{setAppProcedureList}from"../Redux/actions/app_actions.js";import{appProcedureListFake}from"../../../config/json-fake.js";//import { foo } from '../redux/actions';
/**
 * @mixinFunction
 * @polymer
 */export const ProcedureList=superClass=>class extends superClass{sleep(milliseconds){for(var start=new Date().getTime(),i=0;1e7>i;i++){if(new Date().getTime()-start>milliseconds){break}}}getProcedureList(data){//store.dispatch(setAppProcedureList(appProcedureListFake));
//return;
//console.log('getProcedureList');
//    this.sleep(3000);
//console.log('getProcedureList');
var apiUrl=backendUrl+appProcedureListApiUrl;//    console.log('getProcedureList', apiUrl, data.finalToken);
if(!data.finalToken){return}axios.get(apiUrl,{params:{finalToken:data.finalToken}}).then(response=>{//console.log('app-procedurelist-api', response.status);        
if(200==response.status){//this.procedureList=response.data;
store.dispatch(setAppProcedureList(response.data));if(data.callBackFunction){data.callBackFunction()}return}if(data.callBackFunctionError){data.callBackFunctionError()}this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Error on "+apiUrl+" although the connectivity with the API ended with success! Status: "+response.status}))}).catch(function(error){if(data.callBackFunctionError){data.callBackFunctionError()}console.log(error.message);this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Error on authentication"+error.message}))}).then(function(){})}};