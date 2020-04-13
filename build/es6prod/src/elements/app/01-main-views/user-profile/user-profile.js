define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../mixin/authentication-api.js","../../../../config/app-config.js","../../mixin/api-app.js","../../../modules/process-us/03config/config-process.js","../../mixin/app-elements.js","../../../../config/styles/cards-style.js"],function(_polymerElement,_connectMixin,_store,_authenticationApi,_appConfig,_apiApp,_configProcess,_appElements,_cardsStyle){"use strict";/**
 * `user-profile` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class UserProfile extends(0,_apiApp.Appapi)((0,_authenticationApi.AuthenticationApi)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){stateChanged(state){console.log("user-Profile.js >> stateChanged >> this.userInfo",this.userInfo);this.finalToken=state.app.user.finalToken;this.userInfo=state.app.user;this.tabsOpen=state.tabs.tabs}static get properties(){return{schemaPrefix:{type:String,value:_configProcess.schema_name},finalToken:{type:String},userInfo:{type:Object},tabsOpen:{type:Object},changeUserPasswordForm:{type:Array,value:_appConfig.changeUserPasswordForm},changeUserEsignForm:{type:Array,value:_appConfig.changeUserEsignForm},saveOpenTabsForm:{type:Array,value:_appConfig.saveOpenTabsForm}}}static get template(){return _polymerElement.html`
        <style include="cards-style"></style>
        <style>
            #wraxxxpper
                {
                width:800px;
                background-color:#f2f2e8;
                position:relative;
                left:50%;
                margin-left:-400px;
                border-radius: 10px;
                -moz-border-radius: 10px;
                padding:5px;
                }
            #topBar
                {
                width:780px;
                border: 1px solid;
                border-color: #dbd9ca;
                border-radius: 10px;
                -moz-border-radius: 10px;
                margin:5px;
                padding:5px;
                }
            #central
                {
                width:780px;
                border: 1px solid;
                border-color: #dbd9ca;
                border-radius: 10px;
                -moz-border-radius: 10px;
                margin:5px;
                margin-top:20px;
                padding:5px;
                }  
        </style>      
        <style include="cards-style"></style>  
        <app-elements id="appelement"></app-elements>
        <div id="topBar">
            <div id="central"> 
                <p>{{userInfo.userDB}} </p>
                <div class="card">
                    <div id="changePw" style="display:flex;">
                    <template is="dom-repeat" items="{{changeUserPasswordForm}}" as="currentfield">       
                        <field-controller on-keydown="keyPressedChangePassword" on-field-button-clicked="changePassword" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>       
                    </div>
                    <div id="changeEsign" style="display:flex;">
                    <template is="dom-repeat" items="{{changeUserEsignForm}}" as="currentfield">       
                        <field-controller on-keydown="keyPressedChangeEsign" on-field-button-clicked="changeEsign" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>                                
                    </div>
                    <div id="changeEsign" style="display:flex;">
                    <template is="dom-repeat" items="{{saveOpenTabsForm}}" as="currentfield">       
                        <field-controller on-keydown="keyPressed" on-field-button-clicked="saveOpenTabs" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>                                
                    </div>
                </div>
            </div>
        </div>
        `}keyPressedChangePassword(e){//console.log('key pressed');
if("Enter"==e.key){this.changePassword();return}}keyPressedChangeEsign(e){//console.log('key pressed');
if("Enter"==e.key){this.changeEsign();return}}changePassword(e){var selectedRow=[];selectedRow.newPassword=_appConfig.changeUserPasswordForm[0].value;this.$.appelement.appActionTrigger(_appConfig.changeUserPasswordForm[1].name,selectedRow,_appConfig.changeUserPasswordForm[1])}changeEsign(e){var selectedRow=[];selectedRow.newEsign=_appConfig.changeUserEsignForm[0].value;this.$.appelement.appActionTrigger(_appConfig.changeUserEsignForm[1].name,selectedRow,_appConfig.changeUserEsignForm[1])}saveOpenTabs(e){var tabsString="",i;for(i=0;i<this.tabsOpen.length;i++){tabsString=tabsString+"lp_frontend_page_name:"+this.tabsOpen[i].lp_frontend_page_name+"*";tabsString=tabsString+"tabName:"+this.tabsOpen[i].tabName+"*";tabsString=tabsString+"tabLabel_en:"+this.tabsOpen[i].tabLabel_en+"*";tabsString=tabsString+"tabLabel_es:"+this.tabsOpen[i].tabLabel_es+"*";if(this.tabsOpen[i].procedure.name!=void 0){tabsString=tabsString+"procedure:"+this.tabsOpen[i].procedure.name+"*";tabsString=tabsString+"tabType:"+"tab"+"*"}else{tabsString=tabsString+"procedure:"+this.tabsOpen[i].procedure+"*";tabsString=tabsString+"tabType:"+"systab"+"*"}tabsString=tabsString+"tabEsignRequired:"+this.tabsOpen[i].tabEsignRequired+"*";tabsString=tabsString+"tabConfirmUserRequired:"+this.tabsOpen[i].tabConfirmUserRequired;if(i+1<this.tabsOpen.length){tabsString=tabsString+"|"}}console.log("saveOpenTabs",tabsString);var selectedRow=[];selectedRow.tabsString=tabsString;this.$.appelement.appActionTrigger(_appConfig.saveOpenTabsForm[0].name,selectedRow,_appConfig.saveOpenTabsForm[0])}}customElements.define("user-profile",UserProfile)});