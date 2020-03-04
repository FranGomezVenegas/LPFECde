define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../../store.js","../../../../../../node_modules/@polymer/paper-button/paper-button.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js","../../03config/config-process.js","../../01moduleFunctionality/frontend-env-monit-sample.js","../../01moduleFunctionality/api-env-monit.js","../../03config/css/Theme01/modal-dialogs.js","../../03config/config-icons.js"],function(_polymerElement,_connectMixin,_store,_paperButton,_vaadinGrid,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinGridFilterColumn,_configProcess,_frontendEnvMonitSample,_apiEnvMonit,_modalDialogs,_configIcons){"use strict";class emDemoAListModalSampleAudit extends(0,_apiEnvMonit.EmDemoAapiEnvMonit)((0,_frontendEnvMonitSample.FrontendEnvMonitSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){static get properties(){return{auditDrillDownButton:{type:String,value:_configIcons.auditDrillDownIcon},schemaPrefix:{type:String,value:_configProcess.schema_name},finalToken:String,buttons:{type:Array},selectedObject:{type:Object,notify:!0}}}static get template(){return _polymerElement.html`  
        <style include="modal-dialogs">
        /* The Modal (background) */
            .modal-content {
                width: 650px;
                z-index:999;
            } 
        </style>
        <div class="modal-content bgimg">
            <div>
                <paper-button name="cancel" dialog-dismiss on-click="dialogCanceled">Cancel</paper-button>
                <paper-button name="confirm" dialog-confirm autofocus on-click="dialogConfirmed">Accept</paper-button>
            </div>
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
        `}itemSelected(e){this.selectedObject=e.detail.value;this.$.mygridid.selectedObject=this.selectedObject;if(null==this.selectedObject){return}console.log("vaadingrid-singleselect >> itemSelected",this.selectedObject);//if (e.detail.value==null){this.selectedSample=null; return;}
const item=e.detail.value;this.$.mygridid.selectedItems=item?[item]:[];this.selectedObject=item;this.$.mygridid.selectedObject=item}actionOnSel(){//console.log('actionOnSel');
}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}stateChanged(state){this.finalToken=state.app.user.finalToken}}customElements.define("em-demo-a-list-modal-sample-audit",emDemoAListModalSampleAudit)});