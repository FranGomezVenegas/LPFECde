define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../01moduleFunctionality/frontend-env-monit.js","../01moduleFunctionality/env-monit-elements.js","../02Redux/em-demo-a_actions.js","./shared-styles.js","../../../../config/styles/cards-style.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_frontendEnvMonit,_envMonitElements,_emDemoA_actions,_sharedStyles,_cardsStyle,_configProcess){"use strict";//import '../../internalComponents/pdf-browser-viewer';
class emDemoABatches extends(0,_frontendEnvMonit.FrontendEnvMonit)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)){stateChanged(state){this.finalToken=state.app.user.finalToken;this.schemaPrefix=_configProcess.schema_name;if(null!=state.emDemoA){this.selectedProgram=state.emDemoA.selectedProgram;this.allIncubators=state.emDemoA.allIncubators;//this.createIncubatorsList();
this.activeBatchesList=state.emDemoA.allActiveBatches}this.selectedLanguage=state.app.user.appLanguage;this.schemaPrefix=_configProcess.schema_name}static get properties(){return{callBackRefreshWindow:Object,finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedLanguage:String,allIncubators:{type:Array},incubationListElement:{type:Array,value:[{name:"shift",label_en:"Shift",label_es:"Turno",type:"list",dbType:"String",value:"Admin",read_only:!1,items:this.allIncubators}]},activeBatchesList:{type:Array},activeBatchesFieldToDisplay:{type:Array,value:_configProcess.sampleIncubation_incubBatch_activeBatchFieldToDisplay},activeBatchesButtons:{type:Array,value:_configProcess.sampleIncubation_incubBatch_activeBatchButtons},selectedBatch:{type:Object}}}static get template(){return _polymerElement.html`
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
        </style>            

        <div style="width: 622px; display: block;">
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
            <p><b>{{selectedBatchLabel(selectedBatch)}}</p>                
            <template is="dom-repeat" items="{{selectedBatch.SAMPLES_ARRAY}}" as="currentfield"> 
                <div class="cardMySops"> 
                    {{currentfield.sample_id}} Incubation {{currentfield.incubation_moment}}
                </div>
            </template>
        </div>
        `}selectedBatchLabel(selectedBatch){var selIncub=selectedBatch.incubation_incubator;if(""==selIncub){if("es"==this.selectedLanguage)selIncub="Por favor selecciona incubadora!";else selIncub="Please select incubator!"}if("es"==this.selectedLanguage){return"La tanda seleccionada es: "+selectedBatch.name+". Incubadora: "+selIncub+". N\xFAm. Muestras: "+selectedBatch.NUM_SAMPLES}return"The selected batch is: "+selectedBatch.name+". Incubator: "+selIncub+". #Samples: "+selectedBatch.NUM_SAMPLES}refreshWindow(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}selectedIncubator(e){//console.log('selectedIncubator');
var data=[];data.name="INC_1";_store.store.dispatch((0,_emDemoA_actions.setSelectedIncubator)(data))}batchSelected(e){if(!e.detail.value)return;//console.log('batchSelected', 'e.detail.value', e.detail.value);
this.selectedBatch=e.detail.value;_store.store.dispatch((0,_emDemoA_actions.setSelectedBatch)(e.detail.value));return}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);//console.log('em-demo-a-batches >> calling getActiveBatches within onFinalTokenFilled');
this.getActiveBatches({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix});/*        if (this.selectedBatch){
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
*/}}customElements.define("em-demo-a-batches",emDemoABatches)});