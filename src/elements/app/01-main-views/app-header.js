import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store';
import { doLogout } from '../Redux/actions/app_actions';
import { doLogoutNotification } from '../Redux/actions/notifications_actions';
import { doLogoutTab } from '../Redux/actions/tabs_actions';
import {appHeader_fieldsLeft, appHeader_fieldsCenter, appHeader_fieldsRight, appHeader_personFieldsName, appHeader_ribbonField
    } from '../../../config/app-config';
import {UserSession} from  '../mixin/api-usersession';
import '../../internalComponents/others/ribbon-element';
import '../../internalComponents/others/store-consola';
import './../../../config/styles/div-style.js'; 

class appHeader extends UserSession(connect(store)(PolymerElement)) {
    static get properties() {
        return {
            finalToken: {type: String}, //
            //finalToken: {type: String, observer:'getApppHeaderAPI'}, //
            personFieldsName: {type: String, value: appHeader_personFieldsName},            
            fieldsLeft: {type: Array, value: appHeader_fieldsLeft},
            fieldsCenter: {type: Array, notify: true, value: appHeader_fieldsCenter},
            fieldsRight: {type: Array, value: appHeader_fieldsRight},
            appHeaderContent: {type:Object, notify: true, value:{"last_name": "", "photo":"", "first_name": ""}},
            sessionReduxData: {type:Object, notify: true, value:{"sessionId": "", "userRole":"", "startDate": ""}},
            ribbonField: {type: Object, value: appHeader_ribbonField}            
        }
    }
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        //if (!state.app){return;}
        if (state.app.user.userInfo.DATA && state.app.session){
            this.appHeaderContent=state.app.user.userInfo.DATA;
            this.sessionReduxData.userRole = state.app.session.userRole;
            this.sessionReduxData.sessionId = state.app.session.sessionId;
            this.sessionReduxData.startDate = state.app.session.startDate;    
            this.fieldDynamicContent();
            //console.log('stateChanged', 'this.appHeaderContent', this.appHeaderContent, 'this.sessionReduxData', this.sessionReduxData);
        }
        
    }            
    ajaxAppHeaderParams(actionName, finalToken, personFieldsName) {
        return {actionName:actionName, finalToken:finalToken, personFieldsName:personFieldsName};
    }    
    static get template() {
        return html`
        <style include="div-style"></style>       
        <div class="appHeaderSplit appHeaderLeft"> 
            <ribbon-element field="[[ribbonField.0]]"></ribbon-element>
            <div class="appHeaderSplit appHeaderLeftIcon"> 
            <template is="dom-repeat" items="{{fieldsLeft}}" as="currentfield">                
                <field-controller  field="{{currentfield}}"></field-controller>
            </template>
            </div>
        </div>    
        <div class="appHeaderSplit appHeaderCenter" id="sessionInfo">
            <template is="dom-repeat" id="fcenter" items="{{fieldsCenter}}" as="currentfield">
                <field-controller style="color: #4285f4;" field="{{currentfield}}"></field-controller>
            </template>                            
        </div>            
        <div class="appHeaderSplit appHeaderRight">
            <language-selector></language-selector>
            <store-consola></store-consola>
            <template is="dom-repeat" items="{{fieldsRight}}" as="currentfield">
                <field-controller field="{{currentfield}}" on-avatar-item-clicked="AppHeaderRightClicked"></field-controller>
            </template>                            
            <vaadin-button on-click="doLogout" style="width:12px;height:0px;">
                <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
                <path fill="#edf6f4e8" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                </svg>            
            </vaadin-button>                    
        </div>
        `;
    }
    AppHeaderRightClicked(){
        console.log('AppHeaderRightClicked');
    }
    doLogout() {
        store.dispatch(doLogout());
        store.dispatch(doLogoutTab());
        store.dispatch(doLogoutNotification());
    }
    getApppHeaderAPI(){
        var actionName='getAppHeader';
        var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&personFieldsName='+this.personFieldsName;
        var datas = [];
        datas.finalToken=this.finalToken; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
        //datas.callBackFunction=this.fieldDynamicContent.bind(this);
        this.getAppHeader(datas);
        //this.fieldDynamicContent();
    }

    fieldDynamicContent(){        
        if (!this.appHeaderContent.first_name.length>0){
            this.fieldsCenter[1].label_en='Mr: '+this.appHeaderContent.first_name+' '+this.appHeaderContent.last_name+ ' have a nice experience.';
            this.fieldsCenter[1].label_es='Sr: '+this.appHeaderContent.first_name+' '+this.appHeaderContent.last_name+ ' ten una experiencia genial.';
        }
        if (this.sessionReduxData.userRole.length>0){
            this.fieldsCenter[2].label_en='Role:'+this.sessionReduxData.userRole+' Session ID:'   +this.sessionReduxData.sessionId+' Started On:'+this.sessionReduxData.startDate;
            this.fieldsCenter[2].label_es='Rol:' +this.sessionReduxData.userRole+' Sesión Número:'+this.sessionReduxData.sessionId+' Comenzó en:'+this.sessionReduxData.startDate;
        }
        //this.fieldsCenter[1].label_es='capulloooooooteeeee';
        console.log('this.fieldsCenter', this.fieldsCenter); 
        //this.$.sessionInfo.value=this.fieldsCenter;      
    }
    fieldDynamicError(){
        this.fieldsCenter[1].label_en='Error on getAppHeader API call';
    }    
    constructor() {
        super();
        this.getApppHeaderAPI();
        //this.fieldDynamicContent();
        //this.$.appSessionInfo.field=this.fieldsCenter;
        //console.log('header', this.fieldsCenter);
        //this.$.sessionInfo.
        //this.$.sessionInfo.style.display='none'; this.$.sessionInfo.style.display='block';
        
        //document.getElementById("session-info").innerHTML.reload;
        //this.$.appSessionInfo.value=this.fieldsCenter;
    }
}
customElements.define('app-header', appHeader);