import {backendUrl, frontEndSopUrl} from '../../../config/api-config'
import {store} from '../../../store';
import { addNotification  } from '../Redux/actions/notifications_actions';
//import{userOpenIncidents} from '../Redux/actions/incidents_actions';
/**
 * @mixinFunction
 * @polymer
 */
export const FrontendIncidents = (superClass) => class extends superClass {

    
fieldButtonClickedForIncidents(e) {
        console.log('optionPressed', e.detail.buttonName, 'selectedSampleAnalysis', e.target.value);                
        if (this.selectedObject==null){
            this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
                detail: 'Please select one sample analysis first'}));    
            //return;
        }          
        var datas = [];
        var paramsUrl="";
        var actionName= "";  
        //var schemaPrefix=e.target.value.procedure;
        switch (e.detail.buttonName.toUpperCase()) {        
        case 'NEW_INCIDENT':
            console.log('NEW_INCIDENT');
            paramsUrl=paramsUrl+"&actionName="+e.detail.buttonName.toUpperCase();
            paramsUrl=paramsUrl+"&incidentTitle="+this.formFields[0].value;
            paramsUrl=paramsUrl+"&incidentDetail="+this.formFields[1].value;
            var storeCurrentState=JSON.stringify(store.getState());
            datas.storeCurrentState=storeCurrentState;
            //paramsUrl=paramsUrl+"&sessionInfo="+storeCurrentState;
            break;
        default:
            return;
        }
        paramsUrl="&actionName="+e.detail.buttonName.toUpperCase()   +"&finalToken="+this.finalToken
            //+"&schemaPrefix="+schemaPrefix
            +paramsUrl;
        //datas.schemaPrefix=schemaPrefix; 
        datas.actionName=actionName; datas.paramsUrl=paramsUrl;
        //datas.callbackFunction=myCallbackFunctionTrigger.bind(this);
        var tabInfo={
            currTabEsignRequired: this.currTabEsignRequired,
            currTabConfirmUserRequired: this.currTabConfirmUserRequired};
        datas.tabInfo=tabInfo;               
        console.log('process-us-sample-reception >> itemSelected >> SampleAPI', paramsUrl, datas);            
        this.incidentsEndPoint(datas);           
}    
frontEndIncidentsAPI(data) {
    var apiUrl=backendUrl+frontEndSopUrl+"?"+data.paramsUrl; 
    if (!data.finalToken){ return;}

//    console.log('frontEndIncidentsAPI', apiUrl, data.paramsUrl);
    axios.get(apiUrl)        
    .then( response => {
        if(response.status == 200) {
//            console.log('frontEndIncidentsAPI', apiUrl, data.paramsUrl, data.actionName, response.data);
            switch (data.actionName){
            case 'ALL_MY_SOPS':
                store.dispatch(userAllSop(response.data));
            case 'MY_PENDING_SOPS':
                store.dispatch(userPendingSop(response.data));
            case 'PROCEDURE_SOPS':
                store.dispatch(procedureSops(response.data));
            default:
                return;
            }                
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        // this.dispatchEvent(new CustomEvent('toast-error', {
        //     bubbles: true,
        //     composed: true,
        //     detail: 'error.message'
        // })); 
        store.dispatch(addNotification({
            notificationName: data.prefixName+'.'+data.actionName,
            label_en: error.message, label_es:error.message,
            new_sample:0,
            diagnoses: 'ERROR'
        }));
    })    
    .catch(function (error) {
        console.log(error.message);
        if (data.callBackFunctionError){data.callBackFunctionError();}
        /*this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
            }));  */         
    })
    .then(function () {
    });
}
    
getSopPane(data) {
    var apiUrl=backendUrl+frontEndSopUrl+"?"+"actionName=SOP_TREE_LIST_ELEMENT&finalToken="+data.finalToken;
    if (!data.finalToken){ return;}
    //console.log('getSopPane', apiUrl, data.finalToken);
    axios.get(apiUrl, {        
        params: {            
            'finalToken': data.finalToken}
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            this.SOPList=response.data;
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on '+apiUrl+' although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        console.log('FrontEnd.sopuser.js >> getSopPane', error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

}