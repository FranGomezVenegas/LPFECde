import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../../store.js";import{cancelDialogButton,confirmDialogButton,closeDialogButton}from"../../03config/config-process.js";import{FieldsMethods}from"../../../../app/app-functions/fields-methods.js";/**
 * `em-demo-a-modalwindow-buttons` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class EmDemoAModalwindowButtons extends FieldsMethods(connect(store)(PolymerElement)){static get properties(){return{displayCancelButton:{type:Boolean,value:!1,notify:!0},displayConfirmButton:{type:Boolean,value:!1,notify:!0},displayCloseButton:{type:Boolean,value:!1,notify:!0},cancelDialogButton:{type:String,value:cancelDialogButton},confirmDialogButton:{type:String,value:confirmDialogButton},closeDialogButton:{type:String,value:closeDialogButton},selectedLanguage:{type:String},value:{type:Object}}}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get template(){return html`
        <template is="dom-if" if="[[displayCloseButton]]">
            <paper-button name="close" dialog-confirm autofocus on-click="clickedClose">{{labelValue(selectedLanguage, closeDialogButton)}}</paper-button>
        </template>
        <template is="dom-if" if="{{displayCancelButton}}">
            <paper-button name="cancel" dialog-dismiss on-click="clickedCancel">{{labelValue(selectedLanguage, cancelDialogButton)}}</paper-button>
        </template>
        <template is="dom-if" if="[[displayConfirmButton]]">
            <paper-button name="confirm" dialog-confirm autofocus on-click="clickedConfirm">{{labelValue(selectedLanguage, confirmDialogButton)}}</paper-button>
        </template>
        `}clickedCancel(){//console.log('clickedCancel');
this.dispatchEvent(new CustomEvent("dialog-cancelbutton-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.cancelDialogButton.name,value:this.value,buttonDefinition:this.cancelDialogButton}}))}clickedClose(){//console.log('clickedClose');
this.dispatchEvent(new CustomEvent("dialog-closebutton-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.closeDialogButton.name,value:this.value,buttonDefinition:this.closeDialogButton}}))}clickedConfirm(){//console.log('clickedConfirm');
this.dispatchEvent(new CustomEvent("dialog-confirmedbutton-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.confirmDialogButton.name,value:this.value,buttonDefinition:this.confirmDialogButton}}))}/**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */constructor(){super()}/**
     * Use for one-time configuration of your component after local
     * DOM is initialized.
     */ready(){super.ready()}}customElements.define("em-demo-a-modalwindow-buttons",EmDemoAModalwindowButtons);