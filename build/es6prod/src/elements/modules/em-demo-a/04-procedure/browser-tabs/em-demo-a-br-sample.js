define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../../store.js","../../../../../config/styles/cards-style.js","../../../../app/Redux/actions/tabs_actions.js","../../01moduleFunctionality/frontend-env-monit-sample.js","../../00jsonFake/browser.js","../../03config/tablefield_labels.js","../../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_cardsStyle,_tabs_actions,_frontendEnvMonitSample,_browser,_tablefield_labels,_configProcess){"use strict";//import '../../internalComponents/pdf-browser-viewer';
class emDemoABrSample extends(0,_tablefield_labels.tableFieldLabel)((0,_frontendEnvMonitSample.FrontendEnvMonitSample)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.selectedProgram=state.emDemoA.selectedProgram;if(null!=state.emDemoA.browserSelectedSample){this.selSample=state.emDemoA.browserSelectedSample}}this.schemaPrefix=_configProcess.schema_name;this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{finalToken:{type:String},schemaPrefix:{type:String},selectedLanguage:String,selSampleId:{type:Number,value:273},selSample:{type:Object},browserSampleFieldToRetrieve:{type:String,value:_configProcess.browserSampleFieldToRetrieve},browserSampleFieldsToDisplay:{type:String,value:_configProcess.browserSampleFieldsToDisplay},goToStageButton:{type:Array,Object,notify:!0,value:{name:"buttonAccess",label_en:"Go",label_es:"Ir",type:"button",value:"",read_only:!1}},sampleBrowserFields:{type:Array,notify:!0,value:[{name:"SampleId",label_en:"Sample",label_es:"Muestra",type:"text",password:"false",value:"273",read_only:!1},{name:"RunReport",label_en:"Report",label_es:"Informe",type:"button",value:"",read_only:!1}]},tableFieldLabelSchemaName:{type:String,value:"data"},tableFieldLabelTableName:{type:String,value:"Sample"}}}static get template(){return _polymerElement.html`
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
        <template is="dom-repeat" items="{{sampleBrowserFields}}" as="currentfield">       
          <field-controller on-keydown="keyPressed" on-field-button-clicked="RunReport" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>       
            <div id="topBar">            
                <div class="cardPendingSops"> 
                <p><h2><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, '*sample_info_title', selectedLanguage)}}</h2></p>
                <template is="dom-repeat" items="[[selSample.sampleFieldsToDisplay]]">  
                    <p><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, item.field_name, selectedLanguage)}}:</b> {{valueTranslation(tableFieldLabelSchemaName, tableFieldLabelTableName, item.field_value, selectedLanguage)}}<p></p>
                </template>
                </div>
            </div>
            <div id="central"> 
                <template is="dom-repeat" items="[[selSample.stages]]" as="stage">  
                    <div class="cardPendingSops"> 
                        <p><h2><b>{{stageTitle(tableFieldLabelSchemaName, tableFieldLabelTableName, stage, selectedLanguage)}}</h2> {{stage.started_on}} >> {{stage.ended_on}}   </b></p>                        
                        <template is="dom-if" if="{{isTheCurrentStage(stage)}}">                        
                            <field-controller id="OpenStage"  field="{{goToStageButton}}" value="{{item}}"
                                on-field-button-clicked="openTab" 
                                selected-Object="[[item]]"> 
                            </field-controller>
                        </template>            
                        <template is="dom-if" if="{{isIncubationStage(stage)}}">  
                            <div id="incub1" class="cardPendingSops"> 
                                <p><h2><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, '*sample_stage_Incubation1_title', selectedLanguage)}}</h2></p>
                                <template is="dom-repeat" items="[[stage.data.0.incubation_1]]" as="incub1item">  
                                    <template is="dom-if" if="{{displayStageFld(stage, incub1item)}}"> 
                                        <p><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, incub1item.field_name, selectedLanguage)}}:</b> {{valueTranslation(tableFieldLabelSchemaName, tableFieldLabelTableName, incub1item.field_value, selectedLanguage)}}<p></p>
                                    </template>
                                </template>
                            </div>
                            <div id="incub2" class="cardPendingSops"> 
                                <p><h2><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, '*sample_stage_Incubation2_title', selectedLanguage)}}</h2></p>
                                <template is="dom-repeat" items="[[stage.data.0.incubation_2]]" as="incub2item">  
                                    <template is="dom-if" if="{{displayStageFld(stage, incub2item)}}"> 
                                        <p><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, incub2item.field_name, selectedLanguage)}}:</b> {{valueTranslation(tableFieldLabelSchemaName, tableFieldLabelTableName, incub2item.field_value, selectedLanguage)}}<p></p>
                                    </template>    
                                </template>
                            </div>
                        </template>
                        <template is="dom-if" if="{{!isIncubationStage(stage)}}">    
                            <template is="dom-repeat" items="[[stage.data]]">  
                                <template is="dom-if" if="{{displayStageFld(stage, item)}}"> 
                                    <p><b>{{getTableFieldLabel(tableFieldLabelSchemaName, tableFieldLabelTableName, item.field_name, selectedLanguage)}}:</b> {{valueTranslation(tableFieldLabelSchemaName, tableFieldLabelTableName, item.field_value, selectedLanguage)}}<p></p>
                                </template>    
                            </template>
                        </template>
                    </div>
                </template>            
            </div><!--Closing "central"-->            
        </div>
        `}isIncubationStage(st){if("Incubation"==st.current_stage)return!0;return!1}isTheCurrentStage(st){console.log("current stage",st.current_stage,"this.selSample.currentStage",this.selSample.sampleFieldToRetrieve.current_stage);if(st.current_stage==this.selSample.sampleFieldToRetrieve.current_stage)return!0;return!1}displayStageFld(st,currFld){if(!currFld)return!1;if(!currFld.field_name)return!1;if("PlateReading"==st.current_stage){if("raw_value"==currFld.field_name){return!0}return!1}if("MicroorganismIdentification"==st.current_stage){if("microorganism_list"==currFld.field_name){return!0}return!1}if("Incubation"==st.current_stage){if(""==currFld.field_name)return!1}return!0}keyPressed(e){if(e.code.includes("Enter")){this.RunReport();return}}RunReport(){var data=[];data.finalToken=this.finalToken;data.schemaPrefix=this.schemaPrefix;data.sampleId=this.sampleBrowserFields[0].value;data.browserSampleFieldToRetrieve=this.browserSampleFieldToRetrieve;data.browserSampleFieldsToDisplay=this.browserSampleFieldsToDisplay;this.getBrowserSelectedSampleData(data);console.log("RunReport","sampleBrowserFields",this.sampleBrowserFields)}openTab(){//console.log('openTab > '+this.schemaPrefix+ '-' + this.selSample.currentStage);
var procObj={name:this.schemaPrefix},pageForStage="";switch(this.selSample.sampleFieldToRetrieve.current_stage){case"Sampling":pageForStage="sampling";break;case"Incubation":pageForStage="incub-batch";break;case"Incubation":pageForStage="incub-batch";break;case"PlateReading":pageForStage="plate-reading";break;case"MicroorganismIdentification":pageForStage="microorganism";break;default:break;}_store.store.dispatch((0,_tabs_actions.addTab)({lp_frontend_page_name:"sample-"+pageForStage,tabName:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_en:this.schemaPrefix+"-"+"sample-"+pageForStage,tabLabel_es:this.schemaPrefix+"-"+"sample-"+pageForStage,procedure:procObj,tabEsignRequired:!1,tabConfirmUserRequired:!1}));var curTab=[];curTab.tabName=procObj.name+"-"+"sample-"+pageForStage;curTab.currTabEsignRequired=!1;curTab.currTabConfirmUserRequired=!1;curTab.sops=procObj.sops;_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab))}}customElements.define("em-demo-a-br-sample",emDemoABrSample)});