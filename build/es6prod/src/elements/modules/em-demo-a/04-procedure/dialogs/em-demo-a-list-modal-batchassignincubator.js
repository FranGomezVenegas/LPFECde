define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/@polymer/paper-button/paper-button.js","../../03config/css/Theme01/modal-dialogs.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js","../../../../internalComponents/grid-components/vaadingrid-multiselect.js","../../../../internalComponents/form-fields/field-icon-button.js","../../../../../config/app-config.js","../../../process-us/03config/config-process.js","../../../../internalComponents/dialogs/modalwindow-buttons.js"],function(_polymerElement,_paperButton,_modalDialogs,_vaadinGrid,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinGridFilterColumn,_vaadingridMultiselect,_fieldIconButton,_appConfig,_configProcess,_modalwindowButtons){"use strict";//import '../../../../internalComponents/grid-components/vaadingrid-singleselect.js';
//import {FrontendEnvMonitSample} from '../../01moduleFunctionality/frontend-env-monit-sample.js';
//import {EmDemoAapiEnvMonit} from '../../01moduleFunctionality/api-env-monit.js';
//import '../../01moduleFunctionality/env-monit-elements.js';
/**
 * `em-demo-a-list-modal-batchassignincubator` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class emDemoAListModalBatchassignincubator extends _polymerElement.PolymerElement{static get properties(){return{dialogButtons:{type:Array,value:_appConfig.dialog_buttons},listRows:Array,listHeader:Array,schemaPrefix:{type:String,value:_configProcess.schema_name},//buttons: {type: Array, value: sampleResults_givenSampleAnalysisListDialog_//},
selectedObject:{type:Object,notify:!0}}}static get template(){return _polymerElement.html`
        <style include="modal-dialogs">
            .modal-content {
                width: 550px;
            } 
            .buttonGroup{
            display: flex;
            }
        </style>        
        <div class="modal-content bgimg">
            <modalwindow-buttons display-close-button display-confirm-button 
                on-dialog-confirmedbutton-clicked="dialogConfirmed"> </modalwindow-buttons>        
            <div>
                <vaadin-grid id="mygridid" items="{{listRows}}">  
                    <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                    <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                        <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                    </template>
                </vaadin-grid>      
            </div>    
        </div>                
        `}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="canceled";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}/*ready(){
        this.addEventListener('toast-error', (e) => this.toastError(e) );
    } */}customElements.define("em-demo-a-list-modal-batchassignincubator",emDemoAListModalBatchassignincubator)});