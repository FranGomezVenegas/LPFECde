import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import"./shared-styles.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";import"../../../internalComponents/grid-components/vaadingrid-singleselectrunaction.js";import{ApiSample}from"../01moduleFunctionality/api-sample.js";import{FrontendSample}from"../01moduleFunctionality/frontend-sample.js";import{receivedSamplesInSession}from"../02Redux/process-us_actions.js";import{schema_name,sampleReception_sampleFieldToRetrieve,sampleReception_sampleFieldToDisplay,sampleReception_sampleFieldToSort,sampleReception_samplesWhereFieldsValue,sampleReception_samplesWhereFieldsName}from"../03config/config-process.js";class processUsSampleReception extends ApiSample(FrontendSample(connect(store)(PolymerElement))){static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedSample:Number,unReceivedSamples:{type:Array,notify:!0},sampleReceptionSampleFieldToDisplay:{type:Array,value:sampleReception_sampleFieldToDisplay},selectedObject:Object,actionCode:Object}}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.processUs){this.unReceivedSamples=state.processUs.unReceivedSamples}this.schemaPrefix=schema_name}static get template(){return html`
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
let selectedSampleLocal=e.detail.value.sample_id;this.selectedSample=selectedSampleLocal;var actionName="RECEIVESAMPLE",paramsUrl="actionName="+actionName+"&finalToken="+this.finalToken+"&sampleId="+this.selectedSample+"&schemaPrefix="+this.schemaPrefix,datas=[];datas.schemaPrefix=this.schemaPrefix;datas.actionName=actionName;datas.selectedSample=this.selectedSample;datas.paramsUrl=paramsUrl;datas.callBackFunction=this.sampleReceivedSuccess.bind(this);this.sampleBackEndCall(datas)}refreshTable(){this.onFinalTokenFilled()}sampleReceivedSuccess(){this.refreshTable();var datas=[];datas.receivedSample=datas.selectedSample;store.dispatch(receivedSamplesInSession(datas))}onFinalTokenFilled(){if(!this.finalToken||!this.schemaPrefix){return}//        console.log('process-us-sample-reception >> onFinalTokenFilled', this.finalToken, this.schemaPrefix);
this.getUnreceivedSamples({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"UNRECEIVESAMPLES_LIST",sampleFieldToRetrieve:sampleReception_sampleFieldToRetrieve,whereFieldsName:sampleReception_samplesWhereFieldsName,whereFieldsValue:sampleReception_samplesWhereFieldsValue,sortFieldsName:sampleReception_sampleFieldToSort});//this.actionCode = this.itemSelected.bind(this);
}}customElements.define("process-us-sample-reception",processUsSampleReception);