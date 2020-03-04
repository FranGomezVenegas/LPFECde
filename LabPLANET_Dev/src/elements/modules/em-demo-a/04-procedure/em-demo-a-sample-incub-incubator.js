import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import '@polymer/paper-button/paper-button';
import '../../../internalComponents/cards/card-form.js';
import '../../../internalComponents/grid-components/vaadingrid-singleselect.js';
import '../01moduleFunctionality/env-monit-elements-sample.js';
import './shared-styles.js';  
import './shared-styles.js';  
import './../../../../config/styles/cards-style';
import {setSelectedIncubator} from '../02Redux/em-demo-a_actions';
import {FrontendEnvMonitSample} from '../01moduleFunctionality/frontend-env-monit-sample.js';

import {schema_name
, sampleIncubation1_sampleFieldToRetrieve, sampleIncubation1_sampleFieldToDisplay, sampleIncubation1_samplesWhereFieldsName, sampleIncubation1_samplesWhereFieldsValue, sampleIncubation1_sampleFieldToSort, sampleIncubation1_buttons
, sampleIncubation2_sampleFieldToRetrieve, sampleIncubation2_sampleFieldToDisplay, sampleIncubation2_samplesWhereFieldsName, sampleIncubation2_samplesWhereFieldsValue, sampleIncubation2_sampleFieldToSort, sampleIncubation2_buttons
, sampleCustodian_cocSampleHistoryFieldToDisplay, sampleCustodian_cocSampleHistoryWhereFieldsName, sampleCustodian_cocSampleHistoryWhereFieldsValue, sampleCustodian_cocSampleHistoryFieldToSort, sampleCustodian_cocSampleHistoryButtons
 } from '../03config/config-process.js';
    
class emDemoASampleIncubIncubator extends (FrontendEnvMonitSample(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'},   
            currTabEsignRequired: Boolean,
            currTabConfirmUserRequired: Boolean,
            selectedSample: {type: Number},                   
            cocSampleHistoryFieldToDisplay: {type: Array,value: sampleCustodian_cocSampleHistoryFieldToDisplay},   
            cocSampleHistoryWhereFieldsName: {type: String, value:sampleCustodian_cocSampleHistoryWhereFieldsName},            
            cocSampleHistoryWhereFieldsValue: {type: String, value:sampleCustodian_cocSampleHistoryWhereFieldsValue},           
            Incubation1Buttons: {type: Array, value: sampleIncubation1_buttons},
            sampleFieldToDisplayCustodian: {type: Array,value: sampleIncubation1_sampleFieldToDisplay},   
            samplesWhereFieldsNameCustodian: {type: String, value:sampleIncubation1_samplesWhereFieldsName},            
            samplesWhereFieldsValueCustodian: {type: String, value:sampleIncubation1_samplesWhereFieldsValue},           
            Incubation2Buttons: {type: Array, value: sampleIncubation2_buttons},
            sampleFieldToDisplay: {type: Array,value: sampleIncubation2_sampleFieldToDisplay},   
            samplesWhereFieldsName: {type: String, value:sampleIncubation2_samplesWhereFieldsName},            
            samplesWhereFieldsValue: {type: String, value:sampleIncubation2_samplesWhereFieldsValue},           
            buttons: {type: Array, value: sampleIncubation2_buttons},              
            incubationsList: {type: Array},          
            incubationListElement: {type: Array, value:[{
                "name": "shift",
                "label_en": "Shift", "label_es": "Turno",
                "type": "list",
                "dbType": "String",
                "value": "Admin",
                "read_only": false,
                "items" : this.incubationsList
              }]},            
            callBackRefreshWindow: Object,
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
            , sampleFieldToRetrieve:sampleIncubation2_sampleFieldToRetrieve//this.sampleFieldToRetrieve
            , samplesTabSortFields:sampleIncubation2_sampleFieldToSort//this.samplesTabSortFields,
            , samplesWhereFieldsName: this.samplesWhereFieldsName, samplesWhereFieldsValue: this.samplesWhereFieldsValue,
        });         
        this.getAllSamplesStageIncubation1({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'SAMPLES_BY_STAGE'
            , sampleFieldToRetrieve:sampleIncubation1_sampleFieldToRetrieve//this.sampleFieldToRetrieve
            , samplesTabSortFields:sampleIncubation1_sampleFieldToSort//this.samplesTabSortFields,
            , samplesWhereFieldsName: this.samplesWhereFieldsNameCustodian, samplesWhereFieldsValue: this.samplesWhereFieldsValueCustodian,
        }); 
        console.log('sample-incub-incubator > calling getAllIncubators');
        this.getAllIncubators({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix
        });        
    }         
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken;         
        if (state.emDemoA!=null){
            this.allSamplesStageIncubation1= state.emDemoA.allSamplesStageIncubation1;
            this.allSamplesStageIncubation2= state.emDemoA.allSamplesStageIncubation2;
            this.allIncubators= state.emDemoA.allIncubators;
            this.createIncubatorsList();
        }          
        if (this.tabIndex!=0){
            //this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
            this.currTabEsignRequired = state.tabs.currTabEsignRequired;
            this.currTabConfirmUserRequired = state.tabs.currTabConfirmUserRequired;            
        } 
        this.schemaPrefix=schema_name;           
    }     
    createIncubatorsList(){
        var i;
        for (i = 0; i < this.allIncubators.length; i++) {
//console.log('createProductionLotsList', 'this.productionLotsList', this.productionLotsList);
            var newElement=[{"keyName":'', "keyValue_en":'',"keyValue_es":''}];
            newElement.keyName=this.allIncubators[i].name;
            newElement.keyValue_en=this.allIncubators[i].name;
            newElement.keyValue_es=this.allIncubators[i].name;
            this.incubationsList[i]=newElement;
            //{keyName:"M1", :"M1", keyValue_es:"M1"},
        }   
        //console.log(this.productionLotsList); 
        this.set('incubform.0.items', this.rolesList);    
    }   
    selectedIncubator(e){
        console.log('selectedIncubator');
        var data=[];
        data.name='INC_1';
        store.dispatch(setSelectedIncubator(data));
    }
    static get template() {
        return html`
            <style include="cards-style"></style>
            <style include="shared-styles">            
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
                <div name="Incubation1Buttons" class="buttonGroup">
                    <template is="dom-repeat" items="{{Incubation1Buttons}}" as="currentfield">       
                        <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                        on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                        </field-controller>
                    </template>  
                </div>            
                <vaadingrid-singleselect id="Incubation1" style="width: 43%;" headerfields="{{sampleFieldToDisplayCustodian}}" rowcontainer="{{allSamplesStageIncubation1}}"            
                    selected-object="{{selectedObject}}"></vaadingrid-singleselect>

                    <div name="Incubation2Buttons" class="buttonGroup">
                    <template is="dom-repeat" items="{{Incubation2Buttons}}" as="currentfield">       
                        <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                        on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                        </field-controller>
                    </template>  
                </div>           
                <vaadingrid-singleselect id="Incubation2" style="width: 43%;" headerfields="{{sampleFieldToDisplay}}" rowcontainer="{{allSamplesStageIncubation2}}"            
                selected-object="{{selectedObject}}"></vaadingrid-singleselect>
            </div>  
            <div>
            <div>
                <div class="wrapperMySops" id="incubform">
                    <template is="dom-repeat" items="{{incubationListElement}}" as="currentfield">       
                        <field-controller on-keydown="keyPressed" on-field-list-value-changed="selectedIncubator" 
                        id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                    </template>       
                </div>
                <div>
                    hola
                </div>
                <!-- <card-form form-fields="{{incubationListElement}}" buttons="{{cardFormButtons}}" 
                on-field-button-clicked="sampleLogButtonClickedsss"
                on-dialog-button-clicked="dialogClosedpointCard"> </card-form> -->

                <paper-button name="cancel" dialog-dismiss on-click="selectedIncubator">Incubator</paper-button>
                <!-- <template is="dom-repeat" items="{{allIncubators}}">              
                    <div class="cardMySops"> 
                        <p><b>Name: </b>{{item.name}}</p>
                    </div>
                </template>
                -->
            </div>
            `;
    } 
}
customElements.define('em-demo-a-sample-incub-incubator', emDemoASampleIncubIncubator);