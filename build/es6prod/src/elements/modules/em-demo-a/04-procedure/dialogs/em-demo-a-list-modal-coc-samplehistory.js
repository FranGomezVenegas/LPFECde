define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/@polymer/paper-button/paper-button.js","../../03config/css/Theme01/modal-dialogs.js","../../../../internalComponents/grid-components/vaadingrid-singleselect.js","../../../../internalComponents/form-fields/field-icon-button.js","../../../../../config/app-config.js","../../../process-us/03config/config-process.js","../../03config/config-icons.js","../../../../internalComponents/dialogs/modalwindow-buttons.js"],function(_polymerElement,_paperButton,_modalDialogs,_vaadingridSingleselect,_fieldIconButton,_appConfig,_configProcess,_configIcons,_modalwindowButtons){"use strict";//import '../../../../internalComponents/grid-components/vaadingrid-multiselect';
//import '../../../../app/module-functionality/sample/sample-elements.js';
/**
 * `em-demo-a-list-modal-coc-samplehistory` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class emDemoAListModalCocSamplehistory extends(0,_configIcons.SampleIcons)(_polymerElement.PolymerElement){static get properties(){return{dialogButtons:{type:Array,value:_appConfig.dialog_buttons},listRows:{type:Array,value:[{code:"LOD",method_name:"LOD Method",method_version:1}]},listHeader:Array,schemaPrefix:{type:String,value:_configProcess.schema_name},buttons:{type:Array,value:_configProcess.sampleCustodian_cocSampleHistoryButtons},selectedObject:Array}}static get template(){return _polymerElement.html`
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
             <div>                
                <template is="dom-if" if="{{tableListRowsEmpty(listRows)}}">
                <p>No hay cambios de custodia para esta muestra.</p>
                </template>
                <template is="dom-if" if="{{!tableListRowsEmpty(listRows)}}">
                        <vaadingrid-singleselect id="mygridid" headerfields="{{listHeader}}" rowcontainer="{{listRows}}"            
                            selected-object="{{selectedObject}}"></vaadingrid-singleselect>
                </template>
            </div>     
            
        </div>        
        `}fieldButtonClicked(e){console.log("optionPressed",e.detail.buttonName,"selectedSampleAnalysis",this.selectedObject);//console.log('optionPressed', e.detail.buttonName, 'selectedSample', this.selectedObject);                
if(null==this.selectedObject){this.dispatchEvent(new CustomEvent("toast-error",{bubbles:!0,composed:!0,detail:"Please select one sample analysis first"}));return}var datas=[];datas.schemaPrefix=this.schemaPrefix;datas.actionName=e.detail.buttonName;datas.selectedObject=this.selectedObject;var tabInfo={currTabEsignRequired:this.currTabEsignRequired,currTabConfirmUserRequired:this.currTabConfirmUserRequired};datas.tabInfo=tabInfo;//        datas.sampleResults_analysisListFieldsToRetrieve=sampleResults_analysisListFieldsToRetrieve;
switch(e.detail.buttonName){case"testAssignment":var actionName="TESTASSIGNMENT";this.$.myElementsSample.sampleActionTrigger(actionName,datas);break;/*            var paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&schemaPrefix="+this.schemaPrefix
            +"&testId="+"141"+"&newAnalyst="+"2";
            var datas = [];
            datas.schemaPrefix=this.schemaPrefix; datas.actionName=actionName; datas.paramsUrl=paramsUrl;   
            this.sampleAPI(datas);
            break;  */default:break;}return}dialogConfirmed(){//console.log('clicked', this.$.mygrid.getSelectedRows());        
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"confirmed",selectedItems:this.$.mygridid.selectedItems}}));this.$.mygridid.selectedItems=[]}dialogCanceled(){//console.log('clicked', this.value);
this.value="confirmed";this.dispatchEvent(new CustomEvent("dialog-button-clicked",{bubbles:!0,composed:!0,detail:{buttonName:this.name,value:this.value,dialogState:"canceled"}}))}tableListRowsEmpty(content){console.log("tableListRowsEmpty",content.length,0==content.length);if(0==content.length){return!0}return!1}}customElements.define("em-demo-a-list-modal-coc-samplehistory",emDemoAListModalCocSamplehistory)});