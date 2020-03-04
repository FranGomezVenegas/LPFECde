import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';

import '../../../internalComponents/grid-components/vaadingrid-multiselect.js';

import {FrontendSample} from '../01moduleFunctionality/frontend-sample.js';
import {schema_name, sampleRevision_sampleFieldToRetrieve, sampleRevision_sampleFieldToDisplay, sampleRevision_sampleFieldToSort
    , sampleRevision_sampleWhereFieldsName, sampleRevision_sampleWhereFieldsValue, sampleRevision_buttons} 
    from '../03config/config-process.js';


class processUsSampleRevision extends (FrontendSample(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            selectedObjectLevel: {type:String, value:'SAMPLE'},
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'}, 
            selectedObject: {type: Number},    
            selectedRow: Object,   
            forRevisionSamples: {type: Array},
            samplesTabFieldsArr: {type: Array,value: sampleRevision_sampleFieldToDisplay},                   
            samplesTabFields: {type: String,value: sampleRevision_sampleFieldToRetrieve},
            samplesTabSortFields: {type: String,value: sampleRevision_sampleFieldToSort},
            samplesWhereFieldsName: {type: String, value:sampleRevision_sampleWhereFieldsName},            
            samplesWhereFieldsValue: {type: String, value:sampleRevision_sampleWhereFieldsValue},
            buttons: {type: Array, value: sampleRevision_buttons},
                // notify: true,                bubble: true,                
        }
    }  
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (state.processUs!=null){
            this.forRevisionSamples= state.processUs.forRevisionSamples;}        
        this.schemaPrefix = schema_name;          
    }  
    refreshTable() {
        this.onFinalTokenFilled();
        this.$.mygridid.clearCache();
    }
    onFinalTokenFilled(){
        //console.log('process-us-sample-login >> onFinalTokenFilled', this.finalToken, this.schemaPrefix);
        if ( (!this.finalToken) || (!this.schemaPrefix) ) {return;}
        this.getSamplesForRevision({
             finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'SAMPLES_INPROGRESS_LIST'
            ,sampleFieldToRetrieve:sampleRevision_sampleFieldToRetrieve, samplesWhereFieldsName: this.samplesWhereFieldsName, 
            samplesWhereFieldsValue: this.samplesWhereFieldsValue, samplesTabSortFields:this.samplesTabSortFields
          });  
            
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
            </style>        
             
            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                </template>  
            </div>

            <vaadin-button on-click="refreshTable"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
            <vaadingrid-multiselect id="mygridid" headerfields="{{samplesTabFieldsArr}}" rowcontainer="{{forRevisionSamples}}"            
            selected-object="{{selectedObject}}"></vaadingrid-multiselect>
        `;
    }
}
customElements.define('process-us-sample-revision', processUsSampleRevision);