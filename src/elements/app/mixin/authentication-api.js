import {backendUrl, appAuthenticateApiUrl} from '../../../config/api-config'
import {store} from '../../../store';
import {ApiMessage} from '../app-functions/apiMessage';
//import { addNotification  } from '../../../app/Redux/actions/notifications_actions';
//import { foo } from '../redux/actions';
//import {startLoading} from '../Redux/actions/app_actions';
/**
 * @mixinFunction
 * @polymer
 */
export const AuthenticationApi = (superClass) => class extends superClass {

   
ajaxAuthenticate(data) {
    var apiUrl=backendUrl+appAuthenticateApiUrl; 
//    console.log('authentication-api.ajaxAuthenticate', data, data.actionName);
    axios.get(apiUrl, {        
        params: {
        'actionName': data.actionName  , 'dbUserName': data.dbUserName  , 'dbUserPassword': data.dbUserPassword}
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response.data);
            if (data.callBackFunction){data.callBackFunction();}
            this.partialToken=response.data.myToken;
            this.userInfoId=response.data.userInfoId;
            this.ajaxUserRoles({actionName:'getuserrole', myToken:response.data.myToken}); 
            return;
        }
        var state=store.getState();
        var language=state.app.user.appLanguage; 
        var message=''; 
        switch(language){
            case 'es': message=response.data.message_es; break;            
            default: message=response.data.message_en; break;
        }            

        //console.log('.then , response!=200, calling callBackFunctionError', 'response.data', response.data);
        //if (data.callBackFunctionError){data.callBackFunctionError();}
        //var errMessage = ApiMessage.errorMessage(response.data);
        this.dispatchEvent(new CustomEvent('toast-error', {
             bubbles: true,        composed: true,
             detail: message //response.data.error_code //ApiMessage.errorMessage(response.data)
           }));          
    })
    .catch(function (error) {
//        console.log('.catch , calling callBackFunctionError', error.response.data, data.callBackFunctionError);
        //if (data.callBackFunctionError){data.callBackFunctionError();}
        //var errMessage = ApiMessage.errorMessage(response.data);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,        composed: true,
            detail: response.data.error_code
        }));          
    })
    .then(function () {
    });
}

ajaxUserRoles(data) {
    var apiUrl=backendUrl+appAuthenticateApiUrl; 
//    console.log('authentication-api.ajaxUserRoles', data);
    axios.get(apiUrl, {
        params: {
        'actionName': data.actionName, 'myToken': data.myToken}
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response);
            this.userRoles=response.data;
            this.fillUserRoleList();
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,        composed: true,
            detail: 'Error on getting user roles'
          }));        
        })
    .then(function () {
//        console.log('always executed')
        });
}

ajaxFinalToken(data) {
    var apiUrl=backendUrl+appAuthenticateApiUrl; 
//    console.log('authentication-api.ajaxUserRoles', data);
    axios.get(apiUrl, {
        params: {
        'actionName': data.actionName, 'myToken': data.partialToken, 'userRole': data.userRole}
    })
    .then( response => {
        if(response.status == 200) {
//console.log('authentication-api >> ajaxFinalToken', 'response.data', response.data);
            this.finalToken=response.data.finalToken;
            this.appSessionId=response.data.appSessionId;
            this.appSessionStartDate=response.data.appSessionStartDate;
            this.userTabsOnLogin=response.data.userTabsOnLogin;
            
//console.log('this.userTabsOnLogin', this.userTabsOnLogin);
            this.initAppSession();
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,
            composed: true,
            detail: 'Error on getting Token, Cannot proceed!'
          }));      
        })
    .then(function () {
//      console.log('always executed')
        });
}

ajaxTokenValidateEsignPhrase(data) {
    var apiUrl=backendUrl+appAuthenticateApiUrl; 
    //console.log('authentication-api.ajaxUserRoles', data);
    axios.get(apiUrl, {
        params: {
        'actionName': 'TOKEN_VALIDATE_ESIGN_PHRASE', 'finalToken': data.finalToken, 'esignPhraseToCheck': data.esignPhraseToCheck}
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response);
            this.finalToken=response.data.finalToken;
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,
            composed: true,
            detail: 'Error on getting Token, Cannot proceed!'
          }));      
        })
    .then(function () {
//      console.log('always executed')
        });
}

ajaxTokenValidateUserCredentials(data) {
    var apiUrl=backendUrl+appAuthenticateApiUrl; 
    //console.log('authentication-api.ajaxUserRoles', data);
    axios.get(apiUrl, {
        params: {
        'actionName': 'TOKEN_VALIDATE_USER_CREDENTIALS', 'finalToken': data.finalToken
      , 'userToCheck': data.userToCheck, 'passwordToCheck': data.passwordToCheck}
    })
    .then( response => {
        if(response.status == 200) {
//            console.log(response);
            this.finalToken=response.data.finalToken;
            if (data.callBackFunction){data.callBackFunction();}
            return;
        }
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,        composed: true,
            detail: 'Error on authentication although the connectivity with the API ended with success! Status: '+response.status
          }));         
        })
    .catch(function (error) {
        if (data.callBackFunctionError){data.callBackFunctionError();}
        this.dispatchEvent(new CustomEvent('toasterror', {
            bubbles: true,
            composed: true,
            detail: 'Error on getting Token, Cannot proceed!'
          }));      
        })
    .then(function () {
//      console.log('always executed')
        });
}



}