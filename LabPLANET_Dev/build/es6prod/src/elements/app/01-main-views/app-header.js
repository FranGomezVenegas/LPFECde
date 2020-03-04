define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../Redux/actions/app_actions.js","../Redux/actions/notifications_actions.js","../Redux/actions/tabs_actions.js","../../../config/app-config.js","../mixin/api-usersession.js","../../internalComponents/others/ribbon-element.js","../../internalComponents/others/store-consola.js","../../../config/styles/div-style.js"],function(_polymerElement,_connectMixin,_store,_app_actions,_notifications_actions,_tabs_actions,_appConfig,_apiUsersession,_ribbonElement,_storeConsola,_divStyle){"use strict";class appHeader extends(0,_apiUsersession.UserSession)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{finalToken:{type:String},//
//finalToken: {type: String, observer:'getApppHeaderAPI'}, //
appHeaderContent:{type:Object},personFieldsName:{type:String,value:_appConfig.appHeader_personFieldsName},fieldsLeft:{type:Array,value:_appConfig.appHeader_fieldsLeft},fieldsCenter:{type:Array,value:_appConfig.appHeader_fieldsCenter},fieldsRight:{type:Array,value:_appConfig.appHeader_fieldsRight},sessionReduxData:{type:Object,notify:!0,value:{sessionId:"",userRole:"",startDate:""}},ribbonField:{type:Object,value:_appConfig.appHeader_ribbonField}}}stateChanged(state){this.finalToken=state.app.user.finalToken;//if (!state.app){return;}
this.sessionReduxData.userRole=state.app.session.userRole;this.sessionReduxData.sessionId=state.app.session.sessionId;this.sessionReduxData.startDate=state.app.session.startDate;this.fieldDynamicContent()}ajaxAppHeaderParams(actionName,finalToken,personFieldsName){return{actionName:actionName,finalToken:finalToken,personFieldsName:personFieldsName}}static get template(){return _polymerElement.html`
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
        {{fieldsCenter.length}}
            <template is="dom-repeat" items="{{fieldsCenter}}" as="currentfield">
                <field-controller style="color: #4285f4;" field="{{currentfield}}"></field-controller>
            </template>                            
        </div>            
        <div class="appHeaderSplit appHeaderRight">
            <language-selector></language-selector>
            <store-consola></store-consola>
            <template is="dom-repeat" items="{{fieldsRight}}" as="currentfield">
                <field-controller field="{{currentfield}}"></field-controller>
            </template>                            
            <vaadin-button on-click="doLogout" style="width:12px;height:0px;">
                <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
                <path fill="#edf6f4e8" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                </svg>            
            </vaadin-button>                    
        </div>
        `}doLogout(){_store.store.dispatch((0,_app_actions.doLogout)());_store.store.dispatch((0,_tabs_actions.doLogoutTab)());_store.store.dispatch((0,_notifications_actions.doLogoutNotification)())}getApppHeaderAPI(){//return;
//console.log('this.personFieldsName', this.personFieldsName);
var actionName="getAppHeader",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&personFieldsName="+this.personFieldsName,datas=[];datas.finalToken=this.finalToken;datas.actionName=actionName;datas.paramsUrl=paramsUrl;this.getAppHeader(datas);this.fieldDynamicContent()}fieldDynamicContent(){//        console.log('app-header', 'fieldDynamicContent', 'this.appHeaderContent', this.appHeaderContent);
if(!this.appHeaderContent){return}this.fieldsCenter[1].label_en="Mr: "+this.appHeaderContent.first_name+" "+this.appHeaderContent.last_name+" have a nice experience.";this.fieldsCenter[1].label_es="Sr: "+this.appHeaderContent.first_name+" "+this.appHeaderContent.last_name+" ten una experiencia genial.";this.fieldsCenter[2].label_en="Role:"+this.sessionReduxData.userRole+" Session ID:"+this.sessionReduxData.sessionId+" Started On:"+this.sessionReduxData.startDate;this.fieldsCenter[2].label_es="Rol:"+this.sessionReduxData.userRole+" Sesi\xF3n N\xFAmero:"+this.sessionReduxData.sessionId+" Comenz\xF3 en:"+this.sessionReduxData.startDate;console.log("app-header","this.appHeaderContent",this.appHeaderContent,"this.fieldsCenter",this.fieldsCenter)}fieldDynamicError(){this.fieldsCenter[1].label_en="Error on getAppHeader API call"}constructor(){super();this.getApppHeaderAPI();//this.fieldDynamicContent();
//this.$.appSessionInfo.field=this.fieldsCenter;
//console.log('header', this.fieldsCenter);
//this.$.sessionInfo.
//this.$.sessionInfo.style.display='none'; this.$.sessionInfo.style.display='block';
//document.getElementById("session-info").innerHTML.reload;
//this.$.appSessionInfo.value=this.fieldsCenter;
}}customElements.define("app-header",appHeader)});