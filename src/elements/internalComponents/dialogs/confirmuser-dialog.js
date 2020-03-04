import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/polymer/lib/elements/dom-if';

import { store } from '../../../store.js';
import { connect } from 'pwa-helpers/connect-mixin';
import {AuthenticationApi} from '../../app/mixin/authentication-api.js';
import '../form-fields/field-controller.js';

import {closeConfirmUserDialog, resetAndCloseConfirmUserDialog, confirmUserSuccess, confirmUserFailure} from '../../app/Redux/actions/confirmuser-actions.js';
import {appConfirmUser_formFields} from '../../../config/app-config.js';
import './../../../config/styles/div-style.js'; 

let acceptedHandler = null;
let canceledHandler = null;
let numConfirmations = null;

class ConfirmUserDialog extends AuthenticationApi(connect(store)(PolymerElement)) {
  static get properties() {
    return {
      finalToken: String,
      opened: {type: Boolean,},
      maximumFailures: Number,
      numAttempts: {type: Number, observer:'changeAttemptsPhrase'},
      attemptsPhrase: String,
      classModal: {type: String, computed: 'changeClass(opened)'},
      formFields: {type: Array, notify: true, bubble: true, value: appConfirmUser_formFields},      
    }
  }

  changeAttemptsPhrase(){
    this.attemptsPhrase='*** Attempts:'+this.numAttempts+' of '+this.maximumFailures; 
    return;
  }
  changeClass(opened) {
    if(opened) {
      return '';
    }
    return 'closed'
  }

  static get template() {
    return html`
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
            <paper-button name="confirm" dialog-confirm autofocus on-click="acceptButton">Accept</paper-button>
            <paper-button name="cancel" dialog-dismiss on-click="cancelButton">Cancel</paper-button>
            <p>{{attemptsPhrase}}</p>
          </div> 
        </div>

      </div>
    `;
  }
  keyPressed(e){
    if(e.code.includes("Enter")) {
      this.acceptButton();
      return;
    }
    if(e.code == "Escape") {
      this.cancelButton();
      return;
    }    
  }
  confirmUserFailure(){
    console.log('esignFailure', this.numAttempts+1 , this.maximumFailures-1);
    if (this.numAttempts+1<=this.maximumFailures-1){
      store.dispatch(confirmUserFailure());
      return;
    }
    if(canceledHandler) {canceledHandler();}
    store.dispatch(resetAndCloseConfirmUserDialog());
    return;
  }
  confirmUserCorrect(){
    if(acceptedHandler){
      acceptedHandler();
      store.dispatch(confirmUserSuccess(this.formFields[2].value));
    }
    store.dispatch(closeConfirmUserDialog());
  }
  acceptButton() {    
    var paramsUrl='myToken='+this.finalToken+'&userToCheck='+this.formFields[0].value+'&passwordToCheck='
      +this.formFields[1].value;    
    var datas = [];
    datas.myToken=this.finalToken; datas.paramsUrl=paramsUrl;
    datas.userToCheck=this.formFields[0].value; datas.passwordToCheck=this.formFields[1].value;
    datas.callBackFunction=this.confirmUserCorrect.bind(this);
    datas.callBackFunctionError=this.confirmUserFailure.bind(this);
    this.ajaxTokenValidateUserCredentials(datas);    
  }
  cancelButton() {
    if(canceledHandler) {canceledHandler();}
    store.dispatch(closeConfirmUserDialog());    
  }
  stateChanged(state) {    
    this.opened = state.confirmUserDialog.confirmUserDialogOpened;
    acceptedHandler = state.confirmUserDialog.acceptedHandler;
    canceledHandler = state.confirmUserDialog.canceledHandler;
    numConfirmations = state.confirmUserDialog.numConfirmations;
    this.maximumFailures=state.confirmUserDialog.maximumFailures;
    this.numAttempts=state.confirmUserDialog.numAttempts;
    this.finalToken = state.app.user.finalToken; 
  }
}
customElements.define('confirmuser-dialog', ConfirmUserDialog);