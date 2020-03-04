import {backendUrl, appProcedureListApiUrl} from '../../../config/api-config'
import {store} from '../../../store';
import {setAppProcedureList} from '../Redux/actions/app_actions';

import {appProcedureListFake} from '../../../config/json-fake';
//import { foo } from '../redux/actions';
/**
 * @mixinFunction
 * @polymer
 */
export const ProcedureList = (superClass) => class extends superClass {
    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }   
getProcedureList(data) {
    //store.dispatch(setAppProcedureList(appProcedureListFake));
    //return;
    //console.log('getProcedureList');
//    this.sleep(3000);
    //console.log('getProcedureList');
    var apiUrl=backendUrl+appProcedureListApiUrl; 
//    console.log('getProcedureList', apiUrl, data.finalToken);
    if (!data.finalToken){ return;}
    axios.get(apiUrl, {        
        params: {
        'finalToken': data.finalToken}
    })
    .then( response => {
        //console.log('app-procedurelist-api', response.status);        
        if(response.status == 200) {
            
            //this.procedureList=response.data;
            store.dispatch(setAppProcedureList(response.data));
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
        console.log(error.message);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication'+error.message
          }));           
        })
    .then(function () {
        });
}

}