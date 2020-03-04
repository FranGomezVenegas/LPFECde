define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/@polymer/paper-button/paper-button.js","../../../../node_modules/@polymer/polymer/lib/elements/dom-if.js","../../../store.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../app/mixin/authentication-api.js","../../app/Redux/actions/esign-actions.js","../../../config/app-config.js","../../../config/styles/div-style.js"],function(_polymerElement,_paperButton,_domIf,_store,_connectMixin,_authenticationApi,_esignActions,_appConfig,_divStyle){"use strict";let acceptedHandler=null,canceledHandler=null;class EsignDialog extends(0,_authenticationApi.AuthenticationApi)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{finalToken:String,opened:{type:Boolean},maximumFailures:Number,numAttempts:{type:Number,observer:"changeAttemptsPhrase"},attemptsPhrase:String,classModal:{type:String,computed:"changeClass(opened)"},formFields:{type:Array,notify:!0,bubble:!0,value:_appConfig.appEsign_formFields}}}changeAttemptsPhrase(){this.attemptsPhrase="*** Attempts:"+this.numAttempts+" of "+this.maximumFailures;return}changeClass(opened){if(opened){return""}return"closed"}static get template(){return _polymerElement.html`
    <style include="div-style"></style>
      <style>
        .closed {
          display: none;
        }
      </style>
      
      <div class$="{{classModal}}">
        <div class="esignDialogModalMain"></div>
        <div class="esignDialogModalDialog">
          <input type="password" id="esign" value="" on-keydown="keyPressed">
          <div>
            <paper-button name="confirm" dialog-confirm autofocus on-click="acceptButton">Accept</paper-button>
            <paper-button name="cancel" dialog-dismiss on-click="cancelButton">Cancel</paper-button>
            <p>{{attemptsPhrase}}</p>
          </div> 
        </div>

      </div>
    `}keyPressed(e){if(e.code.includes("Enter")){this.acceptButton();return}if("Escape"==e.code){this.cancelButton();return}}esignFailure(){console.log("esignFailure",this.numAttempts+1,this.maximumFailures-1);if(this.numAttempts+1<=this.maximumFailures-1){_store.store.dispatch((0,_esignActions.esignFailure)());return}if(canceledHandler){canceledHandler()}_store.store.dispatch((0,_esignActions.resetAndCloseEsignDialog)());return}esignCorrect(){if(acceptedHandler){acceptedHandler();_store.store.dispatch((0,_esignActions.closeEsignDialog)())}}acceptButton(){var paramsUrl="myToken="+this.finalToken+"&esignPhraseToCheck="+this.$.esign.value,datas=[];datas.myToken=this.finalToken;datas.esignPhraseToCheck=this.$.esign.value;datas.paramsUrl=paramsUrl;datas.callBackFunction=this.esignCorrect.bind(this);datas.callBackFunctionError=this.esignFailure.bind(this);//        console.log('process-us-sample-reception >> itemSelected >> this.SampleAPI', paramsUrl, datas);            
this.ajaxTokenValidateEsignPhrase(datas)}cancelButton(){if(canceledHandler){canceledHandler()}_store.store.dispatch((0,_esignActions.closeEsignDialog)())}stateChanged(state){//    console.log('esign-dialog.js >> stateChanged >> opened=', state.esignDialog);
this.opened=state.esignDialog.esignDialogOpened;if(this.opened){this.$.esign.focus()}acceptedHandler=state.esignDialog.acceptedHandler;canceledHandler=state.esignDialog.canceledHandler;this.maximumFailures=state.esignDialog.maximumFailures;this.numAttempts=state.esignDialog.numAttempts;this.finalToken=state.app.user.finalToken;this.$.esign.value=""}constructor(){super()}}customElements.define("esign-dialog",EsignDialog)});