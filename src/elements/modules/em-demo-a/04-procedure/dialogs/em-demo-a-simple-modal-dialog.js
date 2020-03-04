import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import './../../../../../config/styles/div-style.js'; 
import '../../03config/css/Theme01/modal-dialogs-small.js';
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
        }
    }
    static get template() {
        return html`
        <style include="modal-dialogs-small"></style>
        
        <div class="modal-content bgimg">
        <template is="dom-repeat" items="{{dialogElements}}" as="currentfield">       
            <field-controller on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>      
        <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
        <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
      </div>
      
        `;
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