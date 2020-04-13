import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import {store} from '../store';

import '@polymer/paper-spinner/paper-spinner-lite';
//import {AppStorageBehavior} from '@polymer/app-storage/app-storage-behavior';
//import '@polymer/app-storage/app-localstorage.js';

import './internalComponents/form-fields/field-text';
import './internalComponents/form-fields/field-controller';

import './internalComponents/others/language-selector';
import './internalComponents/others/ribbon-element';
import './internalComponents/dialogs/esign-dialog';
import './internalComponents/dialogs/confirmuser-dialog';

import {AuthenticationApi} from './app/mixin/authentication-api';
import {appLogin_formFields, appLogin_ribbonField} from '../config/app-config';

import { doLogin } from './app/Redux/actions/app_actions';
import {addSession} from './app/Redux/actions/session_actions';
import {addTab, setCurrentTab} from './app/Redux/actions/tabs_actions';

class PlatformLogin extends AuthenticationApi(connect(store)(PolymerElement)) {
  static get properties() {
    return {
      axiosErrorMessage: String, //{type: String, notify: true},
      finalToken: {type: String, notify: true},
      loading: {type: Boolean,value: false},
      partialToken: String, 
      partialTokenn: String, 
      sessionId: String,
      appSessionStartDate: String,    
      userName: String,
      password: String,
      //password: {type: String, notify:true, observer: 'login'},
      userInfoId: String,
      userRole: { type: String},  
      userRoles: Array,    
      loggedIn: {type: Boolean, observer: 'loggedInChanged', notify: true},
      formFields: {type: Array, notify: true, bubble: true, value: appLogin_formFields},
      appLoginRibbonField:{type: Object, value:appLogin_ribbonField}, 
      appLoginLogoOnTop:{type:String, value:'./images/app-login/labplanet.png'},   
      appLoginFormBackground:{type:String, value:'./images/app-login/login-hexagon-background.png'},
      appLoginFormBackground2:{type:String, value:'https://cdn5.vectorstock.com/i/1000x1000/90/09/abstract-hexagonal-background-vector-9339009.jpg'}      
    }
  }
  stateChanged(state) {
    this.selectedLanguage = state.app.user.appLanguage;
    this.loggedIn = state.app.user.loggedIn;   
  }   
  static get template() {
    return html`
      <style>
        #test {
            margin-top: 25px;
            font-size: 21px;
            text-align: center;
            animation: fadein 2s;
            -moz-animation: fadein 2s; /* Firefox */
            -webkit-animation: fadein 2s; /* Safari and Chrome */
            -o-animation: fadein 2s; /* Opera */
        }
        @keyframes fadein {
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
        @-moz-keyframes fadein { /* Firefox */
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
        @-webkit-keyframes fadein { /* Safari and Chrome */
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
        @-o-keyframes fadein { /* Opera */
            from {
                opacity:0;
            }
            to {
                opacity: 1;
            }
        }      
      </style>



      <esign-dialog></esign-dialog>
      <confirmuser-dialog> </confirmuser-dialog>
      <div id="test">
      <div name="formbackgroundimage" class="imageCenter">
        <img src="[[appLoginLogoOnTop]]" alt="LabPLANET" height="80" width="100"> 
      </div>  
      <div style="overflow: hidden; text-align:center; width: 320px; background-image: url({{appLoginFormBackground}});">
        <language-selector></language-selector>
        <ribbon-element field="{{appLoginRibbonField.0}}"></ribbon-element>
        
        <paper-spinner-lite alt="Authenticating user and password" width="6px" active="[[loading]]"></paper-spinner-lite>
        
        <template is="dom-repeat" items="{{formFields}}" as="currentfield">       
          <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>       
      </div>
      </div>
    `;
  }
  keyPressed(e){
    //console.log('key pressed');
    if(e.key=="Enter") {
      this.login();
      return;
    }   
  }  
  loggedInChanged(){
    if (this.loggedIn==false){
      this.set('formFields.1.read_only', false); // userName
      this.set('formFields.2.read_only', false); // password
      this.set('formFields.4.read_only', true); // roleList          
      return;
    }
  }
  login() { 
    this.loading=true;
    this.userName=this.formFields[1].value;       this.password=this.formFields[2].value;
    this.dispatchEvent(new CustomEvent('toast', {
      bubbles: true,        composed: true,
      detail: 'Validating User '+this.formFields[0].value+' ... '
        }));  
    var actionName='authenticate';
    var datas = [];
    datas.actionName=actionName;
    datas.dbUserName=this.formFields[1].value ;    datas.dbUserPassword=this.formFields[2].value ;
    datas.callBackFunction=this.authSuccess.bind(this);
    datas.callBackFunctionError=this.authError.bind(this);
//        console.log('process-us-sample-reception >> itemSelected >> this.SampleAPI', paramsUrl, datas);            
    this.ajaxAuthenticate(datas);
    this.set('login.disabled', true);
  }  
  authSuccess(){
    this.authenticated=true;
    this.dispatchEvent(new CustomEvent('toast-message', {
      bubbles: true,        composed: true,
      detail: 'User valid, please select your role to proceed'
    }));    
    this.loading=false;
  }
  authError(e) {
      var msg='authError'+this.axiosErrorMessage;
      this.set('formFields.1.read_only', false); // userName
      this.set('formFields.2.read_only', false); // password
      this.set('formFields.4.read_only', true); // roleList    
      this.dispatchEvent(new CustomEvent('toast-error', {
        bubbles: true,        composed: true,
        detail: msg
      }));
      //console.log('User not valid!', req.message);
      this.set('formFields.3.value', ''); // Reset back the button value to be clickable again
    }

    fillUserRoleList() {
      this.set('formFields.1.read_only', true); // userName
      this.set('formFields.2.read_only', true); // password
      this.set('formFields.4.read_only', false); // roleList          
      //if (this.userRoles==null) this.userRoleError();
      var i;
      for (i = 0; i < this.userRoles.length; i++) { 
        if (i == 0) {
          this.set('formFields.4.items.0.keyName', this.userRoles[0]); 
          this.set('formFields.4.items.0.keyValue_en', this.userRoles[0]); 
          this.set('formFields.4.items.0.keyValue_es', this.userRoles[0]); 
        }else {
          this.push('formFields.4.items', {
                  keyName: this.userRoles[i], 
                  keyValue_es: this.userRoles[i],  
                  keyValue_en: this.userRoles[i]}
                  );     
        }
      }
    }
    initAppSession() {
      store.dispatch(doLogin(this.finalToken, this.userName, this.userInfoId, this.tabsOpenOnLogin));
      var data={
        sessionId: this.appSessionId,
        userRole: this.userRole,
        startDate: this.appSessionStartDate,
        tabsOpenOnLogin: this.tabsOpenOnLogin    
      };
      //console.log('app-login >> initAppSession', 'data', data, 'this.userRole', this.userRole);
      store.dispatch(addSession(data));         
    }
    fieldButtonClicked(e) {  
      if (e.detail.buttonName=="buttonAccess"){                      
        this.login();}
    }

    onListChange(e) {    
      if (e.detail.name=="userRole"){ 
        this.doLogin(e.detail.value);}
    }
    doLogin(userRole) {
      this.userRole=userRole;
      this.ajaxFinalToken({
        actionName: 'finaltoken'  , partialToken:  this.partialToken  , userRole: userRole
      });      
    }  
    constructor() {
      super();
      //this.partialToken="eyJ1c2VyREIiOiJsYWJwbGFuZXQiLCJlU2lnbiI6Im1hbGEiLCJ1c2VyREJQYXNzd29yZCI6Imxhc2xlY2h1Z2FzIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiMTIiLCJ1c2VyUm9sZSI6ImNvb3JkaW5hdG9yIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjEifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.RganJxID3QGqPT210DuJC9b9Wx3U4wFs_0kGVjMuObY";
      //this.partialToken="eyJ1c2VyREIiOiJqdG9iaWFzIiwiZVNpZ24iOiIiLCJ1c2VyREJQYXNzd29yZCI6ImxlY2h1Z2FzIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiIiwidXNlclJvbGUiOiJBZG1pbiIsImFsZyI6IkhTMjU2IiwiaW50ZXJuYWxVc2VySUQiOiIyIn0.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.RZ-RvH4yWa7eyP_etAlq971iG_9HYeMjXJSmXwujoTI";
      //this.partialToken="eyJ1c2VyREIiOiJkemFtYnJhbmEiLCJlU2lnbiI6Im1hbGEiLCJ1c2VyREJQYXNzd29yZCI6ImxlY2h1Z2FzIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiMTIiLCJ1c2VyUm9sZSI6ImNvb3JkaW5hdG9yIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.P14dK3q-NaTeVINlE3gb4-PRMSQGjQbpZtgMTK23z9I";
      //this.userRole="coordinator";
      this.login();
      this.ajaxFinalToken({
        actionName: 'finaltoken'  , partialToken:  this.partialToken  , userRole: this.userRole
      });     
      var curTab = [];
      // store.dispatch(addTab({
      //   tabName: 'process-us' + '-' + 'sampleCustodian',
      //   tabLabel_en: 'sampleCustodian',
      //   tabLabel_es: 'Custodia',
      //   procedure: 'process-us', tabEsignRequired: false, tabConfirmUserRequired: false
      // }));
      // curTab.tabName = 'process-us'+'-'+'sampleCustodian';
      // curTab.currTabEsignRequired=false;
      // curTab.currTabConfirmUserRequired=false;
      // store.dispatch(setCurrentTab(curTab));

      var procObj = {"name": "em-demo-a"};
      store.dispatch(addTab({
        lp_frontend_page_name: 'programs',
        tabName: 'em-demo-a' + '-' + 'programs',
        tabLabel_en: 'Programs',
        tabLabel_es: 'Programas',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));      
      curTab.tabName = 'em-demo-a'+'-'+'programs';
      curTab.currTabEsignRequired=false;
      curTab.currTabConfirmUserRequired=false;
      store.dispatch(setCurrentTab(curTab));      

      
      store.dispatch(addTab({
        lp_frontend_page_name: 'sample-reception',
        tabName: 'em-demo-a' + '-' + 'sample-reception',
        tabLabel_en: 'EM Sample Reception',
        tabLabel_es: 'EM Recepción Muestras',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));
      
      // store.dispatch(addTab({
      //   lp_frontend_page_name: 'results-calendar',
      //   tabName: 'em-demo-a' + '-' + 'results-calendar',
      //   tabLabel_en: 'EM results-calendar',
      //   tabLabel_es: 'EM Calendario REsultados',
      //   procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      // }));        
     
    }
  }
customElements.define('platform-login', PlatformLogin);