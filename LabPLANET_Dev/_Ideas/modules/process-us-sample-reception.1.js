import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 

import { addNotification  } from '../../app/Redux/actions/notifications_actions.js';

import {getActionErrorMessage} from '../../app/methods/ajax.js';
import {ajaxSampleActionError} from '../../app/methods/ajaxResponse.js';

/**
 * `process-us-sample-reception` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */

class processUsSampleReception extends connect(store)(PolymerElement) {
    static get properties() {
        return {
            ajaxSampleActionAPIResponse: Object,
            finalToken: String,
            schemaPrefix: {
                type: String
            },   
            selectedSample: {
                type: Number,
                value: 8115
            },       
            allUnreceivedSamples: {
                type: Array//,
                //observer: 'sampleChecked'
            },   
            sampleFieldToRetrieveArr: {
                type: Array,
                value: ['sample_id', 'status', 'spec_code', 'spec_variation_name', 'sample_config_code']
              },            
            sampleFieldToRetrieve: {
                type: String,
                value: 'sample_id|status|sampling_comment|spec_code|spec_variation_name|sample_config_code'
            } ,
            currentCol: {
                type: Number, value: 0   }
        }
    }
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (this.tabIndex!=0){
            this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;}
    }        
    _ajaxAllunReceivedSamplesgetParams(schemaPrefix, actionName, finalToken) {
        return {schemaPrefix:schemaPrefix, actionName:actionName, finalToken:finalToken, sampleFieldToRetrieve:this.sampleFieldToRetrieve};
    }
    static get template() {
        return html`
            <style include="shared-styles">
            :host {
                display: block;    
                padding: 10px;
                left: 2px;
            }
            divgrid {
                length: 90%;
                width:75%;
            }
            </style>        

            <iron-ajax id="ajaxAllunReceivedSamples"
            auto
            url="http://localhost:8080/LabPLANETAPI/frontEnd/sampleAPIfrontEnd"            
            params='{{_ajaxAllunReceivedSamplesgetParams(schemaPrefix, "UNRECEIVESAMPLES_LIST", finalToken)}}'
            auto            
            handle-as="json" contentType="application/json"
            on-response="ajaxAllunReceivedSamplesResponse"
            on-error="ajaxAllunReceivedSamplesError"
            last-response="{{allUnreceivedSamples}}"
            ></iron-ajax>  

            <iron-ajax id="ajaxSampleAction"
            url="http://localhost:8080/LabPLANETAPI/moduleSample/sampleAPI"
            handle-as="json" contentType="application/json"
            on-response="ajaxSampleActionResponse"
            on-error="ajaxSampleActionError"
            last-response="{{ajaxSampleActionAPIResponse}}"
            ></iron-ajax>  

            <vaadin-button on-click="refreshTable"><iron-icon icon="refresh"></iron-icon></vaadin-button>

            <vaadin-grid id="mygridid" items="{{allUnreceivedSamples}}" on-selected-items-changed="itemSelected">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{sampleFieldToRetrieveArr}}" as="fld">
                    <vaadin-grid-sort-column path="{{fld}}" header="{{fld}}"></vaadin-grid-sort-column>
                </template>
            </vaadin-grid>            

        `;
    }
    refreshTable() {
        this.$.ajaxAllunReceivedSamples.generateRequest();
        this.$.mygridid.clearCache();
    }
    
    itemSelected(e) {
//        console.log('itemSelected', e.detail.value.indexSplices[0].object[0].sample_id);
        if (e.detail.value.length==0){return;}
        if (e.detail.value.indexSplices==null){return;}
        
        this.selectedSample=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1].sample_id;
        if (this.finalToken==null){            
            this.dispatchEvent(new CustomEvent('ajax-receive-sample-error', {
                detail: {
                    // aquí mandaría los datos de login al padre que es quien lo gestiona
                }
                }));
            return;
        }
        this.$.ajaxSampleAction.set( 
            'params', { 
              "actionName": 'RECEIVESAMPLE',
              "finalToken": this.finalToken,
              "sampleId": this.selectedSample,
              "schemaPrefix": this.schemaPrefix
               });     
        this.$.ajaxSampleAction.generateRequest();                
    }
    ajaxSampleActionResponse() {
//        console.log('ajaxSampleActionResponse', this.ajaxSampleActionAPIResponse);
        this.dispatchEvent(new CustomEvent('toast-message', {
            bubbles: true,
            composed: true,
            detail: 'Sample '+this.selectedSample+' was received '
              })); 
        store.dispatch(addNotification({
            notificationName: 'process-us-sample-reception',
            label_en: 'Sample '+this.selectedSample+' was received ', label_es: 'Sample '+this.selectedSample+' was received ',
            diagnoses: 'CORRECT'
        }));
        this.$.ajaxAllunReceivedSamples.generateRequest();   
    }    
    ajaxAllunReceivedSamplesResponse(){
        this.$.mygridid.clearCache();                                                
    }
    // ajaxSampleActionError(e) {            
    //     var msgToDisplay = getActionErrorMessage(e);
    //     console.log('calling ajaxSampleActionError')  ;
    //     ajaxSampleActionError(e,'process-us-sample-reception',this.selectedSampleTemplate);
    // }
    ajaxSampleActionError(e) {
//        console.log('ajaxSampleActionError', this.ajaxSampleActionAPIResponse);
        var msgToDisplay = getActionErrorMessage(e);
        this.dispatchEvent(new CustomEvent('toast-error', {
            bubbles: true,
            composed: true,
            detail: msgToDisplay
        })); 
        store.dispatch(addNotification({
            notificationName: 'process-us-sample-reception',
            label_en: req.message, label_es: req.message,
            new_sample:0,
            sample_template: this.selectedSampleTemplate+' v1',
            diagnoses: 'ERROR'
        }));         
        this.$.ajaxAllunReceivedSamples.generateRequest(); 
    }      
}

customElements.define('process-us-sample-reception', processUsSampleReception);