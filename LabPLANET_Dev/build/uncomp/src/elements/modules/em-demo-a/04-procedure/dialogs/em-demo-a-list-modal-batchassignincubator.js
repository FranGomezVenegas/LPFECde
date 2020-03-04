import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../../../node_modules/@polymer/paper-button/paper-button.js";import"../../03config/css/Theme01/modal-dialogs.js";//import '../../../../internalComponents/grid-components/vaadingrid-singleselect.js';
import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js";import"../../../../internalComponents/grid-components/vaadingrid-multiselect.js";import"../../../../internalComponents/form-fields/field-icon-button.js";//import {FrontendEnvMonitSample} from '../../01moduleFunctionality/frontend-env-monit-sample.js';
//import {EmDemoAapiEnvMonit} from '../../01moduleFunctionality/api-env-monit.js';
//import '../../01moduleFunctionality/env-monit-elements.js';
import{dialog_buttons}from"../../../../../config/app-config.js";import{schema_name}from"../../../process-us/03config/config-process.js";/**
 * `em-demo-a-list-modal-batchassignincubator` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class emDemoAListModalBatchassignincubator extends PolymerElement{static get properties(){return{dialogButtons:{type:Array,value:dialog_buttons},listRows:Array,listHeader:Array,schemaPrefix:{type:String,value:schema_name},//buttons: {type: Array, value: sampleResults_givenSampleAnalysisListDialog_//},
selectedObject:{type:Object,notify:!0}}}static get template(){return html`
  
        <style include="modal-dialogs">
            .modal-content {
                width: 550px;
            } 
            .buttonGroup{
            display: flex;
            }
        </style>        

        <div class="modal-content bgimg">
        <div> 
            <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
            <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
        </div>
        
        <div>
        <vaadin-grid id="mygridid" items="{{listRows}}">  
            <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
            <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
            </template>
        </vaadin-grid>      
        </div>    
        `}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="canceled";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}/*ready(){
        this.addEventListener('toast-error', (e) => this.toastError(e) );
    } */}customElements.define("em-demo-a-list-modal-batchassignincubator",emDemoAListModalBatchassignincubator);