define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","./shared-styles.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../internalComponents/grid-components/vaadingrid-singleselectrunaction.js","../01moduleFunctionality/api-sample.js","../01moduleFunctionality/frontend-sample.js","../02Redux/process-us_actions.js","../03config/config-process.js"],function(_polymerElement,_sharedStyles,_connectMixin,_store,_vaadingridSingleselectrunaction,_apiSample,_frontendSample,_processUs_actions,_configProcess){"use strict";class processUsSampleReception extends(0,_apiSample.ApiSample)((0,_frontendSample.FrontendSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedSample:Number,unReceivedSamples:{type:Array,notify:!0},sampleReceptionSampleFieldToDisplay:{type:Array,value:_configProcess.sampleReception_sampleFieldToDisplay},selectedObject:Object,actionCode:Object}}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.processUs){this.unReceivedSamples=state.processUs.unReceivedSamples}this.schemaPrefix=_configProcess.schema_name}static get template(){return _polymerElement.html`
            <style include="shared-styles">
            :host {
                display: block;    
                padding: 10px;
                left: 2px;
            }
            divgrid {
                length: 90%;
                width:75%;
            }
            </style>     
            <vaadin-button on-click="refreshTable"><iron-icon icon="refresh"></iron-icon></vaadin-button>

            <vaadingrid-singleselectrunaction id="mygridid" headerfields="{{sampleReceptionSampleFieldToDisplay}}" 
                rowcontainer="{{unReceivedSamples}}" selected-object="{{selectedObject}}"
                on-selected-object-changed="itemSelected">
            </vaadingrid-singleselectrunaction>
        `}itemSelected(e){//console.log('process-us-sample-reception >> itemSelected', e.detail.value);
let selectedSampleLocal=e.detail.value.sample_id;this.selectedSample=selectedSampleLocal;var actionName="RECEIVESAMPLE",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&sampleId="+this.selectedSample+"&schemaPrefix="+this.schemaPrefix,datas=[];datas.schemaPrefix=this.schemaPrefix;datas.actionName=actionName;datas.selectedSample=this.selectedSample;datas.paramsUrl=paramsUrl;datas.callBackFunction=this.sampleReceivedSuccess.bind(this);this.sampleBackEndCall(datas)}refreshTable(){this.onFinalTokenFilled()}sampleReceivedSuccess(){this.refreshTable();var datas=[];datas.receivedSample=datas.selectedSample;_store.store.dispatch((0,_processUs_actions.receivedSamplesInSession)(datas))}onFinalTokenFilled(){if(!this.finalToken||!this.schemaPrefix){return}//        console.log('process-us-sample-reception >> onFinalTokenFilled', this.finalToken, this.schemaPrefix);
this.getUnreceivedSamples({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"UNRECEIVESAMPLES_LIST",sampleFieldToRetrieve:_configProcess.sampleReception_sampleFieldToRetrieve,whereFieldsName:_configProcess.sampleReception_samplesWhereFieldsName,whereFieldsValue:_configProcess.sampleReception_samplesWhereFieldsValue,sortFieldsName:_configProcess.sampleReception_sampleFieldToSort});//this.actionCode = this.itemSelected.bind(this);
}}customElements.define("process-us-sample-reception",processUsSampleReception)});