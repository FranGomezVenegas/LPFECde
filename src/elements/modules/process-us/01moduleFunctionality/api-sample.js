import {backendUrl, ApiSampleUrl} from '../../../../config/api-config'
import {store} from '../../../../store';
//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
import { addNotification  } from '../../../app/Redux/actions/notifications_actions';
import {diagnosticToNotification} from '../../../app/app-functions/notification-obj'
/**
 * @mixinFunction
 * @polymer
 */
export const ApiSample = (superClass) => class extends superClass {
    
    sampleActionTrigger(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2) {
        this.sampleActionController(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2);
    }

    sampleActionController(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2 ) {
        this.internalCallbackFunction = callBackFunction2;        
        var selectedSample = selectedRow.sample_id;      
        var selectedObjectLevel = 'SAMPLE';        
        if ((selectedSample==null) && (actionName!='LOGSAMPLE')) {
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
        case 'INCUBATIONSTART':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;            
            break;                        
        case 'INCUBATIONEND':
            paramsUrl=paramsUrl+"&sampleId="+selectedSample;            
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
        default:                
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
        datas.callbackFunction=this.myCallbackFunctionTrigger.bind(this);
        console.log('process-us-sample-reception >> itemSelected >> SampleAPI', paramsUrl, datas);            
        this.sampleBackEndCall(datas);    
        //if (callBackFunction2){callBackFunction2();}
    }
    myCallbackFunctionTrigger(){
        if (internalCallbackFunction){this.internalCallbackFunction();}
    }    

sampleBackEndCall(data) {
    var apiUrl=backendUrl+ApiSampleUrl+"?"+data.paramsUrl; 
    console.log('process-us>api-sample>sampleBackEndCall', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);    
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
        console.log('process-us>api-sample>sampleBackEndCall.addNotification', 'notifObj', notifObj);
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
}    