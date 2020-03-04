import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

import '../../internalComponents/dialogs/esign-dialog.js';
import '../../internalComponents/dialogs/confirmuser-dialog.js';

import {openEsignDialog} from '../../app/Redux/actions/esign-actions.js';
import {openConfirmUserDialog} from '../../app/Redux/actions/confirmuser-actions.js';
import {AuthenticationApi} from '../../app/mixin/authentication-api.js';
import {Appapi} from '../../app/mixin/api-app';

class AppElements extends Appapi(AuthenticationApi(connect(store)(PolymerElement))) {
    stateChanged(state) {        
        this.finalToken = state.app.user.finalToken; 
        this.currTabEsignRequired=state.tabs.currTabEsignRequired;
        this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired;        
    }    
    static get properties() {
        return {
            finalToken: String,
            currTabConfirmUserRequired: Boolean, 
            currTabEsignRequired: Boolean,
        }
    }
    static get template() {
        return html`
            <esign-dialog></esign-dialog>
            <confirmuser-dialog></confirmuser-dialog>                        
        `;
    }    

appActionTrigger(buttonName, backEndData, buttonDefinition){
    this.buttonName=buttonName;
    this.backEndData=backEndData;        
    //console.log('app-elements >> actionTrigger >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonDefinition', buttonDefinition);  
    //if (this.currTabEsignRequired){
    if (buttonDefinition && buttonDefinition.esign_required){    
        store.dispatch(openEsignDialog(
        this.appActionTriggerNext.bind(this),
        this.appActionTriggerAbort.bind(this)
        ));  
        return;       
    }
    //if (this.currTabConfirmUserRequired){
    if (buttonDefinition && buttonDefinition.confirmuser_required){              
        store.dispatch(openConfirmUserDialog(
        this.appActionTriggerNext.bind(this),
        this.appActionTriggerAbort.bind(this)
        )); 
        return;
    }
    this.appActionTriggerNext();
}    
appActionTriggerAbort(){
    this.dispatchEvent(new CustomEvent('toast-message', {
        bubbles: true,        composed: true,
        detail: 'Va a ser que por mis loginCancelar no continuas! :)'
    }));    
    this.loading=false;  
}
appActionTriggerNext(){
    var buttonName = this.buttonName;
    var backEndData = this.backEndData;        
    var datas = [];
    datas.finalToken=this.finalToken;
    var actionName= buttonName.toUpperCase();
    console.log('app-elements >> appActionTriggerNext >> backEndData', backEndData, 'this.backEndData', this.backEndData, 'buttonName', buttonName);                    
    switch (buttonName.toUpperCase()) {
    case 'USER_CHANGE_PASSWORD':
        datas.newPassword=backEndData.newPassword;
        this.appActionTriggerAPI(null, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
        break;    
    case 'USER_CHANGE_ESIGN':
        datas.newEsign=backEndData.newEsign;
        this.appActionTriggerAPI(null, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
        break;    
    case 'SET_DEFAULT_TABS_ON_LOGIN':
        datas.tabsString=backEndData.tabsString;
        this.appActionTriggerAPI(null, this.finalToken, actionName, datas, datas.tabInfo, this.callBackFunctionEnvMonitElem);
        break;    
    default:
        console.log('Action '+buttonName+' is not declared in env-monit-elements.sample.js >> appActionTriggerNext');
        break;
    }
    return;            
}

}
customElements.define('app-elements', AppElements);