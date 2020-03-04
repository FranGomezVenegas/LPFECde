define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","./shared-styles.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../internalComponents/grid-components/vaadingrid-multiselect.js","../01moduleFunctionality/frontend-sample.js","../03config/config-process.js"],function(_polymerElement,_sharedStyles,_connectMixin,_store,_vaadingridMultiselect,_frontendSample,_configProcess){"use strict";class processUsSampleRevision extends(0,_frontendSample.FrontendSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{selectedObjectLevel:{type:String,value:"SAMPLE"},finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedObject:{type:Number},selectedRow:Object,forRevisionSamples:{type:Array},samplesTabFieldsArr:{type:Array,value:_configProcess.sampleRevision_sampleFieldToDisplay},samplesTabFields:{type:String,value:_configProcess.sampleRevision_sampleFieldToRetrieve},samplesTabSortFields:{type:String,value:_configProcess.sampleRevision_sampleFieldToSort},samplesWhereFieldsName:{type:String,value:_configProcess.sampleRevision_sampleWhereFieldsName},samplesWhereFieldsValue:{type:String,value:_configProcess.sampleRevision_sampleWhereFieldsValue},buttons:{type:Array,value:_configProcess.sampleRevision_buttons}// notify: true,                bubble: true,                
}}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.processUs){this.forRevisionSamples=state.processUs.forRevisionSamples}this.schemaPrefix=_configProcess.schema_name}refreshTable(){this.onFinalTokenFilled();this.$.mygridid.clearCache()}onFinalTokenFilled(){//console.log('process-us-sample-login >> onFinalTokenFilled', this.finalToken, this.schemaPrefix);
if(!this.finalToken||!this.schemaPrefix){return}this.getSamplesForRevision({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"SAMPLES_INPROGRESS_LIST",sampleFieldToRetrieve:_configProcess.sampleRevision_sampleFieldToRetrieve,samplesWhereFieldsName:this.samplesWhereFieldsName,samplesWhereFieldsValue:this.samplesWhereFieldsValue,samplesTabSortFields:this.samplesTabSortFields})}static get template(){return _polymerElement.html`
            <style include="shared-styles">
            :host {
                display: block;
                padding: 10px;
            }
            .buttonGroup {
                display: flex
            }
            </style>        
             
            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                </template>  
            </div>

            <vaadin-button on-click="refreshTable"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
            <vaadingrid-multiselect id="mygridid" headerfields="{{samplesTabFieldsArr}}" rowcontainer="{{forRevisionSamples}}"            
            selected-object="{{selectedObject}}"></vaadingrid-multiselect>
        `}}customElements.define("process-us-sample-revision",processUsSampleRevision)});