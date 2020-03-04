import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '../../03config/css/Theme01/modal-dialogs.js';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 
import '../../../../internalComponents/form-fields/field-controller';
import {FrontendEnvMonitSample} from '../../01moduleFunctionality/frontend-env-monit-sample';
import {EmDemoAapiEnvMonit} from '../../01moduleFunctionality/api-env-monit';
import {schema_name, microorganism_allowAddNotOnTheList, microorganism_allowAddNotOnTheList_formFields} from '../../03config/config-process';

class emDemoAListModalProdLotBrowser extends EmDemoAapiEnvMonit(FrontendEnvMonitSample(PolymerElement)) {
    static get properties() {
        return {
            listRows: {
                type:Array
                ,
                value: [
                {code: 'LOD', method_name: 'LOD Method', method_version: 1}]
            },
            displayFreeText: {type:Boolean, value:microorganism_allowAddNotOnTheList},
            adhocFormFields: {type: Array, notify: true, bubble: true, value: microorganism_allowAddNotOnTheList_formFields},
            schemaPrefix:{type:String, value:schema_name},
            sampleId:{type: Number},
            finalToken: {type: String}, selectedObject:{type: Object},
            actionName:{type:String},
        }
    }
    static get template() {
        return html`  
        <style include="modal-dialogs">
        /* The Modal (background) */
        .modal-content {
            width: 450px;
        } 
        </style>        
        <div class="modal-content bgimg">
            <div>
                <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
                <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
            </div>
        <div>
            <template is="dom-if" if="{{displayFreeText}}">
                <template is="dom-repeat" items="{{adhocFormFields}}" as="currentfield">       
                    <field-controller on-field-button-clicked="addAdhocMicroorganism" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                </template>             
            </template>
<!--            <vaadin-grid id="mygridid" items="{{listRows}}">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                    <vaadin-grid-column resizable width="{{fld.width}}" path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                </template>
            </vaadin-grid>      
-->            
        </div>    
        `;
    } 

    actionOnSel(){
        //console.log('actionOnSel');
    }   
    dialogConfirmed(){
        //console.log('clicked', this.$.mygrid.getSelectedRows());        
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': this.adhocFormFields[0].value,
            'dialogState': 'confirmed',
            'selectedItems': this.adhocFormFields[0].value,
            'actionName': this.actionName   
            }
        })); 
        //this.$.mygridid.selectedItems=[];  
    }        
    dialogCanceled(){
        //console.log('clicked', this.value);
        this.value='confirmed';
        this.dispatchEvent(new CustomEvent('dialog-button-clicked', {
            bubbles: true,
            composed: true,
            detail: {
            'buttonName': this.name,
            'value': '', //this.value,
            'dialogState': 'canceled'
            }
        }));    
    } 
}

customElements.define('em-demo-a-list-modal-prodlotbrowser', emDemoAListModalProdLotBrowser);