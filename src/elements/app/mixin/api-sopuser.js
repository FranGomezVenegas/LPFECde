import {backendUrl, ApiSopUserUrl} from '../../../config/api-config'
import {store} from '../../../store';
//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
import { addNotification  } from '../../app/Redux/actions/notifications_actions';
/**
 * @mixinFunction
 * @polymer
 */
export const ApiSopUser = (superClass) => class extends superClass {

sopUserEndPoint(data) {
    var apiUrl=backendUrl+ApiSopUserUrl+"?"+data.paramsUrl; 
    //console.log('process-us>api-sample>sopUserAPI', 'data', data);    
    
    //console.log('process-us>api-sample>sopUserAPI', data.schemaPrefix, data.actionName, apiUrl, data.paramsUrl);     
    axios.get(apiUrl)        
    .then( response => {
        var notifObj = [];
        notifObj.notificationName=data.schemaPrefix+'.'+data.actionName;
        notifObj.label_en=response.data.message_es;
        notifObj.label_es=response.data.message_es;
        notifObj.diagnostic=response.data.diagnostic;
        //console.log('process-us>api-sample>sopUserAPI.addNotification', 'notifObj', notifObj);
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
                detail: message // response.data.error_value_es //ApiMessage.errorMessage(response.data)
              }));       
        }else{
            this.dispatchEvent(new CustomEvent('toast-error', {
                bubbles: true,        composed: true,
                detail: message //response.data.error_value_es //ApiMessage.errorMessage(response.data)
              }));                   
        }
        if(response.status == 200) {
//console.log('sopUserEndPoint >> status 200 ... calling the callBackFunction if so...');
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}      
    })    
    .catch(function (error) {
        console.log(error.message);
        if (data.callBackFunctionError){data.callBackFunctionError();}
        store.dispatch(addNotification({
            notificationName: data.schemaPrefix+'.'+data.actionName,
            label_en: error.message, 
            label_es: error.message, 
            diagnoses: 'ERROR'
        }));        
    })
    .then(function () {
    });
    }
}