import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../node_modules/@polymer/paper-button/paper-button.js";import"../../../config/styles/div-style.js";//import '../../03config/css/Theme01/modal-dialogs.js';
/**
 * `simple-modal-dialog` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class SimpleModalDialog extends PolymerElement{static get properties(){return{adhocFormFields:{type:Array}}}static get template(){return html`
        <!-- <style include="modal-dialogs"></style> -->
        <style include="div-style"></style>
        
        <style>
        
        /* The Modal (background) */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        
        /* Modal Content */
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }        
        /* The Close Button */

        .bgimg {
            background-image: url('./images/hexagon-white-blue-light.jpg');   
            width: 420px;       
        }          
        </style>
        <div class="modal-content bgimg">
        <template is="dom-repeat" items="{{adhocFormFields}}" as="currentfield">       
            <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>      
        <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
        <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
      </div>
      
        `}keyPressed(e){//console.log('key pressed');
if("Enter"==e.key){this.dialogConfirmed();return}}dialogConfirmed(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed"}}))}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}}customElements.define("simple-modal-dialog",SimpleModalDialog);