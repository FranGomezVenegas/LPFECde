import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/polymer/lib/elements/dom-if';

import { store } from '../../../store.js';
import { connect } from 'pwa-helpers/connect-mixin';
import {AuthenticationApi} from '../../app/mixin/authentication-api.js';

import {closeEsignDialog, resetAndCloseEsignDialog, esignSuccess, esignFailure} from '../../app/Redux/actions/esign-actions.js';
import {appEsign_formFields} from '../../../config/app-config.js';
import './../../../config/styles/div-style.js'; 

let acceptedHandler = null;
let canceledHandler = null;

class EsignDialog extends AuthenticationApi(connect(store)(PolymerElement)) {
  static get properties() {
    return {
      finalToken: String,
      opened: {type: Boolean,},
      maximumFailures: Number,
      numAttempts: {type: Number, observer:'changeAttemptsPhrase'},
      attemptsPhrase: String,
      classModal: {type: String, computed: 'changeClass(opened)'},
      formFields: {type: Array, notify: true, bubble: true, value: appEsign_formFields},
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
  esignFailure(){
    console.log('esignFailure', this.numAttempts+1 , this.maximumFailures-1);
    if (this.numAttempts+1<=this.maximumFailures-1){
      store.dispatch(esignFailure());
      return;
    }
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
  acceptButton() {           
    var paramsUrl='myToken='+this.finalToken+'&esignPhraseToCheck='+this.$.esign.value;    
    var datas = [];
    datas.myToken=this.finalToken; datas.esignPhraseToCheck=this.$.esign.value;  datas.paramsUrl=paramsUrl;
    datas.callBackFunction=this.esignCorrect.bind(this);
    datas.callBackFunctionError=this.esignFailure.bind(this);
//        console.log('process-us-sample-reception >> itemSelected >> this.SampleAPI', paramsUrl, datas);            
    this.ajaxTokenValidateEsignPhrase(datas);    
  }
  cancelButton() {
    if(canceledHandler) {canceledHandler();}
    store.dispatch(closeEsignDialog());    
  }
  stateChanged(state) {    
//    console.log('esign-dialog.js >> stateChanged >> opened=', state.esignDialog);
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