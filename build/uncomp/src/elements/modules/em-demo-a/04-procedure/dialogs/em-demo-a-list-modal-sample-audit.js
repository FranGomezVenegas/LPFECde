import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../../store.js";import"../../../../../../node_modules/@polymer/paper-button/paper-button.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js";import{schema_name}from"../../03config/config-process.js";import{FrontendEnvMonitSample}from"../../01moduleFunctionality/frontend-env-monit-sample.js";import{EmDemoAapiEnvMonit}from"../../01moduleFunctionality/api-env-monit.js";import"../../03config/css/Theme01/modal-dialogs.js";import{auditDrillDownIcon}from"../../03config/config-icons.js";import"../../../../internalComponents/dialogs/modalwindow-buttons.js";class emDemoAListModalSampleAudit extends EmDemoAapiEnvMonit(FrontendEnvMonitSample(connect(store)(PolymerElement))){static get properties(){return{auditDrillDownButton:{type:String,value:auditDrillDownIcon},schemaPrefix:{type:String,value:schema_name},finalToken:String,buttons:{type:Array},selectedObject:{type:Object,notify:!0}}}static get template(){return html`  
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
        `}itemSelectedOld(e){this.selectedObject=e.detail.value;this.$.mygridid.selectedObject=this.selectedObject;if(null==this.selectedObject){return}console.log("vaadingrid-singleselect >> itemSelected",this.selectedObject);//if (e.detail.value==null){this.selectedSample=null; return;}
const item=e.detail.value;this.$.mygridid.selectedItems=item?[item]:[];this.selectedObject=item;this.$.mygridid.selectedObject=item}itemSelected(e){if(null==e.detail.value){this.selectedSample=null;return}if(this.selectedSample==e.detail.value.sample_id){this.selectedSample=null;return}//this.selectedObject=e.detail.value.sample_id;
//console.log('Object selected', this.selectedObject); 
const item=e.detail.value;this.$.mygridid.selectedItems=item?[item]:[];this.selectedObject=e.detail.value}actionOnSel(){//console.log('actionOnSel');
}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}stateChanged(state){this.finalToken=state.app.user.finalToken}}customElements.define("em-demo-a-list-modal-sample-audit",emDemoAListModalSampleAudit);