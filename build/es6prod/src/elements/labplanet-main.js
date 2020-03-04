define(["../../node_modules/@polymer/polymer/polymer-element.js","../../node_modules/@polymer/polymer/lib/elements/dom-if.js","../../node_modules/pwa-helpers/connect-mixin.js","../store.js","./app/Redux/actions/app_actions.js","../config/app-config.js","../../node_modules/@polymer/paper-styles/shadow.js","../../node_modules/@vaadin/vaadin-icons/vaadin-icons.js","../../node_modules/@vaadin/vaadin-button/vaadin-button.js","../../node_modules/@polymer/paper-toast/paper-toast.js","../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js","../../node_modules/@polymer/paper-styles/typography.js","../../node_modules/@polymer/paper-icon-button/paper-icon-button.js","../../node_modules/@polymer/iron-pages/iron-pages.js","../../node_modules/@polymer/iron-icons/iron-icons.js","../../node_modules/@polymer/iron-selector/iron-selector.js","../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../node_modules/@vaadin/vaadin-grid/vaadin-grid-column.js","../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js","../../node_modules/@polymer/paper-dialog/paper-dialog.js","../../node_modules/@vaadin/vaadin-checkbox/vaadin-checkbox.js","../../node_modules/@google-web-components/google-chart/google-chart.js","./app/01-main-views/app-login.js","./app/01-main-views/app-header.js","./app/01-main-views/app-left-pane.js","./app/01-main-views/app-center-tabs.js"],function(_polymerElement,_domIf,_connectMixin,_store,_app_actions,_appConfig,_shadow,_vaadinIcons,_vaadinButton,_paperToast,_domRepeat,_typography,_paperIconButton,_ironPages,_ironIcons,_ironSelector,_vaadinGrid,_vaadinGridColumn,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinGridFilterColumn,_paperDialog,_vaadinCheckbox,_googleChart,_appLogin,_appHeader,_appLeftPane,_appCenterTabs){"use strict";//import { installRouter } from 'pwa-helpers/router';
// componentes de terceros
// mis componentes de App
class LabplanetMain extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){static get template(){return _polymerElement.html`
      <style>

      .split {
          height: 100%;
          width: 15%; 80%; 
          position: fixed;
          z-index: 1;
          top: 0px;
          overflow-x: hidden;
          padding-top: 0px;
      }      
      .top {
        top: 0;
        left: 2px;
        --height: 10%;
        width: 100%;
        background-color:rgba(0,126,255,.24);
        --opacity: .5; 
      }
      .wrapper {
        width: 100%;
        display:inline-block;
      }
      .left {
        top: 10%;
        left: 2px;
        width: 12%;
        height: 100%;        
        -- background: #032bbc; /* Old browsers */
        -- background: -moz-linear-gradient(top, #032bbc 0%, #2989d8 5%, #b3cfe5 15%, #ffffff 37%, #ffffff 54%, #032bbc 88%, #207cca 88%, #207cca 88%, #032bbc 88%, #207cca 91%, #032bbc 93%, #2989d8 96%, #b3cfe5 100%, #b3cfe5 101%); /* FF3.6-15 */
        -- background: -webkit-linear-gradient(top, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* Chrome10-25,Safari5.1-6 */
        -- background: linear-gradient(to bottom, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        -- filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#032bbc', endColorstr='#b3cfe5',GradientType=0 ); /* IE6-9 */
      }
      .right {
        top: 14%;
        left: 12%; 
        width: 88%;
        height: 80%;
        float: right;
      }      
      .bckimgtop {        
        background-image: url('./images/HexagonBright.jpg');            
        background-image: url('./images/app-login/login-hexagon-background.png');    
        background-image: url('./images/hexagon-white-blue-light.jpg');    
        
        background-repeat: no-repeat;
        background-size: cover; 
        background-position: center;
        opacity: .5;
      float: left;  
      }  
      .bckimgleftzzz {        
        background-image: url('./images/app-login/login-hexagon-background.png');
        background-image: url('./images/HexagonBright.jpg');        
        background-repeat: no-repeat;
        background-size: cover; 
      }  

      .login {
        padding: 15px;
        left: 40px;        
        @apply --shadow-elevation-2dp;
        width: 320px;
        text-align: center;
      }       

      .container {
        padding: 0px;
        left: 40%;
        display: flex;
        @apply --shadow-elevation-2dp;
      }       
      #toast {
        --paper-toast-background-color: #0085ffe6;
      }          
      #toasterror {
        --paper-toast-background-color: #a33;
      }          
    </style>    
    <template is="dom-if" if="[[!loggedIn]]">
      <div class="login">  
        <app-login selected-language="{{selectedLanguage}}" page-name="login" on-do-login="doLogin"></app-login>
      </div>
    </template>
      <template is="dom-if" if="[[loggedIn]]">
        <div id="wrapper">
          <div class="split top bckimgtop"></div>    
            <app-header></app-header> 
          <div id="wrapper_inner">
            <div class="split left bckimgleft">     
              <app-left-pane></app-left-pane>             
            </div>           
            <div class="split right">
              <app-center-tabs></app-center-tabs>     
            </div>         
          </div>
        </div>         
      </template> 
      
      <paper-toast id="toast"></paper-toast>
      <paper-toast id="toasterror"></paper-toast>      
      
    `}static get properties(){return{selectedLanguage:{type:String,value:_appConfig.default_language,notify:!0},finalToken:{type:String,notify:!0},userName:String}}ready(){super.ready();this.addEventListener("toast-error",e=>this.toastError(e));this.addEventListener("toast-message",e=>this.toastMessage(e))}toastMessage(e){this.$.toast.show({text:e.detail,duration:3e3})}toastError(e){this.$.toasterror.show({text:e.detail,duration:3e3})}_locationChanged(location){_store.store.dispatch((0,_app_actions.navigate)(location.pathname))}stateChanged(state){this.loggedIn=state.app.user.loggedIn;this.userName=state.app.user.userDB}doLogin(finalToken){_store.store.dispatch(addUserToken("finalToken"));_store.store.dispatch((0,_app_actions.doLogin)())}}window.customElements.define("labplanet-main",LabplanetMain)});