define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../../store.js","../../../../../../node_modules/@polymer/polymer/lib/elements/dom-if.js","../../../../../config/styles/cards-style.js","../../../../app/Redux/actions/tabs_actions.js","../../01moduleFunctionality/frontend-env-monit-sample.js","../../03config/tablefield_labels.js","../../01moduleFunctionality/env-monit-elements.js","../../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_domIf,_cardsStyle,_tabs_actions,_frontendEnvMonitSample,_tablefield_labels,_envMonitElements,_configProcess){"use strict";//import '../../internalComponents/pdf-browser-viewer';
class emDemoABrBatch extends(0,_tablefield_labels.tableFieldLabel)((0,_frontendEnvMonitSample.FrontendEnvMonitSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){if(null!=state.emDemoA.browserSelectedBatch){this.selBatch=state.emDemoA.browserSelectedBatch;if(null!=this.selBatch.lastTemperatureReadings){var i;this.selBatchTempReadings=[["Time","Temperature"]];if(!this.selBatch.lastTemperatureReadings){this.displayChart=!1;return}if(this.selBatch.lastTemperatureReadings[0].error){this.displayChart=!1;return}this.displayChart=!0;for(i=0;i<this.selBatch.lastTemperatureReadings.length;i++){if(!this.selBatch.lastTemperatureReadings[i].error){this.selBatchTempReadings.push([this.selBatch.lastTemperatureReadings[i].created_on,this.selBatch.lastTemperatureReadings[i].temperature])}}this.selectedObject=this.selBatch.batchFieldToRetrieve.name}}}this.schemaPrefix=_configProcess.schema_name;this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{displayChart:Boolean,finalToken:{type:String},schemaPrefix:{type:String},selectedLanguage:String,selBatchTempReadings:{type:Array},selBatchName:{type:Number,value:"Tanda4"},selBatch:{type:Object},browserBatchFieldToRetrieve:{type:String,value:_configProcess.browserBatchFieldToRetrieve},browserBatchFieldsToDisplay:{type:String,value:_configProcess.browserBatchFieldsToDisplay},goToStageButton:{type:Array,Object,notify:!0,value:{name:"buttonAccess",label_en:"Go",label_es:"Ir",type:"button",value:"",read_only:!1}},browserBatchFields:{type:Array,notify:!0,value:[{name:"BatchName",label_en:"Batch",label_es:"Tanda",type:"text",password:"false",value:"Tanda4",read_only:!1},{name:"RunReport",label_en:"Report",label_es:"Informe",type:"button",value:"",read_only:!1}]},tableFieldLabelSchemaName:{type:String,value:"data"},tableFieldLabelTableName:{type:String,value:"Batch"},NoContent:{type:Array,notify:!0,value:_configProcess.browserBatchNoContent}}}static get template(){return _polymerElement.html`
        <style include="cards-style"></style>
        <style>
            #wraxxxpper
                {
                width:800px;
                background-color:#f2f2e8;
                position:relative;
                left:50%;
                margin-left:-400px;
                border-radius: 10px;
                -moz-border-radius: 10px;
                padding:5px;
                }
            #topBar
                {
                width:780px;
                border: 1px solid;
                border-color: #dbd9ca;
                border-radius: 10px;
                -moz-border-radius: 10px;
                margin:5px;
                padding:5px;
                }
            #central
                {
                width:780px;
                border: 1px solid;
                border-color: #dbd9ca;
                border-radius: 10px;
                -moz-border-radius: 10px;
                margin:5px;
                margin-top:20px;
                padding:5px;
                }  
        </style>
        <env-monit-elements id="myElements" call-back-function-env-monit-elem="{{RunReport}}"></env-monit-elements> 
        <div id="wrapper"> <!--This is the Div 1 in the picture-->        
        <template is="dom-repeat" items="{{browserBatchFields}}" as="currentfield">       
          <field-controller on-keydown="keyPressed" on-field-button-clicked="RunReport" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>       
            <div id="topBar">            
                <div class="cardPendingSops"> 
                    <p><h2><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, '*batch_info_title', selectedLanguage)}}</h2></p>
                    <template is="dom-repeat" items="[[selBatch.batchFieldsToDisplay]]">  
                        <p><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, item.field_name, selectedLanguage)}}:</b> {{item.field_value}}<p></p>
                    </template>
                </div>
            </div>     
            <div id="topBar">                   
                <template is="dom-repeat" items="{{selBatch.SAMPLES_ARRAY}}" as="currentfield"> 
                    <div class="cardMySops"> 
                        {{currentfield.sample_id}} Incubation {{currentfield.incubation_moment}}
                    </div>
                </template>
            </div>                
            <div id="topBar">                   
                <template is="dom-if" if="{{displayChart(selBatchTempReadings)}}" >
                    <google-chart type="line" style="height: 500px; width: 750px;" data="{{selBatchTempReadings}}"></google-chart>
                </template>    
                <template is="dom-if" if="{{!displayChart(selBatchTempReadings)}}" >
                    <template is="dom-repeat" items="{{NoContent}}" as="currentfield">       
                        <field-controller on-keydown="keyPressed" on-field-button-clicked="RunReport" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>                               
                </template>    
            </div>     

        `}//     displayChart(e){
//         console.log('displayChart');
// //        return false;
// //console.log('displayChart', this.selBatchTempReadings.length); 
//         if (!this.selBatchTempReadings) return false;       
//         if (this.selBatchTempReadings.length<=1) return false;
//         return true;
//     }
isIncubationStage(st){if("Incubation"==st.current_stage)return!0;return!1}isTheCurrentStage(st){//console.log('current stage', st.current_stage, 'this.selBatch.currentStage', this.selBatch.sampleFieldToRetrieve.current_stage);
if(st.current_stage==this.selBatch.sampleFieldToRetrieve.current_stage)return!0;return!1}displayStageFld(st,currFld){if(!currFld)return!1;if(!currFld.field_name)return!1;if("PlateReading"==st.current_stage){if("raw_value"==currFld.field_name){return!0}return!1}if("MicroorganismIdentification"==st.current_stage){if("microorganism_list"==currFld.field_name){return!0}return!1}if("Incubation"==st.current_stage){if(""==currFld.field_name)return!1}return!0}keyPressed(e){if(e.code.includes("Enter")){this.RunReport();return}}RunReport(){var data=[];data.finalToken=this.finalToken;data.schemaPrefix=this.schemaPrefix;data.BatchName=this.browserBatchFields[0].value;data.browserBatchFieldToRetrieve=this.browserBatchFieldToRetrieve;data.browserBatchFieldsToDisplay=this.browserBatchFieldsToDisplay;this.getBrowserSelectedBatchData(data);//console.log('RunReport', 'browserBatchFields', this.browserBatchFields);
}openTab(){//console.log('openTab > '+this.schemaPrefix+ '-' + this.selBatch.currentStage);
var procObj={name:this.schemaPrefix},pageForStage="";switch(this.selBatch.sampleFieldToRetrieve.current_stage){case"Sampling":pageForStage="sampling";break;case"Incubation":pageForStage="incub-batch";break;case"Incubation":pageForStage="incub-batch";break;case"PlateReading":pageForStage="plate-reading";break;case"MicroorganismIdentification":pageForStage="microorganism";break;default:break;}_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"sample-"+pageForStage,tabName:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_en:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_es:this.schemaPrefix+"-"+"sample-"+pageForStage,procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));var curTab=[];curTab.tabName=procObj.name+"-"+"sample-"+pageForStage;curTab.currTabEsignRequired=!1;curTab.currTabConfirmUserRequired=!1;curTab.sops=procObj.sops;_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab))}}customElements.define("em-demo-a-br-batch",emDemoABrBatch)});