import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../../../node_modules/@polymer/paper-button/paper-button.js";import"../../03config/css/Theme01/modal-dialogs.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js";import"../../../../internalComponents/form-fields/field-controller.js";import{FrontendEnvMonitSample}from"../../01moduleFunctionality/frontend-env-monit-sample.js";import{EmDemoAapiEnvMonit}from"../../01moduleFunctionality/api-env-monit.js";import{schema_name,productionLot_newLot_formFields}from"../../03config/config-process.js";import"../../../../internalComponents/dialogs/modalwindow-buttons.js";class emDemoAListModalProdLotBrowser extends EmDemoAapiEnvMonit(FrontendEnvMonitSample(PolymerElement)){static get properties(){return{listRows:{type:Array,value:[{code:"LOD",method_name:"LOD Method",method_version:1}]},adhocFormFields:{type:Array,notify:!0,bubble:!0,value:productionLot_newLot_formFields},schemaPrefix:{type:String,value:schema_name},sampleId:{type:Number},actionName:{type:String}}}static get template(){return html`  
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
}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.adhocFormFields[0].value,dialogState:"confirmed",selectedItems:this.adhocFormFields[0].value,actionName:this.actionName}}));//this.$.mygridid.selectedItems=[];  
}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:"",//this.value,
dialogState:"canceled"}}))}}customElements.define("em-demo-a-list-modal-prodlotbrowser",emDemoAListModalProdLotBrowser);