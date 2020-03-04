import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';


import '../../../internalComponents/grid-components/vaadingrid-singleselectrunaction.js';


import {ApiSample} from '../01moduleFunctionality/api-sample.js';
import {FrontendSample} from '../01moduleFunctionality/frontend-sample.js';
import {receivedSamplesInSession} from '../02Redux/process-us_actions';

import {schema_name, sampleReception_sampleFieldToRetrieve, sampleReception_sampleFieldToDisplay
        ,sampleReception_sampleFieldToSort, sampleReception_samplesWhereFieldsValue,
        sampleReception_samplesWhereFieldsName} from '../03config/config-process.js';

class processUsSampleReception extends ApiSample(FrontendSample(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'}, 
            selectedSample: Number,
            unReceivedSamples: {type: Array, notify:true},
            sampleReceptionSampleFieldToDisplay: {
                type: Array, value: sampleReception_sampleFieldToDisplay
            },
            selectedObject: Object,
            actionCode: Object
        }
    }
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (state.processUs!=null){
            this.unReceivedSamples= state.processUs.unReceivedSamples;}
        this.schemaPrefix=schema_name;
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
            <vaadin-button on-click="refreshTable"><iron-icon icon="refresh"></iron-icon></vaadin-button>

            <vaadingrid-singleselectrunaction id="mygridid" headerfields="{{sampleReceptionSampleFieldToDisplay}}" 
                rowcontainer="{{unReceivedSamples}}" selected-object="{{selectedObject}}"
                on-selected-object-changed="itemSelected">
            </vaadingrid-singleselectrunaction>
        `;
    }
    
    itemSelected(e) {
//console.log('process-us-sample-reception >> itemSelected', e.detail.value);
        let selectedSampleLocal = e.detail.value.sample_id;
        this.selectedSample= selectedSampleLocal;
        var actionName="RECEIVESAMPLE";
        var paramsUrl="actionName="+actionName   +"&finalToken="+this.finalToken
            +"&sampleId="+this.selectedSample            +"&schemaPrefix="+this.schemaPrefix;
        var datas = [];
        datas.schemaPrefix=this.schemaPrefix;        datas.actionName=actionName;
        datas.selectedSample=this.selectedSample;    datas.paramsUrl=paramsUrl;
        datas.callBackFunction=this.sampleReceivedSuccess.bind(this);
        this.sampleBackEndCall(datas);
    }
    refreshTable(){this.onFinalTokenFilled();}
    sampleReceivedSuccess() {
        this.refreshTable();
        var datas = [];
        datas.receivedSample=datas.selectedSample;
        store.dispatch(receivedSamplesInSession(datas));        
    }
    onFinalTokenFilled(){
        if ( (!this.finalToken) || (!this.schemaPrefix) ) {return;}
//        console.log('process-us-sample-reception >> onFinalTokenFilled', this.finalToken, this.schemaPrefix);
        this.getUnreceivedSamples({
             finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'UNRECEIVESAMPLES_LIST'
            ,sampleFieldToRetrieve:sampleReception_sampleFieldToRetrieve
            ,whereFieldsName:sampleReception_samplesWhereFieldsName
            ,whereFieldsValue:sampleReception_samplesWhereFieldsValue
            ,sortFieldsName:sampleReception_sampleFieldToSort
          });         
          //this.actionCode = this.itemSelected.bind(this);
    } 

}
customElements.define('process-us-sample-reception', processUsSampleReception);