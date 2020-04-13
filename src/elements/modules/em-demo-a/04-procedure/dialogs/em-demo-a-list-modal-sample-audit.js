import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../../store.js';
import '@polymer/paper-button/paper-button';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 
import {schema_name} from '../../03config/config-process.js'; 
import {FrontendEnvMonitSample} from '../../01moduleFunctionality/frontend-env-monit-sample';
import {EmDemoAapiEnvMonit} from '../../01moduleFunctionality/api-env-monit';
import '../../03config/css/Theme01/modal-dialogs';
import {auditDrillDownIcon} from '../../03config/config-icons';
import '../../../../internalComponents/dialogs/modalwindow-buttons.js';
class emDemoAListModalSampleAudit extends (EmDemoAapiEnvMonit(FrontendEnvMonitSample(connect(store)(PolymerElement)))) {
    static get properties() {
        return {
            auditDrillDownButton:{type: String, value:auditDrillDownIcon},
            schemaPrefix: {type: String, value: schema_name}, 
            finalToken: String,            
            buttons:{type:Array},
            selectedObject: {type: Object, notify: true},
        }
    }
    static get template() {
        return html`  
        <style include="modal-dialogs">
        /* The Modal (background) */
            .modal-content {
                width: 650px;
                z-index:999;
            } 
        </style>
        <div class="modal-content bgimg">
            <modalwindow-buttons 
                display-cancel-button 							display-confirm-button 								
                on-dialog-cancelbutton-clicked="dialogCanceled" on-dialog-confirmedbutton-clicked="dialogConfirmed"> </modalwindow-buttons>             
            <div name="SamplingButtons" class="buttonGroup">
                    <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                        <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                        on-field-button-clicked="setAuditReviewed" on-field-list-value-changed="onListChange"> 
                        </field-controller>
                    </template>  
            </div>            

        <div>
       
            <vaadin-grid id="mygridid" items="{{listRows}}" on-active-item-changed="itemSelected">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                <template name="auditLvl2" class="row-details">
                    <div class="details">
                        <vaadin-grid id="grid-level2" name="audit-lvl2" items="[[item.sublevel]]" active-item="{{activeItem}}">
                            <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                                <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                            </template>
                        </vaadin-grid> 
                    </div> 
                </template>
                <vaadin-grid-column style="width: 30px;">
                    <template>
                        <vaadin-checkbox aria-label$="Ver Detalle" unchecked checked="{{detailsOpened}}">
                            <img style="height:24px; width: 12px;" src="{{auditDrillDownButton}}"> 
                        </vaadin-checkbox>
                    </template>
                </vaadin-grid-column>
                <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                    <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                </template>
            </vaadin-grid> 

        </div>    
        `;
    } 
    itemSelectedOld(e) {       
        this.selectedObject=e.detail.value; 
        this.$.mygridid.selectedObject=this.selectedObject;
        if (this.selectedObject==null){return;}
        console.log('vaadingrid-singleselect >> itemSelected', this.selectedObject);
        //if (e.detail.value==null){this.selectedSample=null; return;}
        const item = e.detail.value;
        this.$.mygridid.selectedItems = item ? [item] : [];
        this.selectedObject=item;
        this.$.mygridid.selectedObject=item;
    } 
    itemSelected(e) {        
        if (e.detail.value==null){this.selectedSample=null; return;}
        if (this.selectedSample==e.detail.value.sample_id){this.selectedSample=null; return;}
        //this.selectedObject=e.detail.value.sample_id;
        //console.log('Object selected', this.selectedObject); 
        const item = e.detail.value;
        this.$.mygridid.selectedItems = item ? [item] : [];
        this.selectedObject=e.detail.value;
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
            'value': this.value,
            'dialogState': 'confirmed',
            'selectedItems': this.$.mygridid.selectedItems   
            }
        })); 
        this.$.mygridid.selectedItems=[];  
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
    stateChanged(state) {        
        this.finalToken = state.app.user.finalToken;
    }
}

customElements.define('em-demo-a-list-modal-sample-audit', emDemoAListModalSampleAudit);