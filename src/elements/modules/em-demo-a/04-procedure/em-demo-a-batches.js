import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import {FrontendEnvMonit} from '../01moduleFunctionality/frontend-env-monit.js';
import {FieldsMethods} from '../../../app/app-functions/fields-methods';
import '../01moduleFunctionality/env-monit-elements.js';
import {setSelectedIncubator, setSelectedBatch} from '../02Redux/em-demo-a_actions';
import './shared-styles.js';  
import './../../../../config/styles/cards-style';

//import '../../internalComponents/pdf-browser-viewer';
import {schema_name, sampleIncubation_incubBatch_activeBatchFieldToDisplay, sampleIncubation_incubBatch_activeBatchButtons, selectedBatchEmpty
} from '../03config/config-process.js';

class emDemoABatches extends FieldsMethods(FrontendEnvMonit(connect(store)(PolymerElement))) {
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken;
        this.schemaPrefix=schema_name; 
        if (state.emDemoA!=null){
            this.selectedProgram=state.emDemoA.selectedProgram;
            this.allIncubators= state.emDemoA.allIncubators;
            //this.createIncubatorsList();
            this.activeBatchesList=state.emDemoA.allActiveBatches;            
//console.log('emDemoABatches', 'stateChanged');
//            if ( (this.selectedBatch.name!=state.emDemoA.selectedBatch.name) || (this.selectedBatch.NUM_SAMPLES!=state.emDemoA.selectedBatch.NUM_SAMPLES)) {
            
            //if ( (this.selectedBatch) && (state.emDemoA.selectedBatch) && (this.selectedBatch!=state.emDemoA.selectedBatch) ) {
                    this.selectedBatch=state.emDemoA.selectedBatch;       
                //this.selectBatchWhenActiveBatchChanges();
            //}
        }   
        this.selectedLanguage = state.app.user.appLanguage;      
        this.schemaPrefix=schema_name;
    }        
    static get properties() {
        return {
            callBackRefreshWindow: Object,
            finalToken: String,
            schemaPrefix: {type: String, observer:'onFinalTokenFilled'},   
            selectedLanguage: String,
            allIncubators: {type: Array},          
            incubationListElement: {type: Array, value:[{
                "name": "shift",
                "label_en": "Shift", "label_es": "Turno",
                "type": "list",
                "dbType": "String",
                "value": "Admin",
                "read_only": false,
                "items" : this.allIncubators
              }]}, 
            activeBatchesList: {type: Array, observer:'selectBatchWhenActiveBatchChanges'},   
            activeBatchesFieldToDisplay: {type: Array,value: sampleIncubation_incubBatch_activeBatchFieldToDisplay},
            activeBatchesButtons: {type: Array, value: sampleIncubation_incubBatch_activeBatchButtons},
            selectedBatch: {type: Object},
            selectedBatchEmpty: {type: Object, value:selectedBatchEmpty},
            tableTitle:{type: Object, value:{label_en:'Active Batches', label_es:'Tandas Activas'}},
        }
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
        vaadingrid-singleselect.incubgrid {
            width:500px;
        }
        p.tableTitle{
            margin-top: 0px;
            margin-bottom: 3px;
            color: #4285f4;
            font-size:30px;
        }
        </style>            
        <div style="width: 622px; display: block;">
            <p class="tableTitle">{{labelValue(selectedLanguage, tableTitle)}}</p>
            <env-monit-elements id="myElements" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements>  
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
            <div name="batches-list" class="buttonGroup" style="width: 222px; display: inline-flex;">
                <template is="dom-repeat" items="{{activeBatchesButtons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>    
            <div name="batches-list" class="buttonGroup" style="width: 622px; display: inline-flex;">
                <vaadingrid-singleselect id="incubbatches" class="incubgrid" on-selected-object-changed="batchSelected" headerfields="{{activeBatchesFieldToDisplay}}" rowcontainer="{{activeBatchesList}}"            
                selected-object="{{selectedObject}}"></vaadingrid-activeBatchesBingleselect>
            </div>
        </div>
        <div>
            <template is="dom-if" if="{{!selectedBatch.name}}">
                <p style="color:blue;">{{labelValue(selectedLanguage, selectedBatchEmpty)}}</p>
            </template> 
            <template is="dom-if" if="{{selectedBatch.name}}">
                <p style="color:blue;"><b>{{selectedBatchLabel(selectedBatch)}}</p>                
                <template is="dom-repeat" items="{{selectedBatch.SAMPLES_ARRAY}}" as="currentfield"> 
                    <div class="cardMySops"> 
                        {{currentfield.sample_id}} Incubation {{currentfield.incubation_moment}}
                    </div>
                </template>
            </template>
        </div>
        `;
    }
    selectedBatchLabel(selectedBatch){
        var selIncub=selectedBatch.incubation_incubator;
        if (selIncub==""){
            if (this.selectedLanguage=="es") selIncub="Por favor selecciona incubadora!";
            else selIncub="Please select incubator!";
        }
        if (this.selectedLanguage=="es"){
            return "La tanda seleccionada es: " +selectedBatch.name + ". Incubadora: "+selIncub+". Núm. Muestras: "+selectedBatch.NUM_SAMPLES;}
        return "The selected batch is: " +selectedBatch.name+ ". Incubator: "+selIncub+ ". #Samples: "+selectedBatch.NUM_SAMPLES;
    }
    refreshWindow() {
        //console.log('refreshWindow');
        this.onFinalTokenFilled();
        //this.$.mygridid.clearCache();
    }
    selectBatchWhenActiveBatchChanges(){
        console.log('selectBatchWhenActiveBatchChanges', 'this.selectedBatch', this.selectedBatch);
        //store.dispatch(setSelectedIncubator(this.selectedBatch));
        // var currentBatch=this.selectedBatch;
        if (this.selectedBatch){
            var i, len;
            for (i = 0, len = this.activeBatchesList.length; i < len; i++) { 
                if (this.activeBatchesList[i].name==this.selectedBatch.name){
                    var mye={detail:{value:this.activeBatchesList[i]}};
                    this.batchSelected(mye);
                    return;
                }
            }
        }
    }
    selectedIncubator(e){
        //console.log('selectedIncubator');
        var data=[];
        //data.name='INC_1';
        store.dispatch(setSelectedIncubator(data));
    }
    batchSelected(e) {
        console.log('batchSelected', e);
        if (!e.detail.value){ 
            var noBatch=[];
            store.dispatch(setSelectedBatch(noBatch));
            return;        
        }
        //console.log('batchSelected', 'e.detail.value', e.detail.value);
        this.selectedBatch=e.detail.value;
        store.dispatch(setSelectedBatch(e.detail.value));
        return;
    }
    onFinalTokenFilled(){
        //this.callBackRefreshWindow = this.refreshWindow.bind(this);
        //console.log('em-demo-a-batches >> calling getActiveBatches within onFinalTokenFilled');
        this.getActiveBatches({
            finalToken:this.finalToken, schemaPrefix:this.schemaPrefix
        });    
        //var mye={detail:{value:''}};
        //this.batchSelected(mye);
/*        if (this.selectedBatch){
            var selBatchName=this.selectedBatch.name;
            if (selBatchName){
                var i;
                for (i = 0; i < this.activeBatchesList.length; i++) {     
                    if (selBatchName==this.activeBatchesList[i].name){
                        store.dispatch(setSelectedBatch(this.activeBatchesList[i]));
                        return;
                    }

                }            
            }
        }
*/        
    }
}
customElements.define('em-demo-a-batches', emDemoABatches);