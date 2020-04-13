import {backendUrl, frontEndIncidentsUrl} from '../../../config/api-config'
import {store} from '../../../store';
import { addNotification  } from '../Redux/actions/notifications_actions';
import{userOpenIncidents, selectedUserIncidentDetail} from '../Redux/actions/incidents_actions';
/**
 * @mixinFunction
 * @polymer
 */
export const FrontendIncidents = (superClass) => class extends superClass {
    
fieldButtonClickedForIncidents(e) {
        //console.log('optionPressed', e.detail.buttonName, 'selectedObject', this.selectedObject);                
        var datas = [];
        var paramsUrl="";
        var actionName= "";  
        //var schemaPrefix=e.target.value.procedure;
        switch (e.detail.buttonName.toUpperCase()) {        
        case 'NEW_INCIDENT':
            //console.log('NEW_INCIDENT');
            paramsUrl=paramsUrl+"&actionName="+e.detail.buttonName.toUpperCase();
            paramsUrl=paramsUrl+"&incidentTitle="+this.formFields[0].value;
            paramsUrl=paramsUrl+"&incidentDetail="+this.formFields[1].value;
            var storeCurrentState=JSON.stringify(store.getState());
            datas.storeCurrentState=storeCurrentState;
            datas.incidentTitle=this.formFields[0].value;
            datas.incidentDetail=this.formFields[1].value;
            this.$.myElements.actionTrigger(e.detail.buttonName, datas, e.detail.buttonDefinition);   
            //paramsUrl=paramsUrl+"&sessionInfo="+storeCurrentState;
            return;
        case 'CONFIRM_INCIDENT':
        case 'ADD_NOTE_INCIDENT':
        case 'CLOSE_INCIDENT':
        case 'REOPEN_INCIDENT':      
            if (this.selectedObject==null){
                this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
                    detail: 'Please select one incident first'}));    
                //return;
            }          
            this.$.myElements.actionTrigger(e.detail.buttonName, this.selectedObject, e.detail.buttonDefinition);                      
            return;            
        default:
            var msgErr='action '+e.detail.buttonName.toUpperCase()+' not declared in frontend-incidents';
            console.log(msgErr);
            this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
                detail: msgErr}));             
            return;
        }
}    
frontEndIncidentsAPI(data) {
    var apiUrl=backendUrl+frontEndIncidentsUrl+"?"+data.paramsUrl; 
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
    
getUserOpenIncidents(data) {
    var apiUrl=backendUrl+frontEndIncidentsUrl+"?"+"actionName=USER_OPEN_INCIDENTS";
    if (!data.finalToken){ return;}
    //console.log('getUserOpenIncidents', apiUrl, data.finalToken);
    axios.get(apiUrl, {        
        params: {            
            'finalToken': data.finalToken}
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(userOpenIncidents(response.data));
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
        //console.log('FrontEnd-incidents.js >> getUserOpenIncidents', error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

getSelectedUserIncidentDetail(data) {
    var apiUrl=backendUrl+frontEndIncidentsUrl+"?"+"actionName=INCIDENT_DETAIL_FOR_GIVEN_INCIDENT";
    if (!data.finalToken){ return;}
    //console.log('getSelectedUserIncidentDetail', apiUrl, data);
    axios.get(apiUrl, {        
        params: {            
            'finalToken': data.finalToken, 'incidentId': data.incidentId}
    })
    .then( response => {
        if(response.status == 200) {
            //console.log(response.data);
            store.dispatch(selectedUserIncidentDetail(response.data));
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
        //console.log('FrontEnd-incidents.js >> getUserOpenIncidents', error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

}