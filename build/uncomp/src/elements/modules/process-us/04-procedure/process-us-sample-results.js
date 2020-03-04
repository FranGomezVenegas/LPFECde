import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";import"../../../internalComponents/grid-components/vaadingrid-singleselect.js";import"./shared-styles.js";import"../01moduleFunctionality/sample-elements.js";import{FrontendSample}from"../01moduleFunctionality/frontend-sample.js";import{schema_name,sampleResults_sampleFieldToRetrieve,sampleResults_sampleFieldToDisplay,sampleResults_samplesWhereFieldsName,sampleResults_samplesWhereFieldsValue,sampleResults_sampleFieldToSort,sampleResults_analysisListToDisplay,sampleResults_sampleAnalysisListToDisplay,sampleResults_sampleAnalysisResultEntryFieldsToDisplay,sampleResults_buttons}from"../03config/config-process.js";class processUsSampleResults extends FrontendSample(connect(store)(PolymerElement)){static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},currTabEsignRequired:Boolean,currTabConfirmUserRequired:Boolean,selectedSample:{type:Number},sampleFieldToDisplay:{type:Array,value:sampleResults_sampleFieldToDisplay},samplesWhereFieldsName:{type:String,value:sampleResults_samplesWhereFieldsName},samplesWhereFieldsValue:{type:String,value:sampleResults_samplesWhereFieldsValue},sampleAnalysisTableHeaderFlds:{type:Array,value:sampleResults_sampleAnalysisListToDisplay},analysisListToDisplay:{type:Array,value:sampleResults_analysisListToDisplay},enterResultTableHeaderFlds:{type:Array,value:sampleResults_sampleAnalysisResultEntryFieldsToDisplay},buttons:{type:Array,value:sampleResults_buttons},addSampleAnalysis:{type:Boolean,value:!0},addSampleAnalysisFieldToRetrieve:{type:String,value:""},addSampleAnalysisResult:{type:Boolean,value:!0},addSampleAnalysisResultFieldToRetrieve:{type:String,value:""}}}refreshTable(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}onFinalTokenFilled(){if(!this.finalToken||!this.schemaPrefix){return}this.getSamplesForResults({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"SAMPLES_INPROGRESS_LIST",sampleFieldToRetrieve:sampleResults_sampleFieldToRetrieve//this.sampleFieldToRetrieve
,samplesTabSortFields:sampleResults_sampleFieldToSort//this.samplesTabSortFields,
,samplesWhereFieldsName:this.samplesWhereFieldsName,samplesWhereFieldsValue:this.samplesWhereFieldsValue,addSampleAnalysis:this.addSampleAnalysis,addSampleAnalysisFieldToRetrieve:this.addSampleAnalysisFieldToRetrieve,addSampleAnalysisResult:this.addSampleAnalysisResult,addSampleAnalysisResultFieldToRetrieve:this.addSampleAnalysisResultFieldToRetrieve})}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.processUs){this.forResultsSamples=state.processUs.forResultsSamples}if(0!=this.tabIndex){//this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
this.currTabEsignRequired=state.tabs.currTabEsignRequired;this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired}this.schemaPrefix=schema_name}static get template(){return html`
            <style include="shared-styles">
            :host {
                display: block;
                padding: 10px;
            }
            .buttonGroup {
                display: flex
            }
            vaadin-grid {
                width:90%;
            }
            </style>      
            <sample-elements id="myElements"></sample-elements>  
            <vaadin-button on-click="refreshTable"><iron-icon icon="refresh"></iron-icon></vaadin-button> 

            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>            
            <vaadingrid-singleselect id="mygrid" headerfields="{{sampleFieldToDisplay}}" rowcontainer="{{forResultsSamples}}"            
            selected-object="{{selectedObject}}"></vaadingrid-singleselect>
        `}}customElements.define("process-us-sample-results",processUsSampleResults);