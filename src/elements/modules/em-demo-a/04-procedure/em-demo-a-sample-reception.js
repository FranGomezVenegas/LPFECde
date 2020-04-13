import {PolymerElement, html} from '@polymer/polymer/polymer-element';
//import './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
// import '@vaadin/vaadin-grid';
// import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
// import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
// import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
// import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 

import '../../../internalComponents/grid-components/vaadingrid-singleselectrunaction.js';
//import '../../internalComponents/grid-components/vaadingrid-singleselect';

import {FrontendEnvMonitSample} from '../01moduleFunctionality/frontend-env-monit-sample.js';
import {EmDemoAapiEnvMonit} from '../01moduleFunctionality/api-env-monit.js';

import {schema_name, sampleReception_sampleFieldToRetrieve, sampleReception_sampleFieldToDisplay
        ,sampleReception_sampleFieldToSort, sampleReception_samplesWhereFieldsValue,
        sampleReception_samplesWhereFieldsName} from '../03config/config-process.js';

class emDemoASampleReception extends EmDemoAapiEnvMonit(FrontendEnvMonitSample(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'}, 
            selectedSample: Number,
            allProgramsUnreceivedSamples: {type: Array, notify:true},
            sampleReceptionSampleFieldToDisplay: {
                type: Array, value: sampleReception_sampleFieldToDisplay
            },
            selectedObject: Object,
            actionCode: Object
        }
    }
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (state.emDemoA!=null){
            this.allProgramsUnreceivedSamples= state.emDemoA.allProgramsUnreceivedSamples;}
//        if (this.tabIndex!=0){
//            this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;}  
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
                rowcontainer="{{allProgramsUnreceivedSamples}}" selected-object="{{selectedObject}}"
                on-selected-object-changed="itemSelected">
            </vaadingrid-singleselectrunaction>

<!--            <vaadingrid-singleselect id="mygridid" headerfields="{{sampleReceptionSampleFieldToDisplay}}" 
                rowcontainer="{{allProgramsUnreceivedSamples}}"            
                >
            </vaadingrid-singleselect>



            <vaadin-grid id="mygridid" items="{{allProgramsUnreceivedSamples}}" on-selected-items-changed="itemSelected">  
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
                <template is="dom-repeat" items="{{sampleReceptionSampleFieldToDisplay}}" as="fld">
                    <vaadin-grid-sort-column path="{{fld}}" header="{{fld}}"></vaadin-grid-sort-column>
                </template>
            </vaadin-grid>            
-->
        `;
    }
    
    itemSelected(e) {
        let selectedSampleLocal = e.detail.value.sample_id;
        this.selectedSample= selectedSampleLocal;
        var actionName="RECEIVESAMPLE";
        var paramsUrl="actionName="+actionName +"&actionName="+actionName  +"&finalToken="+this.finalToken
            +"&sampleId="+this.selectedSample            +"&schemaPrefix="+this.schemaPrefix;
        var datas = [];
        datas.schemaPrefix=this.schemaPrefix;        datas.actionName=actionName;
        datas.actionName=actionName,
        datas.selectedSample=this.selectedSample;    datas.paramsUrl=paramsUrl;
        datas.callBackFunction=this.refreshTable.bind(this);        
        this.sampleBackEndCallAPI(datas);
    }
    refreshTable() {
        this.onFinalTokenFilled();
        //this.$.mygridid.clearCache();
    }
    onFinalTokenFilled(){
        if ( (!this.finalToken) || (!this.schemaPrefix) ) {return;}
        //console.log('em-demo-a-sample-reception >> onFinalTokenFilled', this.finalToken, 'this.schemaPrefix', this.schemaPrefix);
        this.getAllProgramsUnreceivedSamples({
             finalToken:this.finalToken, schemaPrefix:this.schemaPrefix, actionName:'UNRECEIVESAMPLES_LIST'
            ,sampleFieldToRetrieve:sampleReception_sampleFieldToRetrieve
            ,whereFieldsName:sampleReception_samplesWhereFieldsName
            ,whereFieldsValue:sampleReception_samplesWhereFieldsValue
            ,sortFieldsName:sampleReception_sampleFieldToSort
          });         
          //this.actionCode = this.itemSelected.bind(this);
    } 

}
customElements.define('em-demo-a-sample-reception', emDemoASampleReception);