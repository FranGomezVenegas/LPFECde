import {store} from './../../../store';
import {backendUrl, appAuthenticateApiUrl} from '../../../config/api-config'
import { addNotification  } from '../../app/Redux/actions/notifications_actions';
import {diagnosticToNotification} from '../../app/app-functions/notification-obj'
import {updateFinalToken} from '../Redux/actions/app_actions';

export const Appapi = (superClass) => class extends superClass {  
    appActionTriggerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2) {
                //console.log('invoked Appapi >> appActionTriggerAPI');
                this.appActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2);
    }
    appActionControllerAPI(schemaPrefix, finalToken, actionName, selectedRow, tabInfo, callBackFunction2 ) {
        this.internalCallbackFunction = callBackFunction2; 
        console.log('selectedRow', selectedRow);       
        actionName=actionName.toUpperCase();
        var paramsUrl='';   
        switch (actionName) {
        case 'USER_CHANGE_PSWD':   
            if (!selectedRow.newPassword){
                dispatchEvent(new CustomEvent('toast-error', {
                    bubbles: true,
                    composed: true,
                    detail: 'newPassword is mandatory'
                }));                  
            }
            paramsUrl=paramsUrl+"&newPassword="+selectedRow.newPassword;     
            paramsUrl=paramsUrl+"&userToCheck="+selectedRow.userToCheck;     
            paramsUrl=paramsUrl+"&passwordToCheck="+selectedRow.passwordToCheck;     
            break;    
        case 'USER_CHANGE_ESIGN':            
        if (!selectedRow.newEsign){
            dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,
                composed: true,
                detail: 'newEsign is mandatory'
            }));                  
        }
        paramsUrl=paramsUrl+"&newEsign="+selectedRow.newEsign;     
            paramsUrl=paramsUrl+"&userToCheck="+selectedRow.userToCheck;     
            paramsUrl=paramsUrl+"&passwordToCheck="+selectedRow.passwordToCheck;     
            break;    
        case 'SET_DEFAULT_TABS_ON_LOGIN':            
            paramsUrl=paramsUrl+"&tabsString="+selectedRow.tabsString;     
            break;                            
        default:       
            var errorMsg='action '+actionName+' not declared on api-env-monit >> appActionControllerAPI.';
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
        this.appBackEndCallAPI(datas);    
        //if (callBackFunction2){callBackFunction2();}
    }
appBackEndCallAPI(data) {
    var apiUrl=backendUrl+appAuthenticateApiUrl+"?"+data.paramsUrl; 
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
            this.finalToken=response.data.finalToken;
            store.dispatch(updateFinalToken(this.finalToken));
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
        
}