import {backendUrl, ApiEnvMonitUrl, ApiEnvMonitProdLotUrl, ApiEnvMonitSampleUrl, ApiEnvMonitIncubationUrl} from '../../../../config/api-config'
import {store} from '../../../../store';
//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
import { addNotification  } from '../../../app/Redux/actions/notifications_actions';
import {diagnosticToNotification} from '../../../app/app-functions/notification-obj'
import {incubationMode} from '../03config/config-process';
/**
 * @mixinFunction
 * @polymer
 */
export const EmDemoAapiEnvMonit = (superClass) => class extends superClass {    
    sampleActionTriggerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2) {
        this.sampleActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2);
    }
    sampleActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2 ) {
//console.log('sampleActionControllerAPI', 'selectedRow', selectedRow);        
        this.internalCallbackFunction = callBackFunction2;        
        var selectedSample = selectedRow.sample_id;      
        var selectedObjectLevel = 'SAMPLE';        
        if ((selectedSample==null) && (actionName!='LOGSAMPLE') 
         && (actionName!='EM_BATCH_INCUB_START') && (actionName!='EM_BATCH_INCUB_END')) {
            dispatchEvent(new CustomEvent('toasterror', {
                bubbles: true,
                composed: true,
                detail: 'Please select one object first '
                }));    
            return;
        }    
        actionName=actionName.toUpperCase();
        var paramsUrl='';   
        switch (actionName) {
        case 'LOGSAMPLE':       
            paramsUrl=paramsUrl+"&programName="+selectedRow.programName;    
            paramsUrl=paramsUrl+"&locationName="+selectedRow.locationName;  
            paramsUrl=paramsUrl+"&sampleTemplate="+selectedRow.sampleTemplate;
            paramsUrl=paramsUrl+"&sampleTemplateVersion="+selectedRow.sampleTemplateVersion;
            paramsUrl=paramsUrl+"&fieldName="+selectedRow.fieldName;
            paramsUrl=paramsUrl+"&fieldValue="+selectedRow.fieldValue;
            paramsUrl=paramsUrl+"&numSamplesToLog="+selectedRow.numSamplesToLog;
            break;        
        case 'REVIEWRESULT':
            paramsUrl=paramsUrl+"&objectId="+selectedSample;
            paramsUrl=paramsUrl+"&objectLevel="+selectedObjectLevel;
            break;        
        case 'UNREVIEWRESULT':
            paramsUrl=paramsUrl+"&objectId="+selectedSample;
            paramsUrl=paramsUrl+"&objectLevel="+selectedObjectLevel;
            break; 
        case 'CANCELRESULT':
            paramsUrl=paramsUrl+"&objectId="+selectedSample;
            paramsUrl=paramsUrl+"&objectLevel="+selectedObjectLevel;
            break;        
        case 'UNCANCELRESULT':
            paramsUrl=paramsUrl+"&objectId="+selectedSample;
            paramsUrl=paramsUrl+"&objectLevel="+selectedObjectLevel;
            break;  
        case 'CANCELRESULT':
            paramsUrl=paramsUrl+"&objectId="+selectedSample;
            paramsUrl=paramsUrl+"&objectLevel="+'TEST';
            break;        
        case 'UNCANCELRESULT':
            paramsUrl=paramsUrl+"&objectId="+selectedSample;
            paramsUrl=paramsUrl+"&objectLevel="+'TEST';
            break;              
        case 'SAMPLINGCOMMENTADD':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;
            paramsUrl=paramsUrl+"&sampleComment="+selectedRow.sample_comment;
            break;
        case 'SAMPLINGCOMMENTREMOVE':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;            
            break;            
        case 'CHANGESAMPLINGDATE':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;            
            paramsUrl=paramsUrl+"&newDate="+selectedRow.newDate;            
            break;   
        case 'SETSAMPLINGDATE':
        case 'INCUBATIONSTART':
        case 'INCUBATIONEND':
        case 'INCUBATION2START':
        case 'INCUBATION2END':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample; 
            paramsUrl=paramsUrl+"&incubatorName="+selectedRow.incubatorName; 
            break;                        
        case 'COC_STARTCHANGE':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample; 
            paramsUrl=paramsUrl+"&custodianCandidate="+selectedRow.person_name;          
            break;
        case 'COC_CONFIRMCHANGE':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample; 
            paramsUrl=paramsUrl+"&confirmChangeComment="+selectedRow.confirmChangeComment;          
            break;
        case 'COC_ABORTCHANGE':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;            
            paramsUrl=paramsUrl+"&cancelChangeComment="+selectedRow.cancelChangeComment;           
            break;                        
        case 'SAMPLEANALYSISADD':            
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;            
            paramsUrl=paramsUrl+"&fieldName="+selectedRow.fieldName;
            paramsUrl=paramsUrl+"&fieldValue="+selectedRow.fieldValue;
            break;                                                                    
        case 'SAMPLESTAGE_MOVETONEXT':            
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;
            if (!selectedRow.current_stage==null){            
                paramsUrl=paramsUrl+"&sampleStage="+selectedRow.currentStage;}
            break;                                                                    
        case 'SAMPLESTAGE_MOVETOPREVIOUS':            
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;
            if (!selectedRow.current_stage==null){            
                paramsUrl=paramsUrl+"&sampleStage="+selectedRow.current_stage;}
            break;  
        case 'ADD_SAMPLE_MICROORGANISM':                                                                    
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;                        
            paramsUrl=paramsUrl+"&microorganismName="+selectedRow.microorganismName;
            break;  
        case 'SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED':
            paramsUrl=paramsUrl+"&auditId="+selectedRow.audit_id;                        
            break;  
        case 'EM_BATCH_INCUB_ADD_SMP':
        case 'EM_BATCH_INCUB_REMOVE_SMP': 
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;    
            paramsUrl=paramsUrl+"&batchName="+selectedRow.selectedBatch.name;    
            paramsUrl=paramsUrl+"&batchTemplateId="+selectedRow.selectedBatch.incub_batch_config_id;    
            paramsUrl=paramsUrl+"&batchTemplateVersion="+selectedRow.selectedBatch.incub_batch_config_version;    
            break;
        default:    
            console.log('Action '+actionName+' not declared.')            
            dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,
                composed: true,
                detail: 'action '+actionName+' not declared on this window.'
            }));         
            return;            
        }                    
        if (selectedRow.eSignToVerify){paramsUrl=paramsUrl+"&eSignToCheck="+selectedRow.eSignToVerify;}
        
        paramsUrl="actionName="+actionName   +"&finalToken="+finalToken
            +"&schemaPrefix="+schemaPrefix
            +paramsUrl;
        var datas = [];
        datas.schemaPrefix=schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
        if (callBackFunction2){
            datas.callBackFunction=callBackFunction2.bind(this);}
        //console.log('api-env-monit.js >> SampleAPIControllerAPI >> Before calling sampleBackEndCallAPI the datas contains: ', datas);            
        this.sampleBackEndCallAPI(datas);            
    }
    sampleBackEndCallAPI(data) {
    var apiUrl=backendUrl+ApiEnvMonitSampleUrl+"?"+data.paramsUrl; 
    //console.log('process-us>api-sample>sampleBackEndCallAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);    
    axios.get(apiUrl)        
    .then( response => {
        var notifObj=diagnosticToNotification(response.data, data);
        console.log('process-us>api-sample>sampleBackEndCallAPI.addNotification', 'notifObj', notifObj);
        store.dispatch(addNotification(notifObj));
        var state=store.getState();
        var language=state.app.user.appLanguage; 
        var message=''; 
        switch(language){
            case 'es': message=response.data.message_es; break;            
            default: message=response.data.message_en; break;
        }            
        if (response.data.diagnostic=="LABPLANET_TRUE"){
            this.dispatchEvent(new CustomEvent('toast-message', {
                bubbles: true,        composed: true,
                detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
              }));       
        }else{
            this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
              }));                   
        }
        if(response.status == 200) {
            //console.log('callBackFunction');
            if (this.callBackFunctionEnvMonitElem){this.callBackFunctionEnvMonitElem();} 
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}      
    })    
    .catch(function (error) {
        console.log(error.message);
        if (data.callBackFunctionError){data.callBackFunctionError();}
        // store.dispatch(addNotification({
        //     notificationName: data.schemaPrefix+'.'+data.actionName,
        //     label_en: error.message, 
        //     label_es: error.message, 
        //     diagnoses: 'ERROR'
        // }));        
    })
    .then(function () {
    });
    }
    programActionTriggerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2) {
//        console.log('invoked api-env-monit >> programActionTriggerAPI');
        this.programActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2);
    }
    programActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2 ) {
        this.internalCallbackFunction = callBackFunction2; 
        //console.log('selectedRow', selectedRow);       
        var selectedProgram = selectedRow.program_name;      
        var selectedObjectLevel = 'PROGRAM';        
        if ((selectedProgram==null)) {
            dispatchEvent(new CustomEvent('toasterror', {
                bubbles: true,
                composed: true,
                detail: 'Please select one '+selectedObjectLevel+' object first '
                }));    
            return;
        }    
        actionName=actionName.toUpperCase();
        var paramsUrl='';   
        switch (actionName) {
        case 'CORRECTIVE_ACTION_COMPLETE':            
            var programCorrectiveActionId = selectedRow.id;      
            paramsUrl=paramsUrl+"&programName="+selectedRow.program_name;     
            paramsUrl=paramsUrl+"&programCorrectiveActionId="+programCorrectiveActionId;     
            break;    
        default:       
            var errorMsg='action '+actionName+' not declared on api-env-monit >> programActionControllerAPI.';
            console.log(errorMsg);         
            dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,
                composed: true,
                detail: errorMsg
            }));         
            return;            
        }                    
        if (selectedRow.eSignToVerify){paramsUrl=paramsUrl+"&eSignToCheck="+selectedRow.eSignToVerify;}
        
        paramsUrl="actionName="+actionName   +"&finalToken="+finalToken
            +"&schemaPrefix="+schemaPrefix
            +paramsUrl;
        var datas = [];
        datas.schemaPrefix=schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
        if (this.callBackFunction2!=null){
            datas.callBackFunction=this.callBackFunction2.bind(this);}
        //console.log('api-env-monit >> itemSelected >> EnvMonitAPI', paramsUrl, datas);            
        this.programBackEndCallAPI(datas);    
        //if (callBackFunction2){callBackFunction2();}
    }
    programBackEndCallAPI(data) {
    var apiUrl=backendUrl+ApiEnvMonitUrl+"?"+data.paramsUrl; 
    //console.log('process-us>api-sample>sampleBackEndCallAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);    
    axios.get(apiUrl)        
    .then( response => {
        var state=store.getState();
        var language=state.app.user.appLanguage; 
        var message=''; 
        switch(language){
            case 'es': message=response.data.message_es; break;            
            default: message=response.data.message_en; break;
        }
        var notifObj=diagnosticToNotification(response.data, data);
        store.dispatch(addNotification(notifObj));
        if (response.data.diagnostic=="LABPLANET_TRUE"){
            this.dispatchEvent(new CustomEvent('toast-message', {
                bubbles: true,        composed: true,
                detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
              }));       
        }else{
            this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
              }));                   
        }
        if(response.status == 200) {
            if (this.callBackFunctionEnvMonitElem){this.callBackFunctionEnvMonitElem();} 
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}      
    })    
    .catch(function (error) {
        console.log(error.message);
        if (data.callBackFunctionError){data.callBackFunctionError();}
        // store.dispatch(addNotification({
        //     notificationName: data.schemaPrefix+'.'+data.actionName,
        //     label_en: error.message, 
        //     label_es: error.message, 
        //     diagnoses: 'ERROR'
        // }));        
    })
    .then(function () {
    });
    }    

    batchActionTriggerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2) {
        //        console.log('invoked api-env-monit >> batchActionTriggerAPI');
                this.batchActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2);
            }
    batchActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2 ) {
        this.internalCallbackFunction = callBackFunction2; 
        //console.log('api-env-monit >> batchActionControllerAPI', 'selectedRow', selectedRow);       
        var selectedbatch = selectedRow.selectedBatch.name;      
        var selectedObjectLevel = 'batch';        
        if ((selectedbatch==null)) {
            dispatchEvent(new CustomEvent('toasterror', {
                bubbles: true,
                composed: true,
                detail: 'Please select one '+selectedObjectLevel+' object first '
                }));    
            return;
        }    
        actionName=actionName.toUpperCase();
        var paramsUrl='';   
        switch (actionName) {
        case 'EM_BATCH_INCUB_CREATE':
            paramsUrl=paramsUrl+"&batchName="+selectedRow.selectedBatch.name;    
            paramsUrl=paramsUrl+"&batchTemplateId=1";//+selectedRow.selectedBatch.incub_batch_config_id;    
            paramsUrl=paramsUrl+"&batchTemplateVersion=1";//+selectedRow.selectedBatch.incub_batch_config_version;    
            break;
        case 'EM_BATCH_ASSIGN_INCUB':                         
            paramsUrl=paramsUrl+"&batchName="+selectedRow.selectedBatch.name;    
            paramsUrl=paramsUrl+"&incubatorName="+selectedRow.incubName;    
            break;
        case 'EM_BATCH_INCUB_START':
        case 'EM_BATCH_INCUB_END':
            paramsUrl=paramsUrl+"&batchName="+selectedRow.selectedBatch.name;    
            paramsUrl=paramsUrl+"&batchTemplateId="+selectedRow.selectedBatch.incub_batch_config_id;    
            paramsUrl=paramsUrl+"&batchTemplateVersion="+selectedRow.selectedBatch.incub_batch_config_version;    
            break;            
        default:       
            var errorMsg='action '+actionName+' not declared on api-env-monit >> batchActionControllerAPI.';
            console.log(errorMsg);         
            dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,
                composed: true,
                detail: errorMsg
            }));         
            return;  
        }                    
        if (selectedRow.eSignToVerify){paramsUrl=paramsUrl+"&eSignToCheck="+selectedRow.eSignToVerify;}
        
        paramsUrl="actionName="+actionName   +"&finalToken="+finalToken
            +"&schemaPrefix="+schemaPrefix
            +paramsUrl;
        var datas = [];
        datas.schemaPrefix=schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
        datas.callBackFunction=callBackFunction2; //this.callBackFunction2.bind(this);
        //console.log('api-env-monit >> itemSelected >> EnvMonitAPI', paramsUrl, datas);            
        this.batchBackEndCallAPI(datas);    
        //if (callBackFunction2){callBackFunction2();}
    }
    batchBackEndCallAPI(data) {
        var apiUrl=backendUrl+ApiEnvMonitUrl+"?"+data.paramsUrl; 
        //console.log('process-us>api-sample>batchBackEndCallAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);    
        axios.get(apiUrl)        
        .then( response => {
            var state=store.getState();
            var language=state.app.user.appLanguage; 
            var message=''; 
            switch(language){
                case 'es': message=response.data.message_es; break;            
                default: message=response.data.message_en; break;
            }                
            var notifObj=diagnosticToNotification(response.data, data);
            //console.log('process-us>api-sample>batchBackEndCallAPI.addNotification', 'notifObj', notifObj);
            store.dispatch(addNotification(notifObj));
            if (response.data.diagnostic=="LABPLANET_TRUE"){
                this.dispatchEvent(new CustomEvent('toast-message', {
                    bubbles: true,        composed: true,
                    detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
                    }));       
            }else{
                this.dispatchEvent(new CustomEvent('toast-error', {
                    bubbles: true,        composed: true,
                    detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
                    }));                   
            }
            if(response.status == 200) {
                if (this.callBackFunctionEnvMonitElem){this.callBackFunctionEnvMonitElem();} 
                if (data.callBackFunction){data.callBackFunction();}
                return;
            }
            if (data.callBackFunctionError){data.callBackFunctionError();}      
        })    
        .catch(function (error) {
            console.log(error.message);
            if (data.callBackFunctionError){data.callBackFunctionError();}
            // store.dispatch(addNotification({
            //     notificationName: data.schemaPrefix+'.'+data.actionName,
            //     label_en: error.message, 
            //     label_es: error.message, 
            //     diagnoses: 'ERROR'
            // }));        
        })
        .then(function () {
        });
    }    
        
    prodLotActionTriggerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2) {
        //        console.log('invoked api-env-monit >> prodLotActionTriggerAPI');
                this.prodLotActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2);
            }
    prodLotActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2 ) {
        this.internalCallbackFunction = callBackFunction2; 
        //console.log('api-env-monit >> prodLotActionControllerAPI', 'selectedRow', selectedRow); 
        var selectedprodLot = selectedRow.selectedProdLot;
        var selectedObjectLevel = 'prodLot';        
        if ((selectedprodLot==null)) {
            dispatchEvent(new CustomEvent('toasterror', {
                bubbles: true,
                composed: true,
                detail: 'Please select one '+selectedObjectLevel+' object first '
                }));    
            return;
        }    
        actionName=actionName.toUpperCase();
        var paramsUrl='';   
        switch (actionName) {
        case 'EM_DEACTIVATE_PRODUCTION_LOT':                         
        case 'EM_ACTIVATE_PRODUCTION_LOT':                         
        case 'EM_NEW_PRODUCTION_LOT': 
            paramsUrl=paramsUrl+"&lotName="+selectedRow.selectedProdLot; 
            paramsUrl=paramsUrl+"&fieldName="+"active";    
            paramsUrl=paramsUrl+"&fieldValue="+"true*Boolean";    
            break;
        default:       
            var errorMsg='action '+actionName+' not declared on api-env-monit >> prodLotActionControllerAPI.';
            console.log(errorMsg);         
            dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,
                composed: true,
                detail: errorMsg
            }));         
            return;  
        }                    
        if (selectedRow.eSignToVerify){paramsUrl=paramsUrl+"&eSignToCheck="+selectedRow.eSignToVerify;}
        
        paramsUrl="actionName="+actionName   +"&finalToken="+finalToken
            +"&schemaPrefix="+schemaPrefix
            +paramsUrl;
        var datas = [];
        datas.schemaPrefix=schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
        datas.callBackFunction=this.callBackFunction2.bind(this);
        //console.log('api-env-monit >> itemSelected >> EnvMonitAPI', paramsUrl, datas);            
        this.prodLotBackEndCallAPI(datas);    
        //if (callBackFunction2){callBackFunction2();}
    }
    prodLotBackEndCallAPI(data) {
        var apiUrl=backendUrl+ApiEnvMonitProdLotUrl+"?"+data.paramsUrl; 
        //console.log('process-us>api-sample>sampleBackEndCallAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);    
        axios.get(apiUrl)        
        .then( response => {
            var state=store.getState();
            var language=state.app.user.appLanguage; 
            var message=''; 
            switch(language){
                case 'es': message=response.data.message_es; break;            
                default: message=response.data.message_en; break;
            }                
            var notifObj=diagnosticToNotification(response.data, data);
            //console.log('process-us>api-sample>sampleBackEndCallAPI.addNotification', 'notifObj', notifObj);
            store.dispatch(addNotification(notifObj));
            if (response.data.diagnostic=="LABPLANET_TRUE"){
                this.dispatchEvent(new CustomEvent('toast-message', {
                    bubbles: true,        composed: true,
                    detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
                    }));       
            }else{
                this.dispatchEvent(new CustomEvent('toast-error', {
                    bubbles: true,        composed: true,
                    detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
                    }));                   
            }
            if(response.status == 200) {
                if (this.callBackFunctionEnvMonitElem){this.callBackFunctionEnvMonitElem();} 
                if (data.callBackFunction){data.callBackFunction();}
                return;
            }
            if (data.callBackFunctionError){data.callBackFunctionError();}      
        })    
        .catch(function (error) {
            console.log(error.message);
            if (data.callBackFunctionError){data.callBackFunctionError();}
            // store.dispatch(addNotification({
            //     notificationName: data.schemaPrefix+'.'+data.actionName,
            //     label_en: error.message, 
            //     label_es: error.message, 
            //     diagnoses: 'ERROR'
            // }));        
        })
        .then(function () {
        });
    }    

    
    incubationTriggerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2) {
        //console.log('invoked api-env-monit >> incubationTriggerAPI');
        this.incubationControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2);
    }
    incubationControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2 ) {
        this.internalCallbackFunction = callBackFunction2; 
        //console.log('api-env-monit >> incubationControllerAPI', 'selectedRow', selectedRow);       
        var selectedIncubator = selectedRow.selectedIncubator;      
        var selectedObjectLevel = 'batch';        
        if ((selectedIncubator==null)) {
            dispatchEvent(new CustomEvent('toasterror', {
                bubbles: true,
                composed: true,
                detail: 'Please select one '+selectedObjectLevel+' object first '
                }));    
            return;
        }    
        actionName=actionName.toUpperCase();
        var paramsUrl='';   
        switch (actionName) {
        case 'EM_INCUBATION_ADD_TEMP_READING':
            paramsUrl=paramsUrl+"&incubatorName="+selectedRow.selectedIncubator;    
            paramsUrl=paramsUrl+"&temperature="+selectedRow.temperature;    
            break;
        case '<<<EM_BATCH_ASSIGN_INCUB':                         
            paramsUrl=paramsUrl+"&batchName="+selectedRow.selectedBatch.name;    
            paramsUrl=paramsUrl+"&incubatorName="+selectedRow.incubName;    
            break;
        default:       
            var errorMsg='action '+actionName+' not declared on api-env-monit >> incubationControllerAPI.';
            console.log(errorMsg);         
            dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,
                composed: true,
                detail: errorMsg
            }));         
            return;  
        }                    
        if (selectedRow.eSignToVerify){paramsUrl=paramsUrl+"&eSignToCheck="+selectedRow.eSignToVerify;}
        
        paramsUrl="actionName="+actionName   +"&finalToken="+finalToken
            +"&schemaPrefix="+schemaPrefix
            +paramsUrl;
        var datas = [];
        datas.schemaPrefix=schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
        datas.callBackFunction=callBackFunction2; //this.callBackFunction2.bind(this);
        //console.log('api-env-monit >> itemSelected >> EnvMonitAPI', paramsUrl, datas);            
        this.incubationBackEndCallAPI(datas);    
        //if (callBackFunction2){callBackFunction2();}
    }
    incubationBackEndCallAPI(data) {
        var apiUrl=backendUrl+ApiEnvMonitIncubationUrl+"?"+data.paramsUrl; 
        //console.log('process-us>api-sample>incubationBackEndCallAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);    
        axios.get(apiUrl)        
        .then( response => {
            var state=store.getState();
            var language=state.app.user.appLanguage; 
            var message=''; 
            switch(language){
                case 'es': message=response.data.message_es; break;            
                default: message=response.data.message_en; break;
            }                
            var notifObj=diagnosticToNotification(response.data, data);
            //console.log('process-us>api-sample>incubationBackEndCallAPI.addNotification', 'notifObj', notifObj);
            store.dispatch(addNotification(notifObj));
            if (response.data.diagnostic=="LABPLANET_TRUE"){
                this.dispatchEvent(new CustomEvent('toast-message', {
                    bubbles: true,        composed: true,
                    detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
                    }));       
            }else{
                this.dispatchEvent(new CustomEvent('toast-error', {
                    bubbles: true,        composed: true,
                    detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
                    }));                   
            }
            if(response.status == 200) {
                if (this.callBackFunctionEnvMonitElem){this.callBackFunctionEnvMonitElem();} 
                if (data.callBackFunction){data.callBackFunction();}
                return;
            }
            if (data.callBackFunctionError){data.callBackFunctionError();}      
        })    
        .catch(function (error) {
            console.log(error.message);
            if (data.callBackFunctionError){data.callBackFunctionError();}
            // store.dispatch(addNotification({
            //     notificationName: data.schemaPrefix+'.'+data.actionName,
            //     label_en: error.message, 
            //     label_es: error.message, 
            //     diagnoses: 'ERROR'
            // }));        
        })
        .then(function () {
        });
    }    

    myCallBackFunctionTrigger(){
        if (internalCallBackFunction){this.internalCallBackFunction();}
    }    

}    