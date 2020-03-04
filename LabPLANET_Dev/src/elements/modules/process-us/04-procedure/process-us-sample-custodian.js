import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';

import '../../../internalComponents/grid-components/vaadingrid-singleselect.js';
import '../01moduleFunctionality/sample-elements.js';
import './shared-styles.js';  

import {FrontendSample} from '../01moduleFunctionality/frontend-sample.js';

import {schema_name
, sampleCustodian_sampleFieldToRetrieveCustodian, sampleCustodian_sampleFieldToDisplayCustodian, sampleCustodian_samplesWhereFieldsNameCustodian, sampleCustodian_samplesWhereFieldsValueCustodian, sampleCustodian_sampleFieldToSortCustodian, sampleCustodian_buttonsCustodian
, sampleCustodian_sampleFieldToRetrieveCandidate, sampleCustodian_sampleFieldToDisplayCandidate, sampleCustodian_samplesWhereFieldsNameCandidate, sampleCustodian_samplesWhereFieldsValueCandidate, sampleCustodian_sampleFieldToSortCandidate, sampleCustodian_buttonsCandidate
, sampleCustodian_cocSampleHistoryFieldToDisplay, sampleCustodian_cocSampleHistoryWhereFieldsName, sampleCustodian_cocSampleHistoryWhereFieldsValue, sampleCustodian_cocSampleHistoryFieldToSort, sampleCustodian_cocSampleHistoryButtons
 } from '../03config/config-process.js';
    
class processUsSampleCustodian extends (FrontendSample(connect(store)(PolymerElement))) {
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
            buttonsCustodian: {type: Array, value: sampleCustodian_cocSampleHistoryButtons},
            sampleFieldToDisplayCustodian: {type: Array,value: sampleCustodian_sampleFieldToDisplayCustodian},   
            samplesWhereFieldsNameCustodian: {type: String, value:sampleCustodian_samplesWhereFieldsNameCustodian},            
            samplesWhereFieldsValueCustodian: {type: String, value:sampleCustodian_samplesWhereFieldsValueCustodian},           
            buttonsCustodian: {type: Array, value: sampleCustodian_buttonsCustodian},
            sampleFieldToDisplayCandidate: {type: Array,value: sampleCustodian_sampleFieldToDisplayCandidate},   
            samplesWhereFieldsNameCandidate: {type: String, value:sampleCustodian_samplesWhereFieldsNameCandidate},            
            samplesWhereFieldsValueCandidate: {type: String, value:sampleCustodian_samplesWhereFieldsValueCandidate},           
            buttonsCandidate: {type: Array, value: sampleCustodian_buttonsCandidate},            
        }
    }
    refreshTable() {
        this.onFinalTokenFilled();
        //this.$.mygridid.clearCache();
    }
    onFinalTokenFilled(){
        if ( (!this.finalToken) || (!this.schemaPrefix) ) {return;}
        this.getSamplesForResultsCustodian({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'SAMPLES_INPROGRESS_LIST'
            , sampleFieldToRetrieve:sampleCustodian_sampleFieldToRetrieveCustodian//this.sampleFieldToRetrieve
            , samplesTabSortFields:sampleCustodian_sampleFieldToSortCustodian//this.samplesTabSortFields,
            , samplesWhereFieldsName: this.samplesWhereFieldsNameCustodian, samplesWhereFieldsValue: this.samplesWhereFieldsValueCustodian,
        }); 
        this.getSamplesForResultsCandidate({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'SAMPLES_INPROGRESS_LIST'
            , sampleFieldToRetrieve:sampleCustodian_sampleFieldToRetrieveCandidate//this.sampleFieldToRetrieve
            , samplesTabSortFields:sampleCustodian_sampleFieldToSortCandidate//this.samplesTabSortFields,
            , samplesWhereFieldsName: this.samplesWhereFieldsNameCandidate, samplesWhereFieldsValue: this.samplesWhereFieldsValueCandidate,
        });         
                
    }         
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken;         
        if (state.processUs!=null){
            this.forResultsSamplesCustodian= state.processUs.forResultsSamplesCustodian;
            this.forResultsSamplesCandidate= state.processUs.forResultsSamplesCandidate;
        }          
        if (this.tabIndex!=0){
            //this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
            this.currTabEsignRequired = state.tabs.currTabEsignRequired;
            this.currTabConfirmUserRequired = state.tabs.currTabConfirmUserRequired;            
        } 
        this.schemaPrefix=schema_name;           
    }     
    static get template() {
        return html`
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
            <sample-elements id="myElements"></sample-elements>  
            <vaadin-button on-click="refreshTable"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
            <div style="display: flex">
                <div name="ButtonsCandidate" class="buttonGroup">
                    <template is="dom-repeat" items="{{buttonsCandidate}}" as="currentfield">       
                        <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                        on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                        </field-controller>
                    </template>  
                </div>           
                <vaadingrid-singleselect id="custodiancandidate" style="width: 43%;" headerfields="{{sampleFieldToDisplayCandidate}}" rowcontainer="{{forResultsSamplesCandidate}}"            
                selected-object="{{selectedObject}}"></vaadingrid-singleselect>

                <div name="ButtonsCustodian" class="buttonGroup">
                    <template is="dom-repeat" items="{{buttonsCustodian}}" as="currentfield">       
                        <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                        on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                        </field-controller>
                    </template>  
                </div>            
                <vaadingrid-singleselect id="custodian" style="width: 43%;" headerfields="{{sampleFieldToDisplayCustodian}}" rowcontainer="{{forResultsSamplesCustodian}}"            
                    selected-object="{{selectedObject}}"></vaadingrid-singleselect>
            </div>  
            `;
    } 


}
customElements.define('process-us-sample-custodian', processUsSampleCustodian);