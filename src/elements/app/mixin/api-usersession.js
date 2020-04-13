import {backendUrl, appHeaderListApiUrl} from '../../../config/api-config'
import {store} from '../../../store';
//import { sampleTemplates, unReceivedSamples } from '../../modules/ProcessUS/Redux/process-us_actions';
import { addNotification  } from '../Redux/actions/notifications_actions';
import {userInfo} from '../Redux/actions/app_actions';
/**
 * @mixinFunction
 * @polymer
 */
export const UserSession = (superClass) => class extends superClass {
   
getAppHeader(data) {
    var apiUrl=backendUrl+appHeaderListApiUrl+"?"+data.paramsUrl; 
    if (!data.finalToken){ return;}
    //console.log('getAppHeader', data.prefixName, data.actionName, apiUrl, data.paramsUrl);
    axios.get(apiUrl)        
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            store.dispatch(userInfo(response.data));   
            //if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        //if (data.callBackFunctionError){data.callBackFunctionError();}        
        // this.dispatchEvent(new CustomEvent('toast-message', {
        //     bubbles: true,
        //     composed: true,
        //     detail: error.message
        // })); 
        // store.dispatch(addNotification({
        //     notificationName: data.prefixName+'.'+data.actionName,
        //     label_en: error.message, label_es:error.message,
        //     new_sample:0,
        //     diagnoses: 'ERROR'
        // }));
    })    
    .catch(function (error) {
//        console.log('api-usersession >> .catch(error)', error.message);
        // if (data.callBackFunctionError){data.callBackFunctionError();}
        // this.dispatchEvent(new CustomEvent('toast-message', {
        //     bubbles: true,        composed: true,
        //     detail: 'Error on authentication'+error.message
        //   }));           
    })
    .then(function () {
    });
}

}

