define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../../node_modules/@polymer/paper-button/paper-button.js","../../../internalComponents/cards/card-form.js","../../../internalComponents/grid-components/vaadingrid-singleselect.js","../01moduleFunctionality/env-monit-elements-sample.js","./shared-styles.js","../../../../config/styles/cards-style.js","../01moduleFunctionality/frontend-env-monit-sample.js","./em-demo-a-batches.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_paperButton,_cardForm,_vaadingridSingleselect,_envMonitElementsSample,_sharedStyles,_cardsStyle,_frontendEnvMonitSample,_emDemoABatches,_configProcess){"use strict";class emDemoASampleIncubBatch extends(0,_frontendEnvMonitSample.FrontendEnvMonitSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){static get properties(){return{finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},currTabEsignRequired:Boolean,currTabConfirmUserRequired:Boolean,selectedSample:{type:Number},Incubation1Buttons:{type:Array,value:_configProcess.sampleIncubation1_incubBatch_buttons},sampleIncubation1FieldToDisplay:{type:Array,value:_configProcess.sampleIncubation1_incubBatch_sampleFieldToDisplay},samplesIncubation1WhereFieldsName:{type:String,value:_configProcess.sampleIncubation1_incubBatch_samplesWhereFieldsName},samplesIncubation1WhereFieldsValue:{type:String,value:_configProcess.sampleIncubation1_incubBatch_samplesWhereFieldsValue},Incubation2Buttons:{type:Array,value:_configProcess.sampleIncubation2_incubBatch_buttons},sampleIncubation2FieldToDisplay:{type:Array,value:_configProcess.sampleIncubation2_incubBatch_sampleFieldToDisplay},samplesWhereFieldsName:{type:String,value:_configProcess.sampleIncubation2_incubBatch_samplesWhereFieldsName},samplesWhereFieldsValue:{type:String,value:_configProcess.sampleIncubation2_incubBatch_samplesWhereFieldsValue},buttons:{type:Array,value:_configProcess.sampleIncubation2_incubBatch_buttons},selectedBatch:{type:Object},callBackRefreshWindow:Object}}refreshWindow(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);if(!this.finalToken||!this.schemaPrefix){return}this.getAllSamplesStageIncubation2({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"SAMPLES_BY_STAGE",sampleFieldToRetrieve:_configProcess.sampleIncubation2_incubBatch_sampleFieldToRetrieve//this.sampleFieldToRetrieve
,samplesTabSortFields:_configProcess.sampleIncubation2_incubBatch_sampleFieldToSort//this.samplesTabSortFields,
,samplesWhereFieldsName:this.samplesWhereFieldsName,samplesWhereFieldsValue:this.samplesWhereFieldsValue});this.getAllSamplesStageIncubation1({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"SAMPLES_BY_STAGE",sampleFieldToRetrieve:_configProcess.sampleIncubation1_incubBatch_sampleFieldToRetrieve//this.sampleFieldToRetrieve
,samplesTabSortFields:_configProcess.sampleIncubation1_incubBatch_sampleFieldToSort//this.samplesTabSortFields,
,samplesWhereFieldsName:this.samplesIncubation1WhereFieldsName,samplesWhereFieldsValue:this.samplesIncubation1WhereFieldsValue})}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.allSamplesStageIncubation1=state.emDemoA.allSamplesStageIncubation1;this.allSamplesStageIncubation2=state.emDemoA.allSamplesStageIncubation2;this.selectedBatch=state.emDemoA.selectedBatch}if(0!=this.tabIndex){//this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
this.currTabEsignRequired=state.tabs.currTabEsignRequired;this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired}this.schemaPrefix=_configProcess.schema_name}//     createIncubatorsList(){
//         var i;
//         for (i = 0; i < this.allIncubators.length; i++) {
// //console.log('createProductionLotsList', 'this.productionLotsList', this.productionLotsList);
//             var newElement=[{"keyName":'', "keyValue_en":'',"keyValue_es":''}];
//             newElement.keyName=this.allIncubators[i].name;
//             newElement.keyValue_en=this.allIncubators[i].name;
//             newElement.keyValue_es=this.allIncubators[i].name;
//             this.incubationsList[i]=newElement;
//             //{keyName:"M1", :"M1", keyValue_es:"M1"},
//         }   
//         //console.log(this.productionLotsList); 
//         this.set('incubform.0.items', this.rolesList);    
//     }   
static get template(){return _polymerElement.html`
            <style include="cards-style"></style>
            <style>            
            :host {
                display: block;
                padding: 10px;
            }
            .buttonGroup {
                /* display: flex */
            }
            vaadin-grid {
                width:95%;
            }
            </style>  
            <env-monit-elements-sample id="myElementsSample" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements-sample>  	
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
            <div style="display: flex">
                <div style="display: inline-table">
                    <div name="Incubation1Buttons" style="width: 622px; display: inline-flex;" class="buttonGroup">
                        <template is="dom-repeat" items="{{Incubation1Buttons}}" as="currentfield">       
                            <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                            on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                            </field-controller>
                        </template>  
                    </div>            
                    <vaadingrid-singleselect id="Incubation1" style="width: 83%;" headerfields="{{sampleIncubation1FieldToDisplay}}" rowcontainer="{{allSamplesStageIncubation1}}"            
                    selected-object="{{selectedObject}}"></vaadingrid-singleselect>

                    <div name="Incubation2Buttons" style="width: 622px; display: inline-flex;" class="buttonGroup">
                        <template is="dom-repeat" items="{{Incubation2Buttons}}" as="currentfield">       
                            <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                            on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                            </field-controller>
                        </template>  
                    </div>          
                    <vaadingrid-singleselect id="Incubation2" style="width: 83%;" headerfields="{{sampleIncubation2FieldToDisplay}}" rowcontainer="{{allSamplesStageIncubation2}}"            
                    selected-object="{{selectedObject}}"></vaadingrid-singleselect>
                </div>    
                <div>           
                    <em-demo-a-batches></em-demo-a-batches>
                </div>                       
            </div>   
            `}}customElements.define("em-demo-a-sample-incub-batch",emDemoASampleIncubBatch)});