import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";import{FrontendEnvMonit}from"../01moduleFunctionality/frontend-env-monit.js";import"../01moduleFunctionality/env-monit-elements.js";import{setSelectedIncubator,setSelectedBatch}from"../02Redux/em-demo-a_actions.js";import"./shared-styles.js";import"../../../../config/styles/cards-style.js";//import '../../internalComponents/pdf-browser-viewer';
import{schema_name,sampleIncubation_incubBatch_activeBatchFieldToDisplay,sampleIncubation_incubBatch_activeBatchButtons}from"../03config/config-process.js";class emDemoABatches extends FrontendEnvMonit(connect(store)(PolymerElement)){stateChanged(state){this.finalToken=state.app.user.finalToken;this.schemaPrefix=schema_name;if(null!=state.emDemoA){this.selectedProgram=state.emDemoA.selectedProgram;this.allIncubators=state.emDemoA.allIncubators;//this.createIncubatorsList();
this.activeBatchesList=state.emDemoA.allActiveBatches}this.selectedLanguage=state.app.user.appLanguage;this.schemaPrefix=schema_name}static get properties(){return{callBackRefreshWindow:Object,finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},selectedLanguage:String,allIncubators:{type:Array},incubationListElement:{type:Array,value:[{name:"shift",label_en:"Shift",label_es:"Turno",type:"list",dbType:"String",value:"Admin",read_only:!1,items:this.allIncubators}]},activeBatchesList:{type:Array},activeBatchesFieldToDisplay:{type:Array,value:sampleIncubation_incubBatch_activeBatchFieldToDisplay},activeBatchesButtons:{type:Array,value:sampleIncubation_incubBatch_activeBatchButtons},selectedBatch:{type:Object}}}static get template(){return html`
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
            width:400px;
        }
        </style>            

        <div style="width: 522px; display: block;">
            <env-monit-elements id="myElements" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements>  
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
            <div name="batches-list" class="buttonGroup" style="width: 222px; display: inline-flex;">
                <template is="dom-repeat" items="{{activeBatchesButtons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="fieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>    
            <div name="batches-list" class="buttonGroup" style="width: 522px; display: inline-flex;">
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
}selectedIncubator(e){console.log("selectedIncubator");var data=[];data.name="INC_1";store.dispatch(setSelectedIncubator(data))}batchSelected(e){if(!e.detail.value)return;//console.log('batchSelected', 'e.detail.value', e.detail.value);
this.selectedBatch=e.detail.value;store.dispatch(setSelectedBatch(e.detail.value));return}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);console.log("em-demo-a-batches >> calling getActiveBatches within onFinalTokenFilled");this.getActiveBatches({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix});/*        if (this.selectedBatch){
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
*/}}customElements.define("em-demo-a-batches",emDemoABatches);