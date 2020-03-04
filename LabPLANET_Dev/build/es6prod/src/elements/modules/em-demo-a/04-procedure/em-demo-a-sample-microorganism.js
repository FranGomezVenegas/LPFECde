define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../internalComponents/grid-components/vaadingrid-singleselect.js","./shared-styles.js","../01moduleFunctionality/env-monit-elements-sample.js","../01moduleFunctionality/frontend-env-monit-sample.js","../01moduleFunctionality/api-env-monit.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_vaadingridSingleselect,_sharedStyles,_envMonitElementsSample,_frontendEnvMonitSample,_apiEnvMonit,_configProcess){"use strict";class emDemoASampleMicroorganism extends(0,_apiEnvMonit.EmDemoAapiEnvMonit)((0,_frontendEnvMonitSample.FrontendEnvMonitSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},currTabEsignRequired:Boolean,currTabConfirmUserRequired:Boolean,selectedSample:{type:Number},allSamplesStageMicroorganism:{type:Array,notify:!0},sampleFieldToDisplay:{type:Array,value:_configProcess.sampleMicroorganism_sampleFieldToDisplay},samplesWhereFieldsName:{type:String,value:_configProcess.sampleMicroorganism_samplesWhereFieldsName},samplesWhereFieldsValue:{type:String,value:_configProcess.sampleMicroorganism_samplesWhereFieldsValue},selectedObject:{type:Object,notify:!0},buttons:{type:Array,value:_configProcess.sampleMicroorganism_buttons},addSampleAnalysis:{type:Boolean,value:!0},addSampleAnalysisFieldToRetrieve:{type:String,value:""},addSampleAnalysisResult:{type:Boolean,value:!0},addSampleAnalysisResultFieldToRetrieve:{type:String,value:""},callBackRefreshWindow:Object}}dialogButtonClicked(e){console.log("dialogButtonClicked");//this.onFinalTokenFilled();
this.fieldButtonClicked(e)}refreshWindow(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);if(!this.finalToken||!this.schemaPrefix){return}this.getAllSamplesStageMicroorganism({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"GET_SAMPLE_MICROORGANISM_VIEW",sampleFieldToRetrieve:_configProcess.sampleMicroorganism_sampleFieldToRetrieve//this.sampleFieldToRetrieve
,samplesTabSortFields:_configProcess.sampleMicroorganism_sampleFieldToSort//this.samplesTabSortFields,
,samplesWhereFieldsName:this.samplesWhereFieldsName,samplesWhereFieldsValue:this.samplesWhereFieldsValue,addSampleAnalysis:this.addSampleAnalysis,addSampleAnalysisFieldToRetrieve:this.addSampleAnalysisFieldToRetrieve,addSampleAnalysisResult:this.addSampleAnalysisResult,addSampleAnalysisResultFieldToRetrieve:this.addSampleAnalysisResultFieldToRetrieve})}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.allSamplesStageMicroorganism=state.emDemoA.allSamplesStageMicroorganism}if(0!=this.tabIndex){//this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
this.currTabEsignRequired=state.tabs.currTabEsignRequired;this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired}this.schemaPrefix=_configProcess.schema_name}static get template(){return _polymerElement.html`
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
                height:560px;
            }
            </style>                 
            <env-monit-elements-sample id="myElementsSample" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements-sample>
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 

            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="dialogButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>            
            <vaadingrid-singleselect class="vaadin-grid" id="mygridid" headerfields="{{sampleFieldToDisplay}}" rowcontainer="{{allSamplesStageMicroorganism}}"            
            selected-object="{{selectedObject}}">
            </vaadingrid-singleselect>
        `}}customElements.define("em-demo-a-sample-microorganism",emDemoASampleMicroorganism)});