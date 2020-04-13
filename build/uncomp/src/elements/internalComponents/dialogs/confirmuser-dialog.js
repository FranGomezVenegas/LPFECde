import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../node_modules/@polymer/paper-button/paper-button.js";import"../../../../node_modules/@polymer/polymer/lib/elements/dom-if.js";import{store}from"../../../store.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{AuthenticationApi}from"../../app/mixin/authentication-api.js";import"../form-fields/field-controller.js";import{closeConfirmUserDialog,resetAndCloseConfirmUserDialog,confirmUserSuccess,confirmUserFailure}from"../../app/Redux/actions/confirmuser-actions.js";import{appConfirmUser_formFields}from"../../../config/app-config.js";import"../../../config/styles/div-style.js";let acceptedHandler=null,canceledHandler=null,numConfirmations=null;import{dialog_buttons}from"../../../config/app-config.js";import"./modalwindow-buttons.js";class ConfirmUserDialog extends AuthenticationApi(connect(store)(PolymerElement)){static get properties(){return{dialogButtons:{type:Array,value:dialog_buttons},finalToken:String,opened:{type:Boolean},maximumFailures:Number,numAttempts:{type:Number,observer:"changeAttemptsPhrase"},attemptsPhrase:String,classModal:{type:String,computed:"changeClass(opened)"},formFields:{type:Array,notify:!0,bubble:!0,value:appConfirmUser_formFields}}}changeAttemptsPhrase(){this.attemptsPhrase="*** Attempts:"+this.numAttempts+" of "+this.maximumFailures;return}changeClass(opened){if(opened){return""}return"closed"}static get template(){return html`
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
    `}keyPressed(e){if(e.code.includes("Enter")){this.dialogConfirmed();return}if("Escape"==e.code){this.dialogCanceled();return}}confirmUserFailure(){console.log("esignFailure",this.numAttempts+1,this.maximumFailures-1);if(this.numAttempts+1<=this.maximumFailures-1){store.dispatch(confirmUserFailure());return}if(canceledHandler){canceledHandler()}store.dispatch(resetAndCloseConfirmUserDialog());return}confirmUserCorrect(){if(acceptedHandler){acceptedHandler();store.dispatch(confirmUserSuccess(this.formFields[2].value))}store.dispatch(closeConfirmUserDialog())}dialogConfirmed(){var paramsUrl="finalToken="+this.finalToken+"&userToCheck="+this.formFields[0].value+"&passwordToCheck="+this.formFields[1].value,datas=[];datas.finalToken=this.finalToken;datas.paramsUrl=paramsUrl;datas.userToCheck=this.formFields[0].value;datas.passwordToCheck=this.formFields[1].value;datas.callBackFunction=this.confirmUserCorrect.bind(this);datas.callBackFunctionError=this.confirmUserFailure.bind(this);this.ajaxTokenValidateUserCredentials(datas)}dialogCanceled(){if(canceledHandler){canceledHandler()}store.dispatch(closeConfirmUserDialog())}stateChanged(state){this.opened=state.confirmUserDialog.confirmUserDialogOpened;acceptedHandler=state.confirmUserDialog.acceptedHandler;canceledHandler=state.confirmUserDialog.canceledHandler;numConfirmations=state.confirmUserDialog.numConfirmations;this.maximumFailures=state.confirmUserDialog.maximumFailures;this.numAttempts=state.confirmUserDialog.numAttempts;this.finalToken=state.app.user.finalToken}}customElements.define("confirmuser-dialog",ConfirmUserDialog);