import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import './../../../../../config/styles/div-style.js'; 
import '../../03config/css/Theme01/modal-dialogs-small.js';
import '../../../../internalComponents/dialogs/modalwindow-buttons.js';
/**
 * `simple-modal-dialog` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class emDemoASimpleModalDialog extends PolymerElement {
    static get properties() {
        return {
            displayCancelButton: {type: Boolean, value:true, notify: true},
            displayConfirmButton: {type: Boolean, value:true, notify: true},            
            displayCloseButton:  {type: Boolean, value:false, notify: true},            
        }
    }         
    static get template() {
        return html`
        <style include="modal-dialogs-small"></style>
        
        <div class="modal-content bgimg">
        <modalwindow-buttons display-cancel-button="[[displayCancelButton]]" display-confirm-button="[[displayConfirmButton]]" display-close-button="[[displayCloseButton]]"> </modalwindow-buttons>
        <template is="dom-repeat" items="{{dialogElements}}" as="currentfield">       
            <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>      
        <!-- <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">{{labelValue(selectedLanguage, cancelButton)}}</paper-button>
        <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">{{labelValue(selectedLanguage, confirmButton)}}</paper-button> -->
      </div>
      
        `;
    }  
    keyPressed(e){
        //console.log('key pressed');
        if(e.key=="Enter") {
          this.dialogConfirmed();
          return;
        }   
    }  
    dialogConfirmed(){
        //console.log('clicked', this.value);
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': this.value,
            'dialogState': 'confirmed'
            }
        }));    
    }        
    dialogCanceled(){
        //console.log('clicked', this.value);
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': this.value,
            'dialogState': 'canceled'
            }
        }));    
    }         
    
}

customElements.define('em-demo-a-simple-modal-dialog', emDemoASimpleModalDialog);