import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import '../../../internalComponents/grid-components/vaadingrid-singleselect.js';
import './shared-styles.js';  

import '../01moduleFunctionality/env-monit-elements-sample.js';
import {FrontendEnvMonitSample} from '../01moduleFunctionality/frontend-env-monit-sample.js';
import {EmDemoAapiEnvMonit} from '../01moduleFunctionality/api-env-monit.js';
import {schema_name
, samplePlateReading_sampleFieldToRetrieve, samplePlateReading_sampleFieldToDisplay, samplePlateReading_samplesWhereFieldsName
, samplePlateReading_samplesWhereFieldsValue, samplePlateReading_sampleFieldToSort 
, samplePlateReading_buttons
} from '../03config/config-process.js';
    
class emDemoASamplePlateReading extends EmDemoAapiEnvMonit(FrontendEnvMonitSample(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'},   
            currTabEsignRequired: Boolean,
            currTabConfirmUserRequired: Boolean,
            selectedSample: {type: Number},                   
            sampleFieldToDisplay: {type: Array,value: samplePlateReading_sampleFieldToDisplay},   
            samplesWhereFieldsName: {type: String, value:samplePlateReading_samplesWhereFieldsName},            
            samplesWhereFieldsValue: {type: String, value:samplePlateReading_samplesWhereFieldsValue},

            selectedObject:{type: Object, notify:true}, 

            buttons: {type: Array, value: samplePlateReading_buttons},
            addSampleAnalysis: {type: Boolean, value: true}, addSampleAnalysisFieldToRetrieve:{type: String, value: ''},
            addSampleAnalysisResult: {type: Boolean, value: true}, addSampleAnalysisResultFieldToRetrieve:{type: String, value: ''},
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
        //console.log('getAllSamplesStagePlateReading', 'samplesWhereFieldsName', this.samplesWhereFieldsName, 'samplesWhereFieldsValue', this.samplesWhereFieldsValue);
        this.getAllSamplesStagePlateReading({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'SAMPLES_BY_STAGE'
            , sampleFieldToRetrieve:samplePlateReading_sampleFieldToRetrieve//this.sampleFieldToRetrieve
            , samplesTabSortFields:samplePlateReading_sampleFieldToSort//this.samplesTabSortFields,
            , samplesWhereFieldsName: this.samplesWhereFieldsName, samplesWhereFieldsValue: this.samplesWhereFieldsValue,
            addSampleAnalysis: this.addSampleAnalysis, addSampleAnalysisFieldToRetrieve: this.addSampleAnalysisFieldToRetrieve,
            addSampleAnalysisResult: this.addSampleAnalysisResult, addSampleAnalysisResultFieldToRetrieve: this.addSampleAnalysisResultFieldToRetrieve,
        }); 
                
    }         
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken;         
        if (state.emDemoA!=null){
            this.allSamplesStagePlateReading= state.emDemoA.allSamplesStagePlateReading;
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
                display: flex
            }
            vaadin-grid {
                width:90%;
                height:560px;
            }
            </style>      
            <env-monit-elements-sample id="myElementsSample" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements-sample> 
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 

            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>            
            <vaadingrid-singleselect class="vaadin-grid" id="mygridid" headerfields="{{sampleFieldToDisplay}}" rowcontainer="{{allSamplesStagePlateReading}}"            
            selected-object="{{selectedObject}}">
            </vaadingrid-singleselect>
        `;
    }    
}
customElements.define('em-demo-a-sample-plate-reading', emDemoASamplePlateReading);