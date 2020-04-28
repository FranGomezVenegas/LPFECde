import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";//import './shared-styles.js';
import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";// import '@vaadin/vaadin-grid';
// import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
// import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
// import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
// import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 
import"../../../internalComponents/grid-components/vaadingrid-singleselectrunaction.js";//import '../../internalComponents/grid-components/vaadingrid-singleselect';
import"../01moduleFunctionality/env-monit-elements-sample.js";import{FrontendEnvMonitSample}from"../01moduleFunctionality/frontend-env-monit-sample.js";import{EmDemoAapiEnvMonit}from"../01moduleFunctionality/api-env-monit.js";import{schema_name,personSampling_sampleFieldToRetrieve,personSampling_sampleFieldToDisplay,personSampling_sampleFieldToSort,personSampling_samplesWhereFieldsValue,personSampling_samplesWhereFieldsName,personSampling_buttons}from"../03config/config-process.js";import{FieldsMethods}from"../../../app/app-functions/fields-methods.js";class emDemoAPersonSampling extends FieldsMethods(EmDemoAapiEnvMonit(FrontendEnvMonitSample(connect(store)(PolymerElement)))){static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedSample:Number,allPersonSamplesStageSampling:{type:Array,notify:!0},sampleSamplingSampleFieldToDisplay:{type:Array,value:personSampling_sampleFieldToDisplay},selectedObject:Object,actionCode:Object,SamplingButtons:{type:String,value:personSampling_buttons},callBackRefreshWindow:Object}}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.allPersonSamplesStageSampling=state.emDemoA.allPersonSamplesStageSampling}//        if (this.tabIndex!=0){
//            this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;}  
this.schemaPrefix=schema_name}static get template(){return html`
            <style include="shared-styles">
            :host {
                display: block;    
                padding: 10px;
                left: 2px;
            }
            .buttonGroup {
                display: flex
            }
            divgrid {
                length: 90%;
                width:75%;
            }
            </style>                
            <env-monit-elements-sample id="myElementsSample" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements-sample>  	
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button>
            <div name="SamplingButtons" class="buttonGroup">
                    <template is="dom-repeat" items="{{SamplingButtons}}" as="currentfield">       
                        <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                        on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                        </field-controller>
                    </template>  
            </div>            

            <vaadingrid-singleselectrunaction id="mygridid" headerfields="{{sampleSamplingSampleFieldToDisplay}}" 
                rowcontainer="{{allPersonSamplesStageSampling}}" selected-object="{{selectedObject}}">
            </vaadingrid-singleselectrunaction>

<!--            <vaadingrid-singleselect id="mygridid" headerfields="{{sampleSamplingSampleFieldToDisplay}}" 
                rowcontainer="{{allPersonSamplesStageSampling}}"            
                >
            </vaadingrid-singleselect>



            <vaadin-grid id="mygridid" items="{{allPersonSamplesStageSampling}}" on-selected-items-changed="itemSelected">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{sampleSamplingSampleFieldToDisplay}}" as="fld">
                    <vaadin-grid-sort-column path="{{fld}}" header="{{fld}}"></vaadin-grid-sort-column>
                </template>
            </vaadin-grid>            
-->
        `}itemSelected(e){let selectedSampleLocal=e.detail.value.sample_id;this.selectedSample=selectedSampleLocal;var actionName="CHANGESAMPLINGDATE",paramsUrl="actionName="+actionName+"&actionName="+actionName+"&finalToken="+this.finalToken+"&sampleId="+this.selectedSample+"&newDate="+this.todayYYYYMMDD()+"&schemaPrefix="+this.schemaPrefix,datas=[];datas.schemaPrefix=this.schemaPrefix;datas.actionName=actionName;datas.actionName=actionName,datas.selectedSample=this.selectedSample;datas.paramsUrl=paramsUrl;datas.callBackFunction=this.refreshWindow.bind(this);this.sampleBackEndCallAPI(datas)}refreshWindow(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);if(!this.finalToken||!this.schemaPrefix){return}//console.log('em-demo-a-person-sampling >> onFinalTokenFilled', this.finalToken, 'this.schemaPrefix', this.schemaPrefix);
this.getAllPersonSamplesStageSampling({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"SAMPLES_BY_STAGE",sampleFieldToRetrieve:personSampling_sampleFieldToRetrieve,samplesWhereFieldsName:personSampling_samplesWhereFieldsName,samplesWhereFieldsValue:personSampling_samplesWhereFieldsValue,samplesSortFieldsName:personSampling_sampleFieldToSort});//this.actionCode = this.itemSelected.bind(this);
}}customElements.define("em-demo-a-person-sampling",emDemoAPersonSampling);