define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/@polymer/paper-button/paper-button.js","../../../../node_modules/@polymer/polymer/lib/elements/dom-if.js","../../../store.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../app/mixin/authentication-api.js","../form-fields/field-controller.js","../../app/Redux/actions/confirmuser-actions.js","../../../config/app-config.js","../../../config/styles/div-style.js","./modalwindow-buttons.js"],function(_polymerElement,_paperButton,_domIf,_store,_connectMixin,_authenticationApi,_fieldController,_confirmuserActions,_appConfig,_divStyle,_modalwindowButtons){"use strict";let acceptedHandler=null,canceledHandler=null,numConfirmations=null;class ConfirmUserDialog extends(0,_authenticationApi.AuthenticationApi)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{dialogButtons:{type:Array,value:_appConfig.dialog_buttons},finalToken:String,opened:{type:Boolean},maximumFailures:Number,numAttempts:{type:Number,observer:"changeAttemptsPhrase"},attemptsPhrase:String,classModal:{type:String,computed:"changeClass(opened)"},formFields:{type:Array,notify:!0,bubble:!0,value:_appConfig.appConfirmUser_formFields}}}changeAttemptsPhrase(){this.attemptsPhrase="*** Attempts:"+this.numAttempts+" of "+this.maximumFailures;return}changeClass(opened){if(opened){return""}return"closed"}static get template(){return _polymerElement.html`
    <style include="div-style"></style>
      <style>
        .closed {
          display: none;
        }
      </style>
      
      <div class$="{{classModal}}">
        <div class="confirmUserDialogModalMain"></div>
        <div class="confirmUserDialogModalDialog">
          <template is="dom-repeat" items="{{formFields}}" as="currentfield">       
            <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
          </template>          
          <div>
            <modalwindow-buttons 
              display-cancel-button 							display-confirm-button 								
              on-dialog-cancelbutton-clicked="dialogCanceled" on-dialog-confirmedbutton-clicked="dialogConfirmed"> </modalwindow-buttons>             
            <p>{{attemptsPhrase}}</p>
          </div> 
        </div>
      </div>
    `}keyPressed(e){if(e.code.includes("Enter")){this.dialogConfirmed();return}if("Escape"==e.code){this.dialogCanceled();return}}confirmUserFailure(){console.log("esignFailure",this.numAttempts+1,this.maximumFailures-1);if(this.numAttempts+1<=this.maximumFailures-1){_store.store.dispatch((0,_confirmuserActions.confirmUserFailure)());return}if(canceledHandler){canceledHandler()}_store.store.dispatch((0,_confirmuserActions.resetAndCloseConfirmUserDialog)());return}confirmUserCorrect(){if(acceptedHandler){acceptedHandler();_store.store.dispatch((0,_confirmuserActions.confirmUserSuccess)(this.formFields[2].value))}_store.store.dispatch((0,_confirmuserActions.closeConfirmUserDialog)())}dialogConfirmed(){var paramsUrl="finalToken="+this.finalToken+"&userToCheck="+this.formFields[0].value+"&passwordToCheck="+this.formFields[1].value,datas=[];datas.finalToken=this.finalToken;datas.paramsUrl=paramsUrl;datas.userToCheck=this.formFields[0].value;datas.passwordToCheck=this.formFields[1].value;datas.callBackFunction=this.confirmUserCorrect.bind(this);datas.callBackFunctionError=this.confirmUserFailure.bind(this);this.ajaxTokenValidateUserCredentials(datas)}dialogCanceled(){if(canceledHandler){canceledHandler()}_store.store.dispatch((0,_confirmuserActions.closeConfirmUserDialog)())}stateChanged(state){this.opened=state.confirmUserDialog.confirmUserDialogOpened;acceptedHandler=state.confirmUserDialog.acceptedHandler;canceledHandler=state.confirmUserDialog.canceledHandler;numConfirmations=state.confirmUserDialog.numConfirmations;this.maximumFailures=state.confirmUserDialog.maximumFailures;this.numAttempts=state.confirmUserDialog.numAttempts;this.finalToken=state.app.user.finalToken}}customElements.define("confirmuser-dialog",ConfirmUserDialog)});