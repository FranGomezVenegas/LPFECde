import{PolymerElement,html}from"../../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../../store.js";import"../../../../../config/styles/cards-style.js";import{addTab,setCurrentTab}from"../../../../app/Redux/actions/tabs_actions.js";import{FrontendEnvMonitSample}from"../../01moduleFunctionality/frontend-env-monit-sample.js";import{EmDemoAapiEnvMonit}from"../../01moduleFunctionality/api-env-monit.js";import"../../01moduleFunctionality/env-monit-elements.js";import{tableFieldLabel}from"../../03config/tablefield_labels.js";//import '../../internalComponents/pdf-browser-viewer';
import{schema_name,browserIncubatorFieldToRetrieve,browserIncubatorFieldsToDisplay,browserIncubator_buttons}from"../../03config/config-process.js";class emDemoABrIncubator extends tableFieldLabel(EmDemoAapiEnvMonit(FrontendEnvMonitSample(connect(store)(PolymerElement)))){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){if(null!=state.emDemoA.browserSelectedIncubator){this.selIncubator=state.emDemoA.browserSelectedIncubator;if(null!=this.selIncubator.lastTemperatureReadings){var i;this.selIncubatorLastNtempReadings=[["Time","Temperature"]];for(i=0;i<this.selIncubator.lastTemperatureReadings.length;i++){this.selIncubatorLastNtempReadings.push([this.selIncubator.lastTemperatureReadings[i].created_on,this.selIncubator.lastTemperatureReadings[i].temperature])}this.selectedObject=this.selIncubator.incubatorFieldToRetrieve.name;//console.log('this.selIncubatorLastNtempReadings', this.selIncubatorLastNtempReadings);
}}}this.schemaPrefix=schema_name;this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{buttons:{type:String,value:browserIncubator_buttons},finalToken:{type:String},schemaPrefix:{type:String},selectedLanguage:String,selIncubatorName:{type:Number,value:"INC_1"},selIncubator:{type:Object},selectedObject:{type:Object},selIncubatorLastNtempReadings:{type:Array},browserIncubatorFieldToRetrieve:{type:String,value:browserIncubatorFieldToRetrieve},browserIncubatorFieldsToDisplay:{type:String,value:browserIncubatorFieldsToDisplay},goToStageButton:{type:Array,Object,notify:!0,value:{name:"buttonAccess",label_en:"Go",label_es:"Ir",type:"button",value:"",read_only:!1}},incubationBrowserFields:{type:Array,notify:!0,value:[{name:"incubName",label_en:"Incubator",label_es:"Incubadora",type:"text",password:"false",value:"INC_1",read_only:!1},{name:"dateFrom",label_en:"Date From",label_es:"De Fecha",type:"date",password:"False",value:"",read_only:!1},{name:"dateTo",label_en:"Date To",label_es:"A Fecha",type:"date",password:"false",value:"",read_only:!1},{name:"RunReport",label_en:"Report",label_es:"Informe",type:"button",value:"",read_only:!1}]},tableFieldLabelSchemaName:{type:String,value:"config"},tableFieldLabelTableName:{type:String,value:"Incubator"}}}static get template(){return html`
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
        <template is="dom-repeat" items="{{incubationBrowserFields}}" as="currentfield">       
          <field-controller on-keydown="keyPressed" on-field-button-clicked="RunReport" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>     
        <div name="browserIncubatorButtons" class="buttonGroup">
            <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                <field-controller id="{{currentfield.name}}"  field="{{currentfield}}" selected-object="{{selIncubator}}"
                on-field-button-clicked="incubatorFieldButtonClicked" on-field-list-value-changed="onListChange"> 
                </field-controller>
            </template>  
        </div>            

            <div id="topBar">            
                <div class="cardPendingSops"> 
                <p><h2><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, '*incubator_info_title', selectedLanguage)}}</h2></p>
                <template is="dom-repeat" items="[[selIncubator.incubatorFieldsToDisplay]]">  
                    <p><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, item.field_name, selectedLanguage)}}:</b> {{item.field_value}}<p></p>
                </template>
                </div>
            </div>

            <div id="central"> 
            
                <google-chart type="line" style="height: 500px; width: 750px;" data="{{selIncubatorLastNtempReadings}}"></google-chart>
            </div> 

<!--            <div id="central"> 
                <template is="dom-repeat" items="[[selIncubator.stages]]" as="stage">  
                    <div class="cardPendingSops"> 
                        <p><h2><b>{{stage.current_stage}}</h2> {{stage.started_on}} >> {{stage.ended_on}}   </b></p>                        
                        <template is="dom-if" if="{{isTheCurrentStage(stage)}}">                        
                            <field-controller id="OpenStage"  field="{{goToStageButton}}" value="{{item}}"
                                on-field-button-clicked="openTab" 
                                selected-Object="[[item]]"> 
                            </field-controller>
                        </template>            
                        <template is="dom-if" if="{{isIncubationStage(stage)}}">  
                            <div id="incub1" class="cardPendingSops"> 
                                <p><h2><b>Incubation 1</h2></p>
                                <template is="dom-repeat" items="[[stage.data.0.incubation_1]]" as="incub1item">  
                                    <template is="dom-if" if="{{displayStageFld(stage, incub1item)}}"> 
                                        <p><b>{{incub1item.field_name}}:</b> {{incub1item.field_value}}<p></p>
                                    </template>
                                </template>
                            </div>
                            <div id="incub2" class="cardPendingSops"> 
                                <p><h2><b>Incubation 2</h2></p>
                                <template is="dom-repeat" items="[[stage.data.0.incubation_2]]" as="incub2item">  
                                    <template is="dom-if" if="{{displayStageFld(stage, incub2item)}}"> 
                                        <p><b>{{incub2item.field_name}}:</b> {{incub2item.field_value}}<p></p>
                                    </template>    
                                </template>
                            </div>
                        </template>
                        <template is="dom-if" if="{{!isIncubationStage(stage)}}">    
                            <template is="dom-repeat" items="[[stage.data]]">  
                                <template is="dom-if" if="{{displayStageFld(stage, item)}}"> 
                                    <p><b>{{item.field_name}}:</b> {{item.field_value}}<p></p>
                                </template>    
                            </template>
                        </template>
                    </div>
                </template>            
            </div>-->            
        </div>
        `}isIncubationStage(st){if("Incubation"==st.current_stage)return!0;return!1}isTheCurrentStage(st){//console.log('current stage', st.current_stage, 'this.selIncubator.currentStage', this.selIncubator.sampleFieldToRetrieve.current_stage);
if(st.current_stage==this.selIncubator.sampleFieldToRetrieve.current_stage)return!0;return!1}displayStageFld(st,currFld){if(!currFld)return!1;if(!currFld.field_name)return!1;if("PlateReading"==st.current_stage){if("raw_value"==currFld.field_name){return!0}return!1}if("MicroorganismIdentification"==st.current_stage){if("microorganism_list"==currFld.field_name){return!0}return!1}if("Incubation"==st.current_stage){if(""==currFld.field_name)return!1}return!0}keyPressed(e){if(e.code.includes("Enter")){this.RunReport();return}}RunReport(){var data=[];data.finalToken=this.finalToken;data.schemaPrefix=this.schemaPrefix;data.incubName=this.incubationBrowserFields[0].value;data.browserIncubatorFieldToRetrieve=this.browserIncubatorFieldToRetrieve;data.browserIncubatorFieldsToDisplay=this.browserIncubatorFieldsToDisplay;if(0<this.incubationBrowserFields[1].value.length){data.startDate=this.incubationBrowserFields[1].value}if(0<this.incubationBrowserFields[2].value.length){data.endDate=this.incubationBrowserFields[2].value}this.getBrowserSelectedIncubatorData(data);console.log("RunReport","data",data)}openTab(){//console.log('openTab > '+this.schemaPrefix+ '-' + this.selIncubator.currentStage);
var procObj={name:this.schemaPrefix},pageForStage="";switch(this.selIncubator.sampleFieldToRetrieve.current_stage){case"Sampling":pageForStage="sampling";break;case"Incubation":pageForStage="incub-batch";break;case"Incubation":pageForStage="incub-batch";break;case"PlateReading":pageForStage="plate-reading";break;case"MicroorganismIdentification":pageForStage="microorganism";break;default:break;}store.dispatch(addTab({lp_frontend_page_name:"sample-"+pageForStage,tabName:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_en:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_es:this.schemaPrefix+"-"+"sample-"+pageForStage,procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));var curTab=[];curTab.tabName=procObj.name+"-"+"sample-"+pageForStage;curTab.currTabEsignRequired=!1;curTab.currTabConfirmUserRequired=!1;curTab.sops=procObj.sops;store.dispatch(setCurrentTab(curTab))}}customElements.define("em-demo-a-br-incubator",emDemoABrIncubator);