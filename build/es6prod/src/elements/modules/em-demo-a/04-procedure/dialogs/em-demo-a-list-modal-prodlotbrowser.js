define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/@polymer/paper-button/paper-button.js","../../03config/css/Theme01/modal-dialogs.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js","../../../../internalComponents/form-fields/field-controller.js","../../01moduleFunctionality/frontend-env-monit-sample.js","../../01moduleFunctionality/api-env-monit.js","../../03config/config-process.js","../../../../internalComponents/dialogs/modalwindow-buttons.js"],function(_polymerElement,_paperButton,_modalDialogs,_vaadinGrid,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinGridFilterColumn,_fieldController,_frontendEnvMonitSample,_apiEnvMonit,_configProcess,_modalwindowButtons){"use strict";class emDemoAListModalProdLotBrowser extends(0,_apiEnvMonit.EmDemoAapiEnvMonit)((0,_frontendEnvMonitSample.FrontendEnvMonitSample)(_polymerElement.PolymerElement)){static get properties(){return{adhocFormFields:{type:Array,notify:!0,bubble:!0,value:_configProcess.productionLot_newLot_formFields},schemaPrefix:{type:String,value:_configProcess.schema_name},sampleId:{type:Number},actionName:{type:String}}}static get template(){return _polymerElement.html`  
        <style include="modal-dialogs">
        /* The Modal (background) */
        .modal-content {
            width: 450px;
        } 
        </style>        
        <div class="modal-content bgimg">
            <modalwindow-buttons 
                display-cancel-button 							display-confirm-button 								
                on-dialog-cancelbutton-clicked="dialogCanceled" on-dialog-confirmedbutton-clicked="dialogConfirmed"> </modalwindow-buttons>             
        <div>
            <template is="dom-repeat" items="{{adhocFormFields}}" as="currentfield">       
                <field-controller on-keydown="keyPressed" on-field-button-clicked="addAdhocMicroorganism" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
            </template>             
        </div>    
        `}keyPressed(e){//console.log('key pressed');
if("Enter"==e.key){this.dialogConfirmed();return}}actionOnSel(){//console.log('actionOnSel');
}dialogConfirmed(){console.log("dialogConfirmed");this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.adhocFormFields[0].value,dialogState:"confirmed",selectedItems:this.adhocFormFields[0].value,actionName:this.actionName}}));this.resetValue;//const field=this.shadowRoot.getElementById(this.adhocFormFields[0].name);
//if (field){field.resetValue();}
//this.$.mygridid.selectedItems=[];  
}dialogCanceled(){console.log("dialogCanceled",this.value);this.value="canceled";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:"",//this.value,
dialogState:"canceled"}}));this.resetValue;//const field=this.shadowRoot.getElementById(this.adhocFormFields[0].name);
//if (field){field.resetValue();}
}resetValue(){if(!this.adhocFormFields){return}const field=this.shadowRoot.getElementById(this.adhocFormFields[0].name);if(field){field.resetValue()}}constructor(){super()}}customElements.define("em-demo-a-list-modal-prodlotbrowser",emDemoAListModalProdLotBrowser)});