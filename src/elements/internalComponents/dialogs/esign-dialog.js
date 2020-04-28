import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/polymer/lib/elements/dom-if';

import { store } from '../../../store.js';
import { connect } from 'pwa-helpers/connect-mixin';
import {AuthenticationApi} from '../../app/mixin/authentication-api.js';

import {closeEsignDialog, resetAndCloseEsignDialog, esignSuccess, esignFailure} from '../../app/Redux/actions/esign-actions.js';
import './../../../config/styles/div-style.js'; 
import {dialog_buttons, appEsign_formFields, appConfirmUserOrEsign_notCorrectMessage} from '../../../config/app-config.js';
import './modalwindow-buttons.js';

let acceptedHandler = null;
let canceledHandler = null;

class EsignDialog extends AuthenticationApi(connect(store)(PolymerElement)) {
  static get properties() {
    return {
      dialogButtons: { type: Array, value: dialog_buttons},
      finalToken: String,
      opened: {type: Boolean,},
      maximumFailures: Number,
      numAttempts: {type: Number, observer:'changeAttemptsPhrase'},
      attemptsPhrase: String,
      classModal: {type: String, computed: 'changeClass(opened)'},
      formFields: {type: Array, notify: true, bubble: true, value: appEsign_formFields},
      validationNotCorrectMessage: {type: Object, value: appConfirmUserOrEsign_notCorrectMessage},
      selectedLanguage:{ type: String},      
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
        <div class="esignDialogModalMain"></div>
        <div class="esignDialogModalDialog">
          <input type="password" id="esign" value="" on-keydown="keyPressed">
          <div>
            <modalwindow-buttons 
              display-cancel-button 							display-confirm-button 								
              on-dialog-cancelbutton-clicked="dialogCanceled" on-dialog-confirmedbutton-clicked="dialogConfirmed"> </modalwindow-buttons>             
            <p>{{attemptsPhrase}}</p>
          </div> 
        </div>

      </div>
    `;
  }
  keyPressed(e){
    if(e.code.includes("Enter")) {
      this.dialogConfirmed();
      return;
    }
    if(e.code == "Escape") {
      this.dialogCanceled();
      return;
    }    
  }
  esignFailure(){
    //console.log('esignFailure', this.numAttempts+1 , this.maximumFailures-1);
    if (this.numAttempts+1<=this.maximumFailures-1){
      store.dispatch(esignFailure());
      return;
    }
    var message=''; 
    switch(this.selectedLanguage){
        case 'es': message=this.validationNotCorrectMessage.attempts_consumed.message_es; break; //message=response.data.message_es; break;            
        default: message=this.validationNotCorrectMessage.attempts_consumed.message_en; break; //message=response.data.message_en; break;
    }     
    this.dispatchEvent(new CustomEvent('toast-error', {
        bubbles: true,        composed: true,
        detail: message
    }));      
    if(canceledHandler) {canceledHandler();}
    store.dispatch(resetAndCloseEsignDialog());
    return;
  }
  esignCorrect(){
    if(acceptedHandler){
      acceptedHandler();
      store.dispatch(closeEsignDialog());
    }
  }
  dialogConfirmed() {           
    var paramsUrl='finalToken='+this.finalToken+'&esignPhraseToCheck='+this.$.esign.value;    
    var datas = [];
    datas.finalToken=this.finalToken; datas.esignPhraseToCheck=this.$.esign.value;  datas.paramsUrl=paramsUrl;
    datas.callBackFunction=this.esignCorrect.bind(this);
    datas.callBackFunctionError=this.esignFailure.bind(this);
//        console.log('process-us-sample-reception >> itemSelected >> this.SampleAPI', paramsUrl, datas);            
    this.ajaxTokenValidateEsignPhrase(datas);    
  }
  dialogCanceled() {
    var message=''; 
    switch(this.selectedLanguage){
        case 'es': message=this.validationNotCorrectMessage.dialog_cancelled.message_es; break; //message=response.data.message_es; break;            
        default: message=this.validationNotCorrectMessage.dialog_cancelled.message_en; break; //message=response.data.message_en; break;
    }     
    this.dispatchEvent(new CustomEvent('toast-error', {
        bubbles: true,        composed: true,
        detail: message
    }));    
    if(canceledHandler) {canceledHandler();}
    store.dispatch(closeEsignDialog());    
  }
  stateChanged(state) {    
//    console.log('esign-dialog.js >> stateChanged >> opened=', state.esignDialog);
    this.selectedLanguage = state.app.user.appLanguage;     
    this.opened = state.esignDialog.esignDialogOpened;
    if (this.opened){this.$.esign.focus();}
    acceptedHandler = state.esignDialog.acceptedHandler;
    canceledHandler = state.esignDialog.canceledHandler;
    this.maximumFailures=state.esignDialog.maximumFailures;
    this.numAttempts=state.esignDialog.numAttempts;
    this.finalToken = state.app.user.finalToken; 
    this.$.esign.value=''; 
  }
  constructor() {
    super();    
  }
}
customElements.define('esign-dialog', EsignDialog);