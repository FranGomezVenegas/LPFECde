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

import {schema_name
, sampleIncubation1_incubBatch_sampleFieldToRetrieve, sampleIncubation1_incubBatch_sampleFieldToDisplay, sampleIncubation1_incubBatch_samplesWhereFieldsName, sampleIncubation1_incubBatch_samplesWhereFieldsValue, sampleIncubation1_incubBatch_sampleFieldToSort, sampleIncubation1_incubBatch_buttons
, sampleIncubation2_incubBatch_sampleFieldToRetrieve, sampleIncubation2_incubBatch_sampleFieldToDisplay, sampleIncubation2_incubBatch_samplesWhereFieldsName, sampleIncubation2_incubBatch_samplesWhereFieldsValue, sampleIncubation2_incubBatch_sampleFieldToSort, sampleIncubation2_incubBatch_buttons
 } from '../03config/config-process.js';
    
class emDemoASampleIncubBatch extends (FrontendEnvMonitSample(connect(store)(PolymerElement))) {
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

    }         
    stateChanged(state) {
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
            `;
    } 

}
customElements.define('em-demo-a-sample-incub-batch', emDemoASampleIncubBatch);