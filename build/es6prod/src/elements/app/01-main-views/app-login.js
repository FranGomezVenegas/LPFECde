define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../../../node_modules/@polymer/paper-spinner/paper-spinner-lite.js","../../internalComponents/form-fields/field-text.js","../../internalComponents/form-fields/field-controller.js","../../internalComponents/others/language-selector.js","../../internalComponents/others/ribbon-element.js","../mixin/authentication-api.js","../../../config/app-config.js","../Redux/actions/app_actions.js","../Redux/actions/session_actions.js","../mixin/api-usersession.js","../mixin/app-procedurelist-api.js","../mixin/frontend-sopuser.js","../Redux/actions/tabs_actions.js","../../../config/styles/div-style.js","../../../config/styles/img-style.js"],function(_polymerElement,_connectMixin,_store,_paperSpinnerLite,_fieldText,_fieldController,_languageSelector,_ribbonElement,_authenticationApi,_appConfig,_app_actions,_session_actions,_apiUsersession,_appProcedurelistApi,_frontendSopuser,_tabs_actions,_divStyle,_imgStyle){"use strict";class AppLogin extends(0,_frontendSopuser.FrontendSopUser)((0,_appProcedurelistApi.ProcedureList)((0,_apiUsersession.UserSession)((0,_authenticationApi.AuthenticationApi)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))))){static get properties(){return{axiosMessage:{type:String,value:_appConfig.appLogin_authenticationMessage},finalToken:{type:String,notify:!0},loading:{type:Boolean,value:!1},partialToken:String,partialTokenn:String,sessionId:String,appSessionStartDate:String,userName:String,password:String,userInfoId:String,userTabsOnLogin:String,userRole:{type:String},userRoles:Array,loggedIn:{type:Boolean,observer:"loggedInChanged",notify:!0},formFields:{type:Array,notify:!0,bubble:!0,value:_appConfig.appLogin_formFields},appLoginRibbonField:{type:Object,value:_appConfig.appLogin_ribbonField},appLoginLogoOnTop:{type:String,value:"./images/app-login/labplanet.png"},rolesList:{type:Array,value:[{keyName:"rutina",keyValue_en:"routine",keyValue_es:"rutina"}]},appLoginFormBackground:{type:String,value:"./images/hexagon-white-blue-light.jpg"},appLoginFormBackgroundBuena:{type:String,value:"./images/app-login/login-hexagon-background.png"},appLoginFormBackground2:{type:String,value:"https://cdn5.vectorstock.com/i/1000x1000/90/09/abstract-hexagonal-background-vector-9339009.jpg"},selectedLanguage:String}}static get template(){return _polymerElement.html`
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
    `}keyPressed(e){//console.log('key pressed');
if("Enter"==e.key){if("USER"==e.target.field.name.toUpperCase()){const field=this.shadowRoot.getElementById("password").focus();//field.focus();
return}this.login();return}}loggedInChanged(){if(!1==this.loggedIn){this.set("formFields.1.read_only",!1);// userName
this.set("formFields.2.read_only",!1);// password
this.set("formFields.4.read_only",!0);// roleList          
return}}login(){this.loading=!0;this.userName=this.formFields[1].value;this.password=this.formFields[2].value;this.dispatchEvent(new CustomEvent("toast",{bubbles:!0,composed:!0,detail:"Validating User "+this.formFields[0].value+" ... "}));var actionName="authenticate",datas=[];datas.actionName=actionName;datas.dbUserName=this.formFields[1].value;datas.dbUserPassword=this.formFields[2].value;datas.callBackFunction=this.authSuccess.bind(this);datas.callBackFunctionError=this.authError.bind(this);//        console.log('process-us-sample-reception >> itemSelected >> this.SampleAPI', paramsUrl, datas);            
this.ajaxAuthenticate(datas);this.set("login.disabled",!0)}authSuccess(){this.authenticated=!0;this.loading=!1}authError(e){this.authenticated=!1;this.loading=!1;var message="";switch(this.selectedLanguage){case"es":message=this.axiosMessage.connectedFails.message_es;break;//message=response.data.message_es; break;            
default:message=this.axiosMessage.connectedFails.message_en;break;//message=response.data.message_en; break;
}this.set("formFields.1.read_only",!1);// userName
this.set("formFields.2.read_only",!1);// password
this.set("formFields.4.read_only",!0);// roleList    
this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:message}));//console.log('User not valid!', req.statusText);
this.set("formFields.3.value","");// Reset back the button value to be clickable again
}fillUserRoleList(){//console.log('fillUserRoleList');
if(1==this.userRoles.length){var message="";switch(this.selectedLanguage){case"es":message=this.axiosMessage.connectedSuccess_singleRole.message_es;break;//message=response.data.message_es; break;            
default:message=this.axiosMessage.connectedSuccess_singleRole.message_en;break;//message=response.data.message_en; break;
}}else{var message="";switch(this.selectedLanguage){case"es":message=this.axiosMessage.connectedSuccess.message_es;break;//message=response.data.message_es; break;            
default:message=this.axiosMessage.connectedSuccess.message_en;break;//message=response.data.message_en; break;
}}this.dispatchEvent(new CustomEvent("toast-message",{bubbles:!0,composed:!0,detail:message//'User valid, please select your role to proceed'
}));this.set("formFields.1.read_only",!0);// userName
this.set("formFields.2.read_only",!0);// password
this.set("formFields.4.read_only",!1);// roleList          
var i;if(1==this.userRoles.length){this.userRole=this.userRoles[0];this.doLogin(this.userRole);return}for(i=0;i<this.userRoles.length;i++){var newElement=[{keyName:"",keyValue_en:"",keyValue_es:""}];newElement.keyName=this.userRoles[i];newElement.keyValue_en=this.userRoles[i];newElement.keyValue_es=this.userRoles[i];this.rolesList[i]=newElement}this.set("formFields.4.items",this.rolesList)}initAppSession(){//console.log('app-login >> initAppSession >> addSession', 'this.finalToken', this.finalToken, 'data', data, 'this.userRole', this.userRole);
var tabsLogin="";if(this.userTabsOnLogin){tabsLogin=this.userTabsOnLogin}var data={sessionId:this.appSessionId,userRole:this.userRole,startDate:this.appSessionStartDate,userTabsOnLogin:tabsLogin};this.getProcedureList({finalToken:this.finalToken,callBackFunction:this.getAllMySops.bind(this),callBackFunction2:this.getMyPendingSops.bind(this)});_store.store.dispatch((0,_session_actions.addSession)(data));var actionName="getAppHeader",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&personFieldsName="+this.userInfoId,datas=[];datas.finalToken=this.finalToken;datas.actionName=actionName;datas.paramsUrl=paramsUrl;this.openTabsOnLogin(this.userTabsOnLogin);this.getAppHeader(datas);_store.store.dispatch((0,_app_actions.doLogin)(this.finalToken,this.userName,this.userInfoId,this.userTabsOnLogin))}fieldButtonClicked(e){if("buttonAccess"==e.detail.buttonName){this.login()}}getMyPendingSops(){var actionName="MY_PENDING_SOPS",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&sopFieldsToRetrieve="+_appConfig.sopUserPendingSop_fieldToRetrieve,datas=[];datas.finalToken=this.finalToken;datas.actionName=actionName;datas.paramsUrl=paramsUrl;this.frontEndSopUserAPI(datas)}getAllMySops(){var actionName="ALL_MY_SOPS",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&sopFieldsToRetrieve="+_appConfig.sopUserAllSop_fieldToRetrieve,datas=[];datas.finalToken=this.finalToken;datas.actionName=actionName;datas.paramsUrl=paramsUrl;this.frontEndSopUserAPI(datas)}onListChange(e){if("userRole"==e.detail.name){this.doLogin(e.detail.value)}}doLogin(userRole){this.userRole=userRole;_store.store.dispatch((0,_app_actions.startLoading)());this.ajaxFinalToken({actionName:"finaltoken",partialToken:this.partialToken,userRole:userRole})}openTabsOnLogin(tabsInfo){if(!tabsInfo){return}var i;for(i=0;i<tabsInfo.length;i++){//if (tabsInfo[i].tabName!='user-profile'){
var curTab={lp_frontend_page_name:tabsInfo[i].lp_frontend_page_name,tabName:tabsInfo[i].tabName,tabLabel_en:tabsInfo[i].tabLabel_en,tabLabel_es:tabsInfo[i].tabLabel_es,procedure:tabsInfo[i].procedure,tabEsignRequired:tabsInfo[i].tabEsignRequired,tabConfirmUserRequired:tabsInfo[i].tabConfirmUserRequired};//} 
if("tab"==tabsInfo[i].tabType){var procObj={name:tabsInfo[i].procedure};curTab.procedure=procObj;_store.store.dispatch((0,_tabs_actions.addTab)(curTab))}if("systab"==tabsInfo[i].tabType){curTab.procedure=tabsInfo[i].procedure;//if (tabsInfo[i].tabName!='user-profile'){
_store.store.dispatch((0,_tabs_actions.addSystemTab)(curTab));//}
}}_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab))}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage;this.loggedIn=state.app.user.loggedIn;// this.focus(); Intento de poner el foco en el primer campo de formulario
}/* Intento por poner el foco en el campo user, lo hace pero lo quita, creo que falta un stop propagatedown pero no sé usarlo
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
*/constructor(){super();return;var curTab=[];this.userName="labplanet";this.userInfoId="1";//return;      
this.dbUserPassword="laslechugas";this.userRole="coordinator";this.formFields[1].value=this.userName;this.formFields[2].value=this.dbUserPassword;this.formFields[3].value=this.userRole;//return;      
this.partialToken="eyJ1c2VyREIiOiJsYWJwbGFuZXQiLCJlU2lnbiI6ImhvbGEiLCJ1c2VyREJQYXNzd29yZCI6Imxhc2xlY2h1Z2FzIiwidXNlcl9wcm9jZWR1cmVzIjoiW2VtLWRlbW8tYSwgcHJvY2Vzcy11cywgcHJvY2Vzcy1ldSwgZ2Vub21hLTFdIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiMTUzNyIsImFwcFNlc3Npb25TdGFydGVkRGF0ZSI6IldlZCBKYW4gMDggMTM6MzM6MjggQ0VUIDIwMjAiLCJ1c2VyUm9sZSI6ImNvb3JkaW5hdG9yIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjEifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.-dgJRbGuF71VEKTu_RomSXdn81bdvErbxNpyUmqIdZ0";//this.partialToken="eyJ1c2VyREIiOiJqdG9iaWFzIiwiZVNpZ24iOiIiLCJ1c2VyREJQYXNzd29yZCI6ImxlY2h1Z2FzIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiIiwidXNlclJvbGUiOiJBZG1pbiIsImFsZyI6IkhTMjU2IiwiaW50ZXJuYWxVc2VySUQiOiIyIn0.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.RZ-RvH4yWa7eyP_etAlq971iG_9HYeMjXJSmXwujoTI";
//this.partialToken="eyJ1c2VyREIiOiJkemFtYnJhbmEiLCJlU2lnbiI6Im1hbGEiLCJ1c2VyREJQYXNzd29yZCI6ImxlY2h1Z2FzIiwidHlwIjoiSldUIiwiYXBwU2Vzc2lvbklkIjoiMTIiLCJ1c2VyUm9sZSI6ImNvb3JkaW5hdG9yIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.P14dK3q-NaTeVINlE3gb4-PRMSQGjQbpZtgMTK23z9I";
this.login();this.ajaxFinalToken({actionName:"finaltoken",partialToken:this.partialToken,userRole:this.userRole,dbUserPassword:"laslechugas"});return;var incidentsHome={lp_frontend_page_name:"incidents/new-incident.js",tabName:"new-incident",tabLabel_en:"New Issue",tabLabel_es:"Nueva Incidencia",procedure:"incident",tabEsignRequired:!1,tabConfirmUserRequired:!1};_store.store.dispatch((0,_tabs_actions.addSystemTab)(incidentsHome));//var curTab = [];
//curTab.tabName ='sop-allMySops';
_store.store.dispatch((0,_tabs_actions.setCurrentTab)(incidentsHome));//return;
var procObj={name:"em-demo-b"};_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"home",tabName:procObj.name+"-"+"home",tabLabel_en:procObj.name+"-"+"home",tabLabel_es:procObj.name+"-"+"home",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));return;curTab.tabName=procObj.name+"-"+"sample-incub-batch";curTab.currTabEsignRequired=!1;curTab.currTabConfirmUserRequired=!1;curTab.sops=procObj.sops;_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab));_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"browser",tabName:procObj.name+"-"+"browser",tabLabel_en:procObj.name+"-"+"browser",tabLabel_es:procObj.name+"-"+"browser",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));curTab.tabName=procObj.name+"-"+"browser";curTab.currTabEsignRequired=!1;curTab.currTabConfirmUserRequired=!1;curTab.sops=procObj.sops;_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab));_store.store.dispatch((0,_tabs_actions.addSystemTab)(_appConfig.userProfileHome));//var curTab = [];
//curTab.tabName ='sop-allMySops';
_store.store.dispatch((0,_tabs_actions.setCurrentTab)(_appConfig.userProfileHome));return;_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"programs",tabName:"em-demo-a"+"-"+"programs",tabLabel_en:"Programs",tabLabel_es:"Programas",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"sample-sampling",tabName:procObj.name+"-"+"sample-sampling",tabLabel_en:procObj.name+"-"+"sample-sampling",tabLabel_es:procObj.name+"-"+"sample-sampling",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"sample-incub-batch",tabName:procObj.name+"-"+"sample-incub-batch",tabLabel_en:procObj.name+"-"+"sample-incub-batch",tabLabel_es:procObj.name+"-"+"sample-incub-batch",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));// store.dispatch(addTab({ 
//   lp_frontend_page_name: 'sample-incubation',
//   tabName: procObj.name + '-' + 'sample-incubation',
//   tabLabel_en: procObj.name + '-' + 'sample-incubation',
//   tabLabel_es: procObj.name + '-' + 'sample-incubation',
//   procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
// }));   
_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"sample-plate-reading",tabName:procObj.name+"-"+"sample-plate-reading",tabLabel_en:procObj.name+"-"+"sample-plate-reading",tabLabel_es:procObj.name+"-"+"sample-plate-reading",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"sample-microorganism",tabName:procObj.name+"-"+"sample-microorganism",tabLabel_en:procObj.name+"-"+"sample-microorganism",tabLabel_es:procObj.name+"-"+"sample-microorganism",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"sample-browser",tabName:procObj.name+"-"+"sample-browser",tabLabel_en:procObj.name+"-"+"sample-browser",tabLabel_es:procObj.name+"-"+"sample-browser",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"production-lot",tabName:procObj.name+"-"+"production-lot",tabLabel_en:procObj.name+"-"+"production-lot",tabLabel_es:procObj.name+"-"+"production-lot",procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));curTab.tabName=procObj.name+"-"+"sample-incub-batch";curTab.currTabEsignRequired=!1;curTab.currTabConfirmUserRequired=!1;curTab.sops=procObj.sops;_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab));/*
      var procObj = {"name": "process-us", "schemaPrefix": "process-us",
            "sops":{"sops_passed":false, "sop_total":2,"sop_total_completed":1,"sop_total_not_completed":1,
              "sop_list":[{"sop_name":"LOG SAMPLE","sop_link":"https://www.azre.gov/Aud/Documents/Sample_Log.pdf", "sop_completed":false, "status": "NOT PASS"},
                  {"sop_name":"RECEIVING SAMPLES","sop_link": "https://training.gov.au/TrainingComponentFiles/MSL09/MSL953001A_R1.pdf","sop_completed":true, "status": "PASS"}]
            }
          };
      console.log('procObj', procObj.sop_list);*/ /*      var procObj = {"name": "process-us"};

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
*/ // curTab.tabName = 'em-demo-a'+'-'+'programs';
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
*/ // store.dispatch(addTab({
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
}}customElements.define("app-login",AppLogin)});