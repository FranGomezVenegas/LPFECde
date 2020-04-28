import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import '@polymer/paper-button/paper-button';
import '../../../internalComponents/cards/card-form.js';
import '../../../internalComponents/grid-components/vaadingrid-singleselect.js';
import '../01moduleFunctionality/env-monit-elements-sample.js';
import './shared-styles.js';  
import './../../../../config/styles/cards-style';
import {FrontendEnvMonitSample} from '../01moduleFunctionality/frontend-env-monit-sample.js';
import './em-demo-a-batches';
import {FieldsMethods} from '../../../app/app-functions/fields-methods';
import {setCurrentTab} from './../../../app/Redux/actions/tabs_actions';

import {schema_name
, sampleIncubation1_incubBatch_sampleFieldToRetrieve, sampleIncubation1_incubBatch_sampleFieldToDisplay, sampleIncubation1_incubBatch_samplesWhereFieldsName, sampleIncubation1_incubBatch_samplesWhereFieldsValue, sampleIncubation1_incubBatch_sampleFieldToSort, sampleIncubation1_incubBatch_buttons
, sampleIncubation2_incubBatch_sampleFieldToRetrieve, sampleIncubation2_incubBatch_sampleFieldToDisplay, sampleIncubation2_incubBatch_samplesWhereFieldsName, sampleIncubation2_incubBatch_samplesWhereFieldsValue, sampleIncubation2_incubBatch_sampleFieldToSort, sampleIncubation2_incubBatch_buttons
 } from '../03config/config-process.js';
    
class emDemoASampleIncubBatch extends FieldsMethods(FrontendEnvMonitSample(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'},   
            currTabEsignRequired: Boolean,
            currTabConfirmUserRequired: Boolean,
            selectedSample: {type: Number},                   
            Incubation1Buttons: {type: Array, value: sampleIncubation1_incubBatch_buttons},
            sampleIncubation1FieldToDisplay: {type: Array,value: sampleIncubation1_incubBatch_sampleFieldToDisplay},   
            samplesIncubation1WhereFieldsName: {type: String, value:sampleIncubation1_incubBatch_samplesWhereFieldsName},            
            samplesIncubation1WhereFieldsValue: {type: String, value:sampleIncubation1_incubBatch_samplesWhereFieldsValue},           
            Incubation2Buttons: {type: Array, value: sampleIncubation2_incubBatch_buttons},
            sampleIncubation2FieldToDisplay: {type: Array,value: sampleIncubation2_incubBatch_sampleFieldToDisplay},   
            samplesWhereFieldsName: {type: String, value:sampleIncubation2_incubBatch_samplesWhereFieldsName},            
            samplesWhereFieldsValue: {type: String, value:sampleIncubation2_incubBatch_samplesWhereFieldsValue},           
            buttons: {type: Array, value: sampleIncubation2_incubBatch_buttons},  
            selectedBatch: {type: Object},
            callBackRefreshWindow: Object,
            tabsInfo: Object,
            selectedLanguage: String,
            sampleIncubation1TableTitle:{type: Object, value:{label_en:'Samples Pending 1st Incubation', label_es:'Muestras pendientes de la 1ª incubación'}},
            sampleIncubation2TableTitle:{type: Object, value:{label_en:'Samples Pending 2nd Incubation', label_es:'Muestras pendientes de la 2ª incubación'}},
        }
    }
    refreshWindow() {
        this.onFinalTokenFilled();
        //this.$.mygridid.clearCache();
    }
    onFinalTokenFilled(){  
        this.callBackRefreshWindow = this.refreshWindow.bind(this);      
        if ( (!this.finalToken) || (!this.schemaPrefix) ) {return;}
        this.getAllSamplesStageIncubation2({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'SAMPLES_BY_STAGE'
            , sampleFieldToRetrieve:sampleIncubation2_incubBatch_sampleFieldToRetrieve//this.sampleFieldToRetrieve
            , samplesTabSortFields:sampleIncubation2_incubBatch_sampleFieldToSort//this.samplesTabSortFields,
            , samplesWhereFieldsName: this.samplesWhereFieldsName, samplesWhereFieldsValue: this.samplesWhereFieldsValue,
        });         
        this.getAllSamplesStageIncubation1({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'SAMPLES_BY_STAGE'
            , sampleFieldToRetrieve:sampleIncubation1_incubBatch_sampleFieldToRetrieve//this.sampleFieldToRetrieve
            , samplesTabSortFields:sampleIncubation1_incubBatch_sampleFieldToSort//this.samplesTabSortFields,
            , samplesWhereFieldsName: this.samplesIncubation1WhereFieldsName, samplesWhereFieldsValue: this.samplesIncubation1WhereFieldsValue,
        });         
        var i;
        for (i = 0; i < this.tabsInfo.length; i++) { 
            if (this.tabsInfo[i].tabName=='em-demo-a-sample-incub-batch'){
            var curTab={
              lp_frontend_page_name: this.tabsInfo[i].lp_frontend_page_name,
              tabName: this.tabsInfo[i].tabName,
              tabLabel_en: this.tabsInfo[i].tabLabel_en, tabLabel_es: this.tabsInfo[i].tabLabel_es,
              procedure: this.tabsInfo[i].procedure, tabEsignRequired: this.tabsInfo[i].tabEsignRequired, tabConfirmUserRequired: this.tabsInfo[i].tabConfirmUserRequired
            };
            store.dispatch(setCurrentTab(curTab));   
            }           
        }
//console.log('refreshing batches');
        var elem=this.shadowRoot.getElementById('batches');
        if (elem){
            elem.refreshWindow();
        }
    }         
    stateChanged(state) {
        this.selectedLanguage = state.app.user.appLanguage; 
        this.finalToken = state.app.user.finalToken;         
        if (state.emDemoA!=null){
            this.allSamplesStageIncubation1= state.emDemoA.allSamplesStageIncubation1;
            this.allSamplesStageIncubation2= state.emDemoA.allSamplesStageIncubation2;
            this.selectedBatch=state.emDemoA.selectedBatch;
        }          
        if (this.tabIndex!=0){
            //this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
            this.currTabEsignRequired = state.tabs.currTabEsignRequired;
            this.currTabConfirmUserRequired = state.tabs.currTabConfirmUserRequired;            
        } 
        if (state.tabs.tabs){
            this.tabsInfo=state.tabs.tabs;
        }
        this.schemaPrefix=schema_name;           
    }     
//     createIncubatorsList(){
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
    static get template() {
        return html`
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
            p.tableTitle{
                margin-top: 0px;
                margin-bottom: 3px;
                color: #44cbe6;
                font-size:30px;
            }    
            </style>  
            <env-monit-elements-sample id="myElementsSample" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements-sample>  	
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
            <div style="display: flex">
                <div style="display: inline-table">
                    <p class="tableTitle">{{labelValue(selectedLanguage, sampleIncubation1TableTitle)}}</p>
                    <div name="Incubation1Buttons" style="width: 622px; display: inline-flex;" class="buttonGroup">
                        <template is="dom-repeat" items="{{Incubation1Buttons}}" as="currentfield">       
                            <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                            on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                            </field-controller>
                        </template>  
                    </div>            
                    <vaadingrid-singleselect id="Incubation1" style="width: 83%;" headerfields="{{sampleIncubation1FieldToDisplay}}" rowcontainer="{{allSamplesStageIncubation1}}"            
                    selected-object="{{selectedObject}}"></vaadingrid-singleselect>

                    <p class="tableTitle">{{labelValue(selectedLanguage, sampleIncubation2TableTitle)}}</p>
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
                    <em-demo-a-batches id="batches"></em-demo-a-batches>
                </div>                       
            </div>   
            `;
    } 

}
customElements.define('em-demo-a-sample-incub-batch', emDemoASampleIncubBatch);