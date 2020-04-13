import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../store.js";import{doLogout}from"../Redux/actions/app_actions.js";import{doLogoutNotification}from"../Redux/actions/notifications_actions.js";import{doLogoutTab}from"../Redux/actions/tabs_actions.js";import{appHeader_fieldsLeft,appHeader_fieldsCenter,appHeader_fieldsRight,appHeader_personFieldsName,appHeader_ribbonField,appLogOut_logOutMessage}from"../../../config/app-config.js";import{UserSession}from"../mixin/api-usersession.js";import"../../internalComponents/others/ribbon-element.js";import"../../internalComponents/others/store-consola.js";import"../../../config/styles/div-style.js";import"../../internalComponents/form-fields/field-controller.js";import{setCurrentTab,addSystemTab}from"../Redux/actions/tabs_actions.js";class appHeader extends UserSession(connect(store)(PolymerElement)){static get properties(){return{finalToken:{type:String},personFieldsName:{type:String,value:appHeader_personFieldsName},fieldsLeft:{type:Array,value:appHeader_fieldsLeft},fieldsCenter:{type:Array,notify:!0,value:appHeader_fieldsCenter},fieldsRight:{type:Array,value:appHeader_fieldsRight},appHeaderContent:{type:Object,notify:!0,value:{last_name:"",photo:"",first_name:""}},sessionReduxData:{type:Object,notify:!0,value:{sessionId:"",userRole:"",startDate:""}},ribbonField:{type:Object,value:appHeader_ribbonField},appLogOut_logOutMessage:{type:Object,value:appLogOut_logOutMessage},selectedLanguage:String}}stateChanged(state){this.finalToken=state.app.user.finalToken;this.selectedLanguage=state.app.user.appLanguage;if(state.app.user.userInfo.data){this.appHeaderContent.first_name=state.app.user.userInfo.data.first_name;this.appHeaderContent.last_name=state.app.user.userInfo.data.last_name;//console.log('app-header >> stateChanged', this.appHeaderContent.first_name+' > '+this.appHeaderContent.last_name)            
}if(state.app.session){this.sessionReduxData.userRole=state.app.session.userRole;this.sessionReduxData.sessionId=state.app.session.sessionId;this.sessionReduxData.startDate=state.app.session.startDate}this.fieldDynamicContent()}ajaxAppHeaderParams(actionName,finalToken,personFieldsName){return{actionName:actionName,finalToken:finalToken,personFieldsName:personFieldsName}}static get template(){return html`
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
        `}AppHeaderRightClicked(e){if(e.detail.avatarName="user_avatar"){var userProfileTab={lp_frontend_page_name:"user-profile/user-profile.js",tabName:"user-profile",tabLabel_en:"User Profile",tabLabel_es:"Perfil de usuario",procedure:"user",tabEsignRequired:!1,tabConfirmUserRequired:!0};store.dispatch(addSystemTab(userProfileTab));store.dispatch(setCurrentTab(userProfileTab))}}doLogout(){var message="";switch(this.selectedLanguage){case"es":message=this.appLogOut_logOutMessage.closedSession.message_es;break;//message=response.data.message_es; break;            
default:message=this.appLogOut_logOutMessage.closedSession.message_en;break;//message=response.data.message_en; break;
}this.authenticated=!0;this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:message//'User valid, please select your role to proceed'
}));store.dispatch(doLogout());store.dispatch(doLogoutTab());store.dispatch(doLogoutNotification())}getApppHeaderAPI(){var actionName="getAppHeader",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&personFieldsName="+this.personFieldsName,datas=[];datas.finalToken=this.finalToken;datas.actionName=actionName;datas.paramsUrl=paramsUrl;this.getAppHeader(datas)}fieldDynamicContent(){if(this.appHeaderContent.first_name&&0<this.appHeaderContent.first_name.length){this.fieldsCenter[1].label_en="Mr: "+this.appHeaderContent.first_name+" "+this.appHeaderContent.last_name+" have a nice experience.";this.fieldsCenter[1].label_es="Sr: "+this.appHeaderContent.first_name+" "+this.appHeaderContent.last_name+" ten una experiencia genial.";//console.log('app-header >> fieldDynamicContent', this.fieldsCenter[1].label_en+' > '+this.fieldsCenter[1].label_es);
}if(0<this.sessionReduxData.userRole.length){this.fieldsCenter[2].label_en="Role:"+this.sessionReduxData.userRole+" Session ID:"+this.sessionReduxData.sessionId+" Started On:"+this.sessionReduxData.startDate;this.fieldsCenter[2].label_es="Rol:"+this.sessionReduxData.userRole+" Sesi\xF3n N\xFAmero:"+this.sessionReduxData.sessionId+" Comenz\xF3 en:"+this.sessionReduxData.startDate}}fieldDynamicError(){this.fieldsCenter[1].label_en="Error on getAppHeader API call"}constructor(){super();this.getApppHeaderAPI()}}customElements.define("app-header",appHeader);