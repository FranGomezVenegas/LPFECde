import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../../store.js";import"../../../../../config/styles/cards-style.js";import{addTab,setCurrentTab}from"../../../../app/Redux/actions/tabs_actions.js";import{FrontendEnvMonitSample}from"../../01moduleFunctionality/frontend-env-monit-sample.js";//import '../../internalComponents/pdf-browser-viewer';
import{schema_name,browserBatchFieldToRetrieve,browserBatchFieldsToDisplay}from"../../03config/config-process.js";class emDemoABrBatch extends FrontendEnvMonitSample(connect(store)(PolymerElement)){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){if(null!=state.emDemoA.browserSelectedBatch){this.selBatch=state.emDemoA.browserSelectedBatch;//console.log('this.selBatch', this.selBatch);
if(null!=this.selBatch.lastTemperatureReadings){var i;this.selBatchTempReadings=[["Time","Temperature"]];for(i=0;i<this.selBatch.lastTemperatureReadings.length;i++){this.selBatchTempReadings.push([this.selBatch.lastTemperatureReadings[i].created_on,this.selBatch.lastTemperatureReadings[i].temperature])}this.selectedObject=this.selBatch.incubatorFieldToRetrieve.name;//console.log('this.selBatchTempReadings', this.selBatchTempReadings);
}}}this.schemaPrefix=schema_name}static get properties(){return{finalToken:{type:String},schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedLanguage:String,selBatchTempReadings:{type:Array},selBatchName:{type:Number,value:"Tanda4"},selBatch:{type:Object},browserBatchFieldToRetrieve:{type:String,value:browserBatchFieldToRetrieve},browserBatchFieldsToDisplay:{type:String,value:browserBatchFieldsToDisplay},goToStageButton:{type:Array,Object,notify:!0,value:{name:"buttonAccess",label_en:"Go",label_es:"Ir",type:"button",value:"",read_only:!1}},browserBatchFields:{type:Array,notify:!0,value:[{name:"BatchName",label_en:"Batch",label_es:"Tanda",type:"text",password:"false",value:"Tanda4",read_only:!1},{name:"RunReport",label_en:"Report",label_es:"Informe",type:"button",value:"",read_only:!1}]}}}static get template(){return html`
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

        <div id="wrapper"> <!--This is the Div 1 in the picture-->        
        <template is="dom-repeat" items="{{browserBatchFields}}" as="currentfield">       
          <field-controller on-keydown="keyPressed" on-field-button-clicked="RunReport" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>       
            <div id="topBar">            
                <div class="cardPendingSops"> 
                <p><h2><b>Sample Info</h2></p>
                {{selBatch.batchFieldsToDisplay.length}}
                <template is="dom-repeat" items="[[selBatch.batchFieldsToDisplay]]">  
                <p><b>{{item.field_name}}:</b> {{item.field_value}}<p></p>
                </template>
                </div>
            </div>     
            <div id="topBar">                   
                <template is="dom-repeat" items="{{selBatch.SAMPLES_ARRAY}}" as="currentfield"> 
                    <div class="cardMySops"> 
                        {{currentfield.sample_id}} Incubation {{currentfield.incubation_moment}}
                    </div>
                </template>

                <google-chart type="line" style="height: 500px; width: 750px;" data="{{selBatchTempReadings}}"></google-chart>
            </div>     

        `}isIncubationStage(st){if("Incubation"==st.current_stage)return!0;return!1}isTheCurrentStage(st){//console.log('current stage', st.current_stage, 'this.selBatch.currentStage', this.selBatch.sampleFieldToRetrieve.current_stage);
if(st.current_stage==this.selBatch.sampleFieldToRetrieve.current_stage)return!0;return!1}displayStageFld(st,currFld){if(!currFld)return!1;if(!currFld.field_name)return!1;if("PlateReading"==st.current_stage){if("raw_value"==currFld.field_name){return!0}return!1}if("MicroorganismIdentification"==st.current_stage){if("microorganism_list"==currFld.field_name){return!0}return!1}if("Incubation"==st.current_stage){if(""==currFld.field_name)return!1}return!0}keyPressed(e){if(e.code.includes("Enter")){this.RunReport();return}}RunReport(){var data=[];data.finalToken=this.finalToken;data.schemaPrefix=this.schemaPrefix;data.BatchName=this.browserBatchFields[0].value;data.browserBatchFieldToRetrieve=this.browserBatchFieldToRetrieve;data.browserBatchFieldsToDisplay=this.browserBatchFieldsToDisplay;this.getBrowserSelectedBatchData(data);//console.log('RunReport', 'browserBatchFields', this.browserBatchFields);
}openTab(){//console.log('openTab > '+this.schemaPrefix+ '-' + this.selBatch.currentStage);
var procObj={name:this.schemaPrefix},pageForStage="";switch(this.selBatch.sampleFieldToRetrieve.current_stage){case"Sampling":pageForStage="sampling";break;case"Incubation":pageForStage="incub-batch";break;case"Incubation":pageForStage="incub-batch";break;case"PlateReading":pageForStage="plate-reading";break;case"MicroorganismIdentification":pageForStage="microorganism";break;default:break;}store.dispatch(addTab({lp_frontend_page_name:"sample-"+pageForStage,tabName:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_en:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_es:this.schemaPrefix+"-"+"sample-"+pageForStage,procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));var curTab=[];curTab.tabName=procObj.name+"-"+"sample-"+pageForStage;curTab.currTabEsignRequired=!1;curTab.currTabConfirmUserRequired=!1;curTab.sops=procObj.sops;store.dispatch(setCurrentTab(curTab))}}customElements.define("em-demo-a-br-batch",emDemoABrBatch);