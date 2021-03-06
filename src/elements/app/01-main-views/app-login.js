import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import {store} from '../../../store';

import '@polymer/paper-spinner/paper-spinner-lite';

import '../../internalComponents/form-fields/field-text';
import '../../internalComponents/form-fields/field-controller';

import '../../internalComponents/others/language-selector';
import '../../internalComponents/others/ribbon-element';

import {AuthenticationApi} from '../mixin/authentication-api';
import {appLogin_formFields, appLogin_ribbonField, userProfileHome, appLogin_authenticationMessage, sopUserPendingSop_fieldToRetrieve, sopUserAllSop_fieldToRetrieve} from '../../../config/app-config';

import { doLogin , startLoading} from '../Redux/actions/app_actions';

import {addSession} from '../Redux/actions/session_actions';
import {UserSession} from  '../mixin/api-usersession';
import {ProcedureList} from '../mixin/app-procedurelist-api';
import {FrontendSopUser} from '../mixin/frontend-sopuser';

import {addTab, setCurrentTab, addSystemTab} from '../Redux/actions/tabs_actions';
import './../../../config/styles/div-style.js';
import './../../../config/styles/img-style.js'; 
class AppLogin extends FrontendSopUser(ProcedureList(UserSession(AuthenticationApi(connect(store)(PolymerElement))))) {
  static get properties() {
    return {
      axiosMessage: {type: String, value:appLogin_authenticationMessage},
      finalToken: {type: String, notify: true},
      loading: {type: Boolean,value: false},
      partialToken: String, 
      partialTokenn: String, 
      sessionId: String,
      appSessionStartDate: String,    
      userName: String,
      password: String,
      userInfoId: String,
      userTabsOnLogin: String,
      userRole: { type: String},  
      userRoles: Array,    
      loggedIn: {type: Boolean, observer: 'loggedInChanged', notify: true},
      formFields: {type: Array, notify: true, bubble: true, value: appLogin_formFields},
      appLoginRibbonField:{type: Object, value:appLogin_ribbonField}, 
      appLoginLogoOnTop:{type:String, value:'./images/app-login/labplanet.png'},   
      rolesList:{type: Array, value:[{keyName:"rutina", keyValue_en:"routine", keyValue_es:"rutina"},]},
      appLoginFormBackground:{type:String, value:'./images/hexagon-white-blue-light.jpg'},
      appLoginFormBackgroundBuena:{type:String, value:'./images/app-login/login-hexagon-background.png'},
      appLoginFormBackground2:{type:String, value:'https://cdn5.vectorstock.com/i/1000x1000/90/09/abstract-hexagonal-background-vector-9339009.jpg'},      
      selectedLanguage: String,
    }
  }
  static get template() {
    return html`
      <style include="div-style"></style>
      <style include="img-style"></style>

      <div id="appLoginMainDiv">
      <div name="formbackgroundimage" class="imageCenter">
        <img src="[[appLoginLogoOnTop]]" class="appLoginLogoOnTop"> 
      </div>  
      <div class="appLoginForm" style="background-image: url({{appLoginFormBackground}});">
        <language-selector></language-selector>
        <ribbon-element field="{{appLoginRibbonField.0}}"></ribbon-element>
        
        <paper-spinner-lite alt="Authenticating user and password" width="6px" active="[[loading]]"></paper-spinner-lite>
        <form id="form">
          <template is="dom-repeat" items="{{formFields}}" as="currentfield">       
            <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
          </template>       
        </form>
      </div>
      </div>
    `;
  }
  keyPressed(e){
    //console.log('key pressed');
    if(e.key=="Enter") {
      if (e.target.field.name.toUpperCase()=="USER"){        
        const field=this.shadowRoot.getElementById('password').focus();
        //field.focus();
        return;
      }
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
    this.loading=false;
  }
  authError(e) {
      this.authenticated=false;
      this.loading=false;      
      var message=''; 
      switch(this.selectedLanguage){
          case 'es': message=this.axiosMessage.connectedFails.message_es; break; //message=response.data.message_es; break;            
          default: message=this.axiosMessage.connectedFails.message_en; break; //message=response.data.message_en; break;
      }          
      this.set('formFields.1.read_only', false); // userName
      this.set('formFields.2.read_only', false); // password
      this.set('formFields.4.read_only', true); // roleList    
      this.dispatchEvent(new CustomEvent('toast-error', {
        bubbles: true,        composed: true,
        detail: message
      }));
      //console.log('User not valid!', req.statusText);
      this.set('formFields.3.value', ''); // Reset back the button value to be clickable again
    }

    fillUserRoleList() {
      //console.log('fillUserRoleList');
      if (this.userRoles.length==1){
        var message=''; 
        switch(this.selectedLanguage){
            case 'es': message=this.axiosMessage.connectedSuccess_singleRole.message_es; break; //message=response.data.message_es; break;            
            default: message=this.axiosMessage.connectedSuccess_singleRole.message_en; break; //message=response.data.message_en; break;
        }        
      }else{
        var message=''; 
        switch(this.selectedLanguage){
            case 'es': message=this.axiosMessage.connectedSuccess.message_es; break; //message=response.data.message_es; break;            
            default: message=this.axiosMessage.connectedSuccess.message_en; break; //message=response.data.message_en; break;
        }        
      }
      this.dispatchEvent(new CustomEvent('toast-message', {
        bubbles: true,        composed: true,
        detail: message//'User valid, please select your role to proceed'
      }));   
      this.set('formFields.1.read_only', true); // userName
      this.set('formFields.2.read_only', true); // password
      this.set('formFields.4.read_only', false); // roleList          
      
      var i;
      if (this.userRoles.length==1){
        this.userRole=this.userRoles[0];
        this.doLogin(this.userRole);
        return;
      }

      for (i = 0; i < this.userRoles.length; i++) { 
        var newElement=[{"keyName":'', "keyValue_en":'',"keyValue_es":''}];
        newElement.keyName=this.userRoles[i]; 
        newElement.keyValue_en=this.userRoles[i]; 
        newElement.keyValue_es=this.userRoles[i]; 
        this.rolesList[i]=newElement;
      }
      this.set('formFields.4.items', this.rolesList);
    }
    initAppSession() {      
//console.log('app-login >> initAppSession >> addSession', 'this.finalToken', this.finalToken, 'data', data, 'this.userRole', this.userRole);
      var tabsLogin='';
      if (this.userTabsOnLogin){tabsLogin=this.userTabsOnLogin;}
      var data={
        sessionId: this.appSessionId,
        userRole: this.userRole,
        startDate: this.appSessionStartDate,    
        userTabsOnLogin : tabsLogin    
      };
      this.getProcedureList({finalToken:this.finalToken, callBackFunction:this.getAllMySops.bind(this), callBackFunction2:this.getMyPendingSops.bind(this)});            
      store.dispatch(addSession(data));   
      var actionName='getAppHeader';
      var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&personFieldsName='+this.userInfoId;
      var datas = [];
      datas.finalToken=this.finalToken; datas.actionName=actionName; datas.paramsUrl=paramsUrl;

      this.openTabsOnLogin(this.userTabsOnLogin);
      this.getAppHeader(datas);   
      store.dispatch(doLogin(this.finalToken, this.userName, this.userInfoId, this.userTabsOnLogin ));
    }
    fieldButtonClicked(e) {  
      if (e.detail.buttonName=="buttonAccess"){                      
        this.login();}
    }
    getMyPendingSops(){
      var actionName='MY_PENDING_SOPS';
      var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&sopFieldsToRetrieve='+sopUserPendingSop_fieldToRetrieve;
      var datas = [];
      datas.finalToken=this.finalToken; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
      this.frontEndSopUserAPI(datas);
    }

    getAllMySops(){
      var actionName='ALL_MY_SOPS';
      var paramsUrl='actionName='+actionName+'&finalToken='+this.finalToken+'&sopFieldsToRetrieve='+sopUserAllSop_fieldToRetrieve;
      var datas = [];
      datas.finalToken=this.finalToken; datas.actionName=actionName; datas.paramsUrl=paramsUrl;
      this.frontEndSopUserAPI(datas);      
    }

    onListChange(e) {    
      if (e.detail.name=="userRole"){ 
        this.doLogin(e.detail.value);}
    }
    doLogin(userRole) {
      this.userRole=userRole;
      store.dispatch(startLoading());
      this.ajaxFinalToken({
        actionName: 'finaltoken'  , partialToken:  this.partialToken  , userRole: userRole
      });      
    }  

    openTabsOnLogin(tabsInfo){
      if (!tabsInfo) {return;}
      var i;
      for (i = 0; i < tabsInfo.length; i++) { 
        //if (tabsInfo[i].tabName!='user-profile'){
          var curTab={
            lp_frontend_page_name: tabsInfo[i].lp_frontend_page_name,
            tabName: tabsInfo[i].tabName,
            tabLabel_en: tabsInfo[i].tabLabel_en, tabLabel_es: tabsInfo[i].tabLabel_es,
            procedure: tabsInfo[i].procedure, tabEsignRequired: tabsInfo[i].tabEsignRequired, tabConfirmUserRequired: tabsInfo[i].tabConfirmUserRequired
          };
        //} 

        if (tabsInfo[i].tabType=='tab'){
          var procObj = {"name": tabsInfo[i].procedure};
          curTab.procedure=procObj;
          store.dispatch(addTab(curTab));
        }
        if (tabsInfo[i].tabType=='systab'){
          curTab.procedure=tabsInfo[i].procedure;
          //if (tabsInfo[i].tabName!='user-profile'){
            store.dispatch(addSystemTab(curTab));
          //}
        }        
      }
      store.dispatch(setCurrentTab(curTab));  
    }
    stateChanged(state) {
      this.selectedLanguage = state.app.user.appLanguage;
      this.loggedIn = state.app.user.loggedIn;   
      // this.focus(); Intento de poner el foco en el primer campo de formulario
    }   
  
/* Intento por poner el foco en el campo user, lo hace pero lo quita, creo que falta un stop propagatedown pero no sé usarlo
    focus(e){
      console.log(this.formFields);
      var elem=this.shadowRoot.getElementById(this.formFields[1].name);
      //var elem=this.shadowRoot.querySelector("field-text");      
      if (elem){elem.focus();}
    }  
    ready() {
      super.ready();
      this.focus();
    }
*/    
    constructor() {
      super();
      return;
      var curTab = [];            
      this.userName="labplanet"; 
      this.userInfoId="1"; 
      //return;      

      this.dbUserPassword="laslechugas";
      this.userRole="coordinator";
      this.formFields[1].value=this.userName;
      this.formFields[2].value=this.dbUserPassword;
      this.formFields[3].value=this.userRole;
      //return;      
      this.partialToken="eyJ1c2VyREIiOiJsYWJwbGFuZXQiLCJlU2lnbiI6ImhvbGEiLCJ1c2VyREJQYXNzd29yZCI6Imxhc2xlY2h1Z2FzIiwidXNlcl9wcm9jZWR1cmVzIjoiW2VtLWRlbW8tYSwgcHJvY2Vzcy11cywgcHJvY2Vzcy1ldSwgZ2Vub21hLTFdIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiMTUzNyIsImFwcFNlc3Npb25TdGFydGVkRGF0ZSI6IldlZCBKYW4gMDggMTM6MzM6MjggQ0VUIDIwMjAiLCJ1c2VyUm9sZSI6ImNvb3JkaW5hdG9yIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjEifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.-dgJRbGuF71VEKTu_RomSXdn81bdvErbxNpyUmqIdZ0";
      //this.partialToken="eyJ1c2VyREIiOiJqdG9iaWFzIiwiZVNpZ24iOiIiLCJ1c2VyREJQYXNzd29yZCI6ImxlY2h1Z2FzIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiIiwidXNlclJvbGUiOiJBZG1pbiIsImFsZyI6IkhTMjU2IiwiaW50ZXJuYWxVc2VySUQiOiIyIn0.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.RZ-RvH4yWa7eyP_etAlq971iG_9HYeMjXJSmXwujoTI";
      //this.partialToken="eyJ1c2VyREIiOiJkemFtYnJhbmEiLCJlU2lnbiI6Im1hbGEiLCJ1c2VyREJQYXNzd29yZCI6ImxlY2h1Z2FzIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiMTIiLCJ1c2VyUm9sZSI6ImNvb3JkaW5hdG9yIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.P14dK3q-NaTeVINlE3gb4-PRMSQGjQbpZtgMTK23z9I";
      this.login();
      this.ajaxFinalToken({
        actionName: 'finaltoken'  , partialToken:  this.partialToken  , userRole: this.userRole, dbUserPassword: 'laslechugas'
      });  
      return;      
      var incidentsHome={
        lp_frontend_page_name: 'incidents/new-incident.js',        
        tabName: 'new-incident',
        tabLabel_en: 'New Issue',
        tabLabel_es: 'Nueva Incidencia',
        procedure:'incident',
        tabEsignRequired: false, tabConfirmUserRequired: false
      }
      store.dispatch(addSystemTab(incidentsHome));
      //var curTab = [];
      //curTab.tabName ='sop-allMySops';
      store.dispatch(setCurrentTab(incidentsHome));        
      //return;
      var procObj = {"name": "em-demo-b"};
      store.dispatch(addTab({ 
        lp_frontend_page_name: 'home',
        tabName: procObj.name + '-' + 'home',
        tabLabel_en: procObj.name + '-' + 'home',
        tabLabel_es: procObj.name + '-' + 'home',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));      
      return;

      curTab.tabName = procObj.name + '-' + 'sample-incub-batch';
      curTab.currTabEsignRequired=false;
      curTab.currTabConfirmUserRequired=false;
      curTab.sops = procObj.sops;
      store.dispatch(setCurrentTab(curTab));  

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'browser',
        tabName: procObj.name + '-' + 'browser',
        tabLabel_en: procObj.name + '-' + 'browser',
        tabLabel_es: procObj.name + '-' + 'browser',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      })); 
      curTab.tabName = procObj.name + '-' + 'browser';
      curTab.currTabEsignRequired=false;
      curTab.currTabConfirmUserRequired=false;
      curTab.sops = procObj.sops;
      store.dispatch(setCurrentTab(curTab));  
      
      store.dispatch(addSystemTab(userProfileHome));
      //var curTab = [];
      //curTab.tabName ='sop-allMySops';
      store.dispatch(setCurrentTab(userProfileHome));            
return;
      store.dispatch(addTab({
        lp_frontend_page_name: 'programs',
        tabName: 'em-demo-a' + '-' + 'programs',
        tabLabel_en: 'Programs',
        tabLabel_es: 'Programas',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));      

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-sampling',
        tabName: procObj.name + '-' + 'sample-sampling',
        tabLabel_en: procObj.name + '-' + 'sample-sampling',
        tabLabel_es: procObj.name + '-' + 'sample-sampling',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));      

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-incub-batch',
        tabName: procObj.name + '-' + 'sample-incub-batch',
        tabLabel_en: procObj.name + '-' + 'sample-incub-batch',
        tabLabel_es: procObj.name + '-' + 'sample-incub-batch',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));   

      // store.dispatch(addTab({ 
      //   lp_frontend_page_name: 'sample-incubation',
      //   tabName: procObj.name + '-' + 'sample-incubation',
      //   tabLabel_en: procObj.name + '-' + 'sample-incubation',
      //   tabLabel_es: procObj.name + '-' + 'sample-incubation',
      //   procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      // }));   

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-plate-reading',
        tabName: procObj.name + '-' + 'sample-plate-reading',
        tabLabel_en: procObj.name + '-' + 'sample-plate-reading',
        tabLabel_es: procObj.name + '-' + 'sample-plate-reading',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));   
      
      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-microorganism',
        tabName: procObj.name + '-' + 'sample-microorganism',
        tabLabel_en: procObj.name + '-' + 'sample-microorganism',
        tabLabel_es: procObj.name + '-' + 'sample-microorganism',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));         

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-browser',
        tabName: procObj.name + '-' + 'sample-browser',
        tabLabel_en: procObj.name + '-' + 'sample-browser',
        tabLabel_es: procObj.name + '-' + 'sample-browser',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));         

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'production-lot',
        tabName: procObj.name + '-' + 'production-lot',
        tabLabel_en: procObj.name + '-' + 'production-lot',
        tabLabel_es: procObj.name + '-' + 'production-lot',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));

      curTab.tabName = procObj.name + '-' + 'sample-incub-batch';
      curTab.currTabEsignRequired=false;
      curTab.currTabConfirmUserRequired=false;
      curTab.sops = procObj.sops;
      store.dispatch(setCurrentTab(curTab));  

      /*
      var procObj = {"name": "process-us", "schemaPrefix": "process-us",
            "sops":{"sops_passed":false, "sop_total":2,"sop_total_completed":1,"sop_total_not_completed":1,
              "sop_list":[{"sop_name":"LOG SAMPLE","sop_link":"https://www.azre.gov/Aud/Documents/Sample_Log.pdf", "sop_completed":false, "status": "NOT PASS"},
                  {"sop_name":"RECEIVING SAMPLES","sop_link": "https://training.gov.au/TrainingComponentFiles/MSL09/MSL953001A_R1.pdf","sop_completed":true, "status": "PASS"}]
            }
          };
      console.log('procObj', procObj.sop_list);*/
      
/*      var procObj = {"name": "process-us"};

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-login',
        tabName: 'process-us' + '-' + 'sample-login',
        tabLabel_en: 'Process for US-Sample Login',
        tabLabel_es: 'Proceso para USA-Crear Muestra',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-reception',
        tabName: 'process-us' + '-' + 'sample-reception',
        tabLabel_en: 'Process for US-Sample Reception',
        tabLabel_es: 'Proceso para USA-Crear Recibir',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));

      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-results',
        tabName: 'process-us' + '-' + 'sample-results',
        tabLabel_en: 'Process for US-Enter Results',
        tabLabel_es: 'Proceso para USA-Entrar Resultados',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));
      store.dispatch(addTab({ 
        lp_frontend_page_name: 'sample-custodian',
        tabName: 'process-us' + '-' + 'sample-custodian',
        tabLabel_en: 'Process for US-custody',
        tabLabel_es: 'Proceso para USA-custodia',
        procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      }));      

      curTab.tabName = 'process-us' + '-' + 'sample-results';
      curTab.currTabEsignRequired=false;
      curTab.currTabConfirmUserRequired=false;
      curTab.sops = procObj.sops;
      store.dispatch(setCurrentTab(curTab));  
*/



      // curTab.tabName = 'em-demo-a'+'-'+'programs';
      // curTab.currTabEsignRequired=false;
      // curTab.currTabConfirmUserRequired=false;
      // curTab.sops = procObj.sops;
      // store.dispatch(setCurrentTab(curTab));    
/*      
      curTab.tabName = 'process-us' + '-' + 'sample-login';
      curTab.currTabEsignRequired=false;
      curTab.currTabConfirmUserRequired=false;
      curTab.sops = procObj.sops;
      store.dispatch(setCurrentTab(curTab));        
*/
      
      // store.dispatch(addTab({
      //   lp_frontend_page_name: 'results-calendar',
      //   tabName: 'em-demo-a' + '-' + 'results-calendar',
      //   tabLabel_en: 'EM results-calendar',
      //   tabLabel_es: 'EM Calendario REsultados',
      //   procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      // }));        

      // store.dispatch(addTab({ 
      //   lp_frontend_page_name: 'sample-results',
      //   tabName: 'em-demo-a' + '-' + 'sample-results',
      //   tabLabel_en: 'em-demo-a-Enter Results',
      //   tabLabel_es: 'em-demo-a-Entrar Resultados',
      //   procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      // }));
      // store.dispatch(addTab({ 
      //   lp_frontend_page_name: 'sample-custodian',
      //   tabName: 'em-demo-a' + '-' + 'sample-custodian',
      //   tabLabel_en: 'em-demo-a-custody',
      //   tabLabel_es: 'em-demo-a-custodia',
      //   procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
      // }));            
    }
  }
customElements.define('app-login', AppLogin);