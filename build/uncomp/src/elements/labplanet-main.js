import{html,PolymerElement}from"../../node_modules/@polymer/polymer/polymer-element.js";import"../../node_modules/@polymer/polymer/lib/elements/dom-if.js";import{connect}from"../../node_modules/pwa-helpers/connect-mixin.js";//import { installRouter } from 'pwa-helpers/router';
import{store}from"../store.js";import{navigate,doLogin,doLogout}from"./app/Redux/actions/app_actions.js";import{default_language}from"../config/app-config.js";import"./internalComponents/others/lp-loading.js";// componentes de terceros
import"../../node_modules/@polymer/paper-styles/shadow.js";import"../../node_modules/@vaadin/vaadin-icons/vaadin-icons.js";import"../../node_modules/@vaadin/vaadin-button/vaadin-button.js";import"../../node_modules/@polymer/paper-toast/paper-toast.js";import"../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";import"../../node_modules/@polymer/paper-styles/typography.js";import"../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";import"../../node_modules/@polymer/iron-pages/iron-pages.js";import"../../node_modules/@polymer/iron-icons/iron-icons.js";import"../../node_modules/@polymer/iron-selector/iron-selector.js";import"../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js";import"../../node_modules/@vaadin/vaadin-grid/vaadin-grid-column.js";import"../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js";import"../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js";import"../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js";import"../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js";import"../../node_modules/@polymer/paper-dialog/paper-dialog.js";import"../../node_modules/@vaadin/vaadin-checkbox/vaadin-checkbox.js";import"../../node_modules/@google-web-components/google-chart/google-chart.js";// mis componentes de App
import"./app/01-main-views/app-login.js";import"./app/01-main-views/app-header.js";import"./app/01-main-views/app-left-pane.js";import"./app/01-main-views/app-center-tabs.js";class LabplanetMain extends connect(store)(PolymerElement){static get template(){return html`
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
        width: 18%;
        height: 100%;        
        -- background: #032bbc; /* Old browsers */
        -- background: -moz-linear-gradient(top, #032bbc 0%, #2989d8 5%, #b3cfe5 15%, #ffffff 37%, #ffffff 54%, #032bbc 88%, #207cca 88%, #207cca 88%, #032bbc 88%, #207cca 91%, #032bbc 93%, #2989d8 96%, #b3cfe5 100%, #b3cfe5 101%); /* FF3.6-15 */
        -- background: -webkit-linear-gradient(top, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* Chrome10-25,Safari5.1-6 */
        -- background: linear-gradient(to bottom, #032bbc 0%,#2989d8 5%,#b3cfe5 15%,#ffffff 37%,#ffffff 54%,#032bbc 88%,#207cca 88%,#207cca 88%,#032bbc 88%,#207cca 91%,#032bbc 93%,#2989d8 96%,#b3cfe5 100%,#b3cfe5 101%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        -- filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#032bbc', endColorstr='#b3cfe5',GradientType=0 ); /* IE6-9 */
      }
      .right {
        top: 14%;
        left: 18%; 
        width: 82%;
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
        //padding: 15px;
        //left: 40px;        
        @apply --shadow-elevation-2dp;
        //width: 320px;
        //text-align: center;
        position:fixed;
        width:100vw;
        height:100vh;
        display:flex;
        align-items: center;
        justify-content: center;
        z-index: 9999999999;

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
      <lp-loading></lp-loading>
      <paper-toast id="toast"></paper-toast>
      <paper-toast id="toasterror"></paper-toast>      
      
    `}static get properties(){return{selectedLanguage:{type:String,value:default_language,notify:!0},finalToken:{type:String,notify:!0},userName:String}}ready(){super.ready();this.addEventListener("toast-error",e=>this.toastError(e));this.addEventListener("toast-message",e=>this.toastMessage(e))}toastMessage(e){this.$.toast.show({text:e.detail,duration:3e3})}toastError(e){//console.log('toastError');
this.$.toasterror.show({text:e.detail,duration:3e3})}_locationChanged(location){store.dispatch(navigate(location.pathname))}stateChanged(state){this.loggedIn=state.app.user.loggedIn;this.userName=state.app.user.userDB}doLogin(finalToken){store.dispatch(addUserToken("finalToken"));store.dispatch(doLogin())}}window.customElements.define("labplanet-main",LabplanetMain);