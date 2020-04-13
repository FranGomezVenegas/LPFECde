define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/@polymer/paper-button/paper-button.js","../../../../../config/styles/div-style.js","../../03config/css/Theme01/modal-dialogs-small.js","../../../../internalComponents/dialogs/modalwindow-buttons.js"],function(_polymerElement,_paperButton,_divStyle,_modalDialogsSmall,_modalwindowButtons){"use strict";/**
 * `simple-modal-dialog` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class emDemoASimpleModalDialog extends _polymerElement.PolymerElement{static get properties(){return{displayCancelButton:{type:Boolean,value:!0,notify:!0},displayConfirmButton:{type:Boolean,value:!0,notify:!0},displayCloseButton:{type:Boolean,value:!1,notify:!0}}}static get template(){return _polymerElement.html`
        <style include="modal-dialogs-small"></style>
        
        <div class="modal-content bgimg">
        <modalwindow-buttons display-cancel-button="[[displayCancelButton]]" display-confirm-button="[[displayConfirmButton]]" display-close-button="[[displayCloseButton]]"> </modalwindow-buttons>
        <template is="dom-repeat" items="{{dialogElements}}" as="currentfield">       
            <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>      
        <!-- <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">{{labelValue(selectedLanguage, cancelButton)}}</paper-button>
        <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">{{labelValue(selectedLanguage, confirmButton)}}</paper-button> -->
      </div>
      
        `}keyPressed(e){//console.log('key pressed');
if("Enter"==e.key){this.dialogConfirmed();return}}dialogConfirmed(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed"}}))}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}}customElements.define("em-demo-a-simple-modal-dialog",emDemoASimpleModalDialog)});