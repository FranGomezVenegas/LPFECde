define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/@polymer/paper-button/paper-button.js","../../03config/css/Theme01/modal-dialogs.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js","../../../../internalComponents/grid-components/vaadingrid-multiselect.js","../../../../internalComponents/form-fields/field-icon-button.js","../../01moduleFunctionality/env-monit-elements-sample.js","../../../../../config/app-config.js","../../../../internalComponents/dialogs/modalwindow-buttons.js","../../../process-us/03config/config-process.js"],function(_polymerElement,_paperButton,_modalDialogs,_vaadinGrid,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinGridFilterColumn,_vaadingridMultiselect,_fieldIconButton,_envMonitElementsSample,_appConfig,_modalwindowButtons,_configProcess){"use strict";//import '../../../../internalComponents/grid-components/vaadingrid-singleselect.js';
//import {FrontendEnvMonitSample} from '../../01moduleFunctionality/frontend-env-monit-sample.js';
//import {EmDemoAapiEnvMonit} from '../../01moduleFunctionality/api-env-monit.js';
/**
 * `em-demo-a-list-modal-sampleanalysis` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class emDemoAListModalSampleanalysis extends _polymerElement.PolymerElement{static get properties(){return{dialogButtons:{type:Array,value:_appConfig.dialog_buttons},listRows:Array,listHeader:Array,schemaPrefix:{type:String,value:_configProcess.schema_name},buttons:{type:Array,value:_configProcess.sampleResults_givenSampleAnalysisListDialog_buttons},selectedObject:{type:Object,notify:!0},callBackRefreshWindow:Object}}static get template(){return _polymerElement.html`
  
  <style include="modal-dialogs">
            .modal-content {
                width: 550px;
            } 
            .buttonGroup{
            display: flex;
            }
        </style>        

        <env-monit-elements-sample id="myElementsSample" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements-sample>  	
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
        <div>
        <!-- <vaadingrid-singleselect id="mygrid" headerfields="{{listHeader}}" rowcontainer="{{listRows}}"            
        selected-object="{{selectedObject}}"></vaadingrid-singleselect> -->

            <vaadingrid-multiselect id="mygridid" headerfields="{{listHeader}}" rowcontainer="{{listRows}}"            
            selected-object="{{selectedObject}}"></vaadingrid-multiselect>

            <!-- <vaadin-grid id="mygridid" items="{{listRows}}">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
            <template is="dom-repeat" items="{{listHeader}}" as="fld">        
                <vaadin-grid-column resizable path="{{fld.name}}" header="{{fld.label_en}}"></vaadin-grid-column>
            </template>
            </vaadin-grid>                   -->
        </div>    
        
        `}/*    itemSelected(e) {
        //console.log('process-us-sample-reception >> itemSelected', e.detail.value);
                let selectedSampleAnalysisLocal = e.detail.value.test_id;
                this.selectedSampleAnalysis= selectedSampleAnalysisLocal;
                var datas = [];
                datas.row=e.detail.value;        
                datas.selectedSampleAnalysis=this.selectedSampleAnalysis;
                this.selectedObject=e.detail.value;                                    
                console.log('em-demo-a-list-modal-sampleanalysis > itemSelected > this.selectedObject', this.selectedObject);
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
*/ /*    fieldButtonClicked(e) {
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
            console.log('Esto no funciona porque llamar a sample-elements de nuevo crea un loop infinito');
            //this.$.myElements.actionTrigger(actionName, datas);
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
*/dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}refreshWindow(){}/*ready(){
        this.addEventListener('toast-error', (e) => this.toastError(e) );
    } */}customElements.define("em-demo-a-list-modal-sampleanalysis",emDemoAListModalSampleanalysis)});