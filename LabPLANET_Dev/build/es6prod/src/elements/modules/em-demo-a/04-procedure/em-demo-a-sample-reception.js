define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../internalComponents/grid-components/vaadingrid-singleselectrunaction.js","../01moduleFunctionality/frontend-env-monit-sample.js","../01moduleFunctionality/api-env-monit.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_vaadingridSingleselectrunaction,_frontendEnvMonitSample,_apiEnvMonit,_configProcess){"use strict";//import './shared-styles.js';
// import '@vaadin/vaadin-grid';
// import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
// import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
// import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
// import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 
//import '../../internalComponents/grid-components/vaadingrid-singleselect';
class emDemoASampleReception extends(0,_apiEnvMonit.EmDemoAapiEnvMonit)((0,_frontendEnvMonitSample.FrontendEnvMonitSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedSample:Number,allProgramsUnreceivedSamples:{type:Array,notify:!0},sampleReceptionSampleFieldToDisplay:{type:Array,value:_configProcess.sampleReception_sampleFieldToDisplay},selectedObject:Object,actionCode:Object}}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.allProgramsUnreceivedSamples=state.emDemoA.allProgramsUnreceivedSamples}//        if (this.tabIndex!=0){
//            this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;}  
this.schemaPrefix=_configProcess.schema_name}static get template(){return _polymerElement.html`
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
                rowcontainer="{{allProgramsUnreceivedSamples}}" selected-object="{{selectedObject}}"
                on-selected-object-changed="itemSelected">
            </vaadingrid-singleselectrunaction>

<!--            <vaadingrid-singleselect id="mygridid" headerfields="{{sampleReceptionSampleFieldToDisplay}}" 
                rowcontainer="{{allProgramsUnreceivedSamples}}"            
                >
            </vaadingrid-singleselect>



            <vaadin-grid id="mygridid" items="{{allProgramsUnreceivedSamples}}" on-selected-items-changed="itemSelected">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{sampleReceptionSampleFieldToDisplay}}" as="fld">
                    <vaadin-grid-sort-column path="{{fld}}" header="{{fld}}"></vaadin-grid-sort-column>
                </template>
            </vaadin-grid>            
-->
        `}itemSelected(e){let selectedSampleLocal=e.detail.value.sample_id;this.selectedSample=selectedSampleLocal;var actionName="RECEIVESAMPLE",paramsUrl="actionName="+actionName+"&actionName="+actionName+"&finalToken="+this.finalToken+"&sampleId="+this.selectedSample+"&schemaPrefix="+this.schemaPrefix,datas=[];datas.schemaPrefix=this.schemaPrefix;datas.actionName=actionName;datas.actionName=actionName,datas.selectedSample=this.selectedSample;datas.paramsUrl=paramsUrl;datas.callBackFunction=this.refreshTable.bind(this);this.sampleBackEndCallAPI(datas)}refreshTable(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}onFinalTokenFilled(){if(!this.finalToken||!this.schemaPrefix){return}console.log("em-demo-a-sample-reception >> onFinalTokenFilled",this.finalToken,"this.schemaPrefix",this.schemaPrefix);this.getAllProgramsUnreceivedSamples({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"UNRECEIVESAMPLES_LIST",sampleFieldToRetrieve:_configProcess.sampleReception_sampleFieldToRetrieve,whereFieldsName:_configProcess.sampleReception_samplesWhereFieldsName,whereFieldsValue:_configProcess.sampleReception_samplesWhereFieldsValue,sortFieldsName:_configProcess.sampleReception_sampleFieldToSort});//this.actionCode = this.itemSelected.bind(this);
}}customElements.define("em-demo-a-sample-reception",emDemoASampleReception)});