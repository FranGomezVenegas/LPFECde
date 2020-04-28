import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../../store.js';
import '../../../../../config/styles/cards-style.js';
import {addTab, setCurrentTab} from '../../../../app/Redux/actions/tabs_actions';
import {FrontendEnvMonitSample} from '../../01moduleFunctionality/frontend-env-monit-sample.js';
import {EmDemoAapiEnvMonit} from '../../01moduleFunctionality/api-env-monit.js';
import '../../01moduleFunctionality/env-monit-elements.js';
import {tableFieldLabel} from '../../03config/tablefield_labels';
//import '../../internalComponents/pdf-browser-viewer';
import {schema_name, browserIncubatorFieldToRetrieve, browserIncubatorFieldsToDisplay, browserIncubator_buttons, browserIncubatorTemperatureReadingsNotFound } from '../../03config/config-process.js';

class emDemoABrIncubator extends tableFieldLabel(EmDemoAapiEnvMonit(FrontendEnvMonitSample(connect(store)(PolymerElement)))) {
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        this.schemaPrefix=schema_name;
        this.selectedLanguage=state.app.user.appLanguage;
        if (state.emDemoA!=null){
            if (state.emDemoA.browserSelectedIncubator){
                if (state.emDemoA.browserSelectedIncubator.incubatorFieldToRetrieve){
                    this.selectedObject=state.emDemoA.browserSelectedIncubator.incubatorFieldToRetrieve.name;}
                this.selIncubator=state.emDemoA.browserSelectedIncubator;
                this.selIncubatorLastNtempReadings=[];
                if (this.selIncubator.lastTemperatureReadings!=null){
                    var i;
                    this.selIncubatorLastNtempReadings=[["Time", "Temperature"]];
                    if (!this.selIncubator.lastTemperatureReadings){
                        this.displayChart=false;
                        return;}
                    if (this.selIncubator.lastTemperatureReadings[0].error){
                        this.displayChart=false;
                        return;}
                    this.displayChart=true;
                    for (i = 0; i < this.selIncubator.lastTemperatureReadings.length; i++) {
                        this.selIncubatorLastNtempReadings.push([this.selIncubator.lastTemperatureReadings[i].created_on, 
                        this.selIncubator.lastTemperatureReadings[i].temperature]);
                    }
                }                
            }            
        }        
    }        
    static get properties() {
        return {
            displayChart: Boolean,
            buttons:{type: String, value:browserIncubator_buttons},
            finalToken: {type: String},  
            schemaPrefix: {type: String},   
            selectedLanguage: String,
            selIncubatorName:{type: Number, value: 'INC_1'},
            selIncubator:{type: Object},
            selectedObject:{type: Object},
            selIncubatorLastNtempReadings:{type: Array},
            browserIncubatorFieldToRetrieve:{type: String, value: browserIncubatorFieldToRetrieve},
            browserIncubatorFieldsToDisplay:{type: String, value: browserIncubatorFieldsToDisplay},
            goToStageButton:{type: Array, Object, notify: true, value:
                {
                    "name": "buttonAccess",
                    "label_en": "Go", "label_es": "Ir",
                    "type": "button",              
                    "value": "",
                    "read_only": false
                  }
            },
            incubationBrowserFields:{type: Array, notify: true, value:[
                {
                    "name": "incubName",
                    "label_en": "Incubator", "label_es": "Incubadora",
                    "type": "text",
                    "password": "false",
                    "value": "INC_1",
                    "read_only": false
                },{
                    "name": "dateFrom",
                    "label_en": "Date From", "label_es": "De Fecha",
                    "type": "date",
                    "password": "False",
                    "value": "",
                    "read_only": false
                },{
                    "name": "dateTo",
                    "label_en": "Date To", "label_es": "A Fecha",
                    "type": "date",
                    "password": "false",
                    "value": "",
                    "read_only": false
                },{
                    "name": "RunReport",
                    "label_en": "Report", "label_es": "Informe",
                    "type": "button",              
                    "value": "",
                    "read_only": false
                }]
            },
            tableFieldLabelSchemaName: {type: String, value: 'config'}, tableFieldLabelTableName: {type: String, value: 'Incubator'},
            NoContent: {type: Array, notify: true, value:browserIncubatorTemperatureReadingsNotFound},
        }

    }
    static get template() {
        return html`
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
                <template is="dom-if" if="{{displayChart}}" >
                    <google-chart type="line" style="height: 500px; width: 750px;" data="{{selIncubatorLastNtempReadings}}"></google-chart>
                </template>
                <template is="dom-if" if="!{{displayChart}}" >
                    <template is="dom-repeat" items="{{NoContent}}" as="currentfield">       
                        <field-controller on-keydown="keyPressed" on-field-button-clicked="RunReport" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>                               
                </template>                   
            </div> 
        </div>
        `;
    }
    isIncubationStage(st){
        if (st.current_stage=="Incubation") return true;
        return false;
    }
    isTheCurrentStage(st){
        //console.log('current stage', st.current_stage, 'this.selIncubator.currentStage', this.selIncubator.sampleFieldToRetrieve.current_stage);
        if (st.current_stage==this.selIncubator.sampleFieldToRetrieve.current_stage) return true;
        return false;
    }
    displayStageFld(st, currFld){
        if (!currFld) return false;
        if (!currFld.field_name) return false;
        if (st.current_stage=="PlateReading"){
            if (currFld.field_name=="raw_value"){
                return true;
            }return false;
        }
        if (st.current_stage=="MicroorganismIdentification"){
            if (currFld.field_name=="microorganism_list"){
                return true;
            }return false;
        }
        if (st.current_stage=="Incubation"){
            if (currFld.field_name=='') return false;        
        }
        
        return true;
    }
    keyPressed(e){
        if(e.code.includes("Enter")) {
          this.RunReport();
          return;
        }
    }    
    RunReport(){
        var data=[];
        console.log('RunReport', 'data', data);            
        data.finalToken=this.finalToken;
        data.schemaPrefix=this.schemaPrefix;
        data.incubName=this.incubationBrowserFields[0].value;
        data.browserIncubatorFieldToRetrieve=this.browserIncubatorFieldToRetrieve;
        data.browserIncubatorFieldsToDisplay =this.browserIncubatorFieldsToDisplay;
            
        if (this.incubationBrowserFields[1].value.length>0){data.startDate=this.incubationBrowserFields[1].value;}
        if (this.incubationBrowserFields[2].value.length>0){data.endDate=this.incubationBrowserFields[2].value;}
        this.getBrowserSelectedIncubatorData(data);                
        
    }
    openTab(){
        //console.log('openTab > '+this.schemaPrefix+ '-' + this.selIncubator.currentStage);
        var procObj = {"name": this.schemaPrefix};
        var pageForStage="";
        switch (this.selIncubator.sampleFieldToRetrieve.current_stage){
        case "Sampling":
            pageForStage="sampling";
            break;
        case "Incubation":
            pageForStage="incub-batch";
            break;
        case "Incubation":
            pageForStage="incub-batch";
            break;
        case "PlateReading":
            pageForStage="plate-reading";
            break;
        case "MicroorganismIdentification":
            pageForStage="microorganism";
            break;
        default: 
            break;
        }
        store.dispatch(addTab({             
            lp_frontend_page_name: 'sample-'+pageForStage,
            tabName: this.schemaPrefix+ '-' + 'sample-'+pageForStage,
            tabLabel_en: this.schemaPrefix+ '-' + 'sample-'+pageForStage,
            tabLabel_es: this.schemaPrefix+ '-' + 'sample-'+pageForStage,
            procedure: procObj, tabEsignRequired: false, tabConfirmUserRequired: false
          }));  
        var curTab = [];           
        curTab.tabName = procObj.name + '-' + 'sample-'+pageForStage;
        curTab.currTabEsignRequired=false;
        curTab.currTabConfirmUserRequired=false;
        curTab.sops = procObj.sops;
        store.dispatch(setCurrentTab(curTab));      
    }
}
customElements.define('em-demo-a-br-incubator', emDemoABrIncubator);