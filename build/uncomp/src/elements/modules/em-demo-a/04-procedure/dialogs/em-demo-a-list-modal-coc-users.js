import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import"../../../../../../node_modules/@polymer/paper-button/paper-button.js";import"../../03config/css/Theme01/modal-dialogs.js";//import '../../../../internalComponents/grid-components/vaadingrid-singleselectrunaction';
//import '../../../../internalComponents/grid-components/vaadingrid-singleselect.js';
//import '../../../../internalComponents/grid-components/vaadingrid-multiselect';
//import '../../../../app/module-functionality/sample/sample-elements.js';
import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js";import"../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js";import"../../../../internalComponents/form-fields/field-icon-button.js";import"../../../../internalComponents/dialogs/modalwindow-buttons.js";import{dialog_buttons}from"../../../../../config/app-config.js";import{schema_name,sampleCustodian_cocUsersListButtons}from"../../03config/config-process.js";import{FrontendEnvMonitSample}from"../../01moduleFunctionality/frontend-env-monit-sample.js";/**
 * `em-demo-a-list-modal-coc-users` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class emDemoAListModalCocUsers extends FrontendEnvMonitSample(PolymerElement){static get properties(){return{dialogButtons:{type:Array,value:dialog_buttons},listRows:{type:Array,value:[{code:"LOD",method_name:"LOD Method",method_version:1}]},listHeader:Array,schemaPrefix:{type:String,value:schema_name},buttons:{type:Array,value:sampleCustodian_cocUsersListButtons},selectedObject:{type:Object,notify:!0}}}static get template(){return html`
        <style include="modal-dialogs">
            .modal-content {
                width: 450px;
            } 
        </style>        

        <div class="modal-content bgimg">
            <modalwindow-buttons 
                display-cancel-button 							display-confirm-button 								
                on-dialog-cancelbutton-clicked="dialogCanceled" on-dialog-confirmedbutton-clicked="dialogConfirmed"> </modalwindow-buttons> 
            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>    

            <vaadin-grid id="mygridid" items="{{listRows}}">  
                <vaadin-grid-selection-column  auto-select on-selected-object-changed="itemSelected"></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                    <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
                </template>
            </vaadin-grid>          
<!--                            
            <vaadingrid-singleselectrunaction id="mygridid" headerfields="{{listHeader}}" 
                rowcontainer="{{listRows}}" selected-object="{{selectedObject}}"
                on-selected-object-changed="itemSelected">
            </vaadingrid-singleselectrunaction>

            <vaadingrid-singleselect id="mygridid" headerfields="{{listHeader}}" rowcontainer="{{listRows}}"            
            on-selected-object-changed="itemSelected" selected-object="{{selectedObject}}"></vaadingrid-singleselect>
    
            <vaadin-grid id="mygridid" items="{{listRows}}">  
            <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
            <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
            </template>
            </vaadin-grid>      
-->
        </div>    
        
        `}/*    fieldButtonClicked(e) {
        console.log('optionPressed', e.detail.buttonName, 'selectedSampleAnalysis', this.selectedObject);                
        //console.log('optionPressed', e.detail.buttonName, 'selectedSample', this.selectedObject);                
        if (this.selectedObject==null){
            this.dispatchEvent(new CustomEvent('toast-error', {bubbles: true, composed: true,
                detail: 'Please select one sample analysis first'}));    
            return;
        }           
        var datas = [];
        datas.schemaPrefix=this.schemaPrefix; datas.actionName=e.detail.buttonName;
        datas.selectedObject=this.selectedObject;
        var tabInfo={
            currTabEsignRequired: this.currTabEsignRequired,
            currTabConfirmUserRequired: this.currTabConfirmUserRequired};
        datas.tabInfo=tabInfo;            
//        datas.sampleResults_analysisListFieldsToRetrieve=sampleResults_analysisListFieldsToRetrieve;
        switch (e.detail.buttonName) {        
        case 'testAssignment':
            var actionName='TESTASSIGNMENT';
            this.$.myElementsSample.sampleActionTrigger(actionName, datas);
            break;
            // var paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+this.schemaPrefix
            // +"&testId="+"141"+"&newAnalyst="+"2";
            // var datas = [];
            // datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;   
            // this.sampleAPI(datas);
            // break;  
        default:
            break;
        }
        return;
    }  
*/dialogConfirmed(){console.log("dialogConfirmed","this.selectedObject",this.selectedObject);this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}/*ready(){
        this.addEventListener('toast-error', (e) => this.toastError(e) );
    } */}customElements.define("em-demo-a-list-modal-coc-users",emDemoAListModalCocUsers);