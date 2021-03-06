import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../../store.js';
import '@polymer/polymer/lib/elements/dom-if';
import '../../../../../config/styles/cards-style.js';
import {addTab, setCurrentTab} from '../../../../app/Redux/actions/tabs_actions';
import {FrontendEnvMonitSample} from '../../01moduleFunctionality/frontend-env-monit-sample';
//import '../../internalComponents/pdf-browser-viewer';
import {tableFieldLabel} from '../../03config/tablefield_labels';
import '../../01moduleFunctionality/env-monit-elements.js';
import {schema_name, browserBatchFieldToRetrieve, browserBatchFieldsToDisplay, browserBatchNoContent } from '../../03config/config-process.js';

class emDemoABrBatch extends tableFieldLabel(FrontendEnvMonitSample(connect(store)(PolymerElement))) {
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (state.emDemoA!=null){            
            if (state.emDemoA.browserSelectedBatch!=null){
                this.selBatch=state.emDemoA.browserSelectedBatch;
                if (this.selBatch.lastTemperatureReadings!=null){
                    var i;
                    this.selBatchTempReadings=[["Time", "Temperature"]];
                    if (!this.selBatch.lastTemperatureReadings){
                        this.displayChart=false;
                        return;}
                    if (this.selBatch.lastTemperatureReadings[0].error){
                        this.displayChart=false;
                        return;}
                    this.displayChart=true;
                    for (i = 0; i < this.selBatch.lastTemperatureReadings.length; i++) {
                        if (!this.selBatch.lastTemperatureReadings[i].error){
                            this.selBatchTempReadings.push([this.selBatch.lastTemperatureReadings[i].created_on, 
                            this.selBatch.lastTemperatureReadings[i].temperature]);
                        }
                    }
                    this.selectedObject=this.selBatch.batchFieldToRetrieve.name;
                }                
            }                      
        }        
        this.schemaPrefix=schema_name;
        this.selectedLanguage=state.app.user.appLanguage;
    }        
    static get properties() {
        return {
            displayChart: Boolean,
            finalToken: {type: String},  
            schemaPrefix: {type: String},   
            selectedLanguage: String,
            selBatchTempReadings:{type: Array},
            selBatchName:{type: Number, value: 'Tanda4'},
            selBatch:{type: Object},
            browserBatchFieldToRetrieve:{type: String, value: browserBatchFieldToRetrieve},
            browserBatchFieldsToDisplay:{type: String, value: browserBatchFieldsToDisplay},
            goToStageButton:{type: Array, Object, notify: true, value:
                {
                    "name": "buttonAccess",
                    "label_en": "Go", "label_es": "Ir",
                    "type": "button",              
                    "value": "",
                    "read_only": false
                  }
            },
            browserBatchFields:{type: Array, notify: true, value:[
                {
                    "name": "BatchName",
                    "label_en": "Batch", "label_es": "Tanda",
                    "type": "text",
                    "password": "false",
                    "value": "Tanda4",
                    "read_only": false
                  },    
              
                {
                    "name": "RunReport",
                    "label_en": "Report", "label_es": "Informe",
                    "type": "button",              
                    "value": "",
                    "read_only": false
                }]
            },
            tableFieldLabelSchemaName: {type: String, value: 'data'}, tableFieldLabelTableName: {type: String, value: 'Batch'},
            NoContent: {type: Array, notify: true, value:browserBatchNoContent},
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

        `;
    }
//     displayChart(e){
//         console.log('displayChart');
// //        return false;
// //console.log('displayChart', this.selBatchTempReadings.length); 
//         if (!this.selBatchTempReadings) return false;       
//         if (this.selBatchTempReadings.length<=1) return false;
//         return true;
//     }
    isIncubationStage(st){
        if (st.current_stage=="Incubation") return true;
        return false;
    }
    isTheCurrentStage(st){
        //console.log('current stage', st.current_stage, 'this.selBatch.currentStage', this.selBatch.sampleFieldToRetrieve.current_stage);
        if (st.current_stage==this.selBatch.sampleFieldToRetrieve.current_stage) return true;
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
        data.finalToken=this.finalToken;
        data.schemaPrefix=this.schemaPrefix;
        data.BatchName=this.browserBatchFields[0].value;
        data.browserBatchFieldToRetrieve=this.browserBatchFieldToRetrieve;
        data.browserBatchFieldsToDisplay =this.browserBatchFieldsToDisplay;
        this.getBrowserSelectedBatchData(data);                
        //console.log('RunReport', 'browserBatchFields', this.browserBatchFields);
    }
    openTab(){
        //console.log('openTab > '+this.schemaPrefix+ '-' + this.selBatch.currentStage);
        var procObj = {"name": this.schemaPrefix};
        var pageForStage="";
        switch (this.selBatch.sampleFieldToRetrieve.current_stage){
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
customElements.define('em-demo-a-br-batch', emDemoABrBatch);