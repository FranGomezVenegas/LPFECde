define(["../../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../../store.js","../../../../internalComponents/form-fields/field-text.js","../../../../internalComponents/cards/card-form.js","../../../../../../node_modules/@polymer/paper-dialog/paper-dialog.js","../../../../internalComponents/grid-components/vaadingrid-multiselect.js","../../01moduleFunctionality/api-env-monit.js","../../01moduleFunctionality/env-monit-elements.js","../../01moduleFunctionality/frontend-env-monit.js","../../03config/config-process.js","../../02Redux/em-demo-a_actions.js","../../../../app/app-functions/fields-methods.js"],function(_polymerElement,_connectMixin,_store,_fieldText,_cardForm,_paperDialog,_vaadingridMultiselect,_apiEnvMonit,_envMonitElements,_frontendEnvMonit,_configProcess,_emDemoA_actions,_fieldsMethods){"use strict";//import {PolymerElement} from '@polymer/polymer/polymer-element.js';
//import {html} from '@polymer/polymer/lib/utils/html-tag.js';
//import {appLogin_formFields, appLogin_ribbonField} from '../../../../config/app-config.js';
//import {selectedProgram} from '../00jsonFake/selectedProgram.js';
class EmDemoAProgPointsMap extends(0,_fieldsMethods.FieldsMethods)((0,_apiEnvMonit.EmDemoAapiEnvMonit)((0,_frontendEnvMonit.FrontendEnvMonit)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement)))){static get properties(){return{selectedLanguage:{type:String},schemaPrefix:{type:String,value:_configProcess.schema_name},selectedPointCardForm:{type:Object},//, value:appLogin_formFields},
selectedProgram:{type:Object},selectedSamplingPoint:{type:Object},cardFormButtons:{type:Object,value:_configProcess.progProintsMapCardFormButtons},appLoginLogoOnTop:{type:String,value:"./images/app-login/labplanet.png"},appLoginFormBackground:{type:String,value:"./images/app-login/login-hexagon-background.png"},samplePointsTableHeaderFields:{type:Array,value:_configProcess.programProgPoints_samplePointsMapTableHeaderFields},//cleanRoomExample:{type:String, value:selectedProgram.map_image //'../images/clean-room-example.png'},
editMode:{type:Boolean,value:!1},callBackRefreshWindow:Object,tableTitle:{type:Object,value:{label_en:"Defined program locations",label_es:"Tabla de ubicaciones definidas para el programa"}}}}static get template(){return _polymerElement.html`
            <style>
            vaadin-button {
                top: 0;
                left: 0;
                transition: all .15s linear 0s;
                position: relative;
                display: inline-block;
                padding: 15px 25px;
                background-color: $yellow;
                
                text-transform: uppercase;
                color: $brown;
                font-family: arial;
                letter-spacing: 1px;
                
                box-shadow: -6px 6px 0 $brown;
                text-decoration: none;
                
                &:hover {
                  top: 3px;
                  left: -3px;
                  box-shadow: -3px 3px 0 $brown;
                  
                  &::after {
                    top: 1px;
                    left: -2px;
                    width: $angle-o;
                    height: $angle-o;
                  }
                  
                  &::before {
                    bottom: -2px;
                    right: 1px;
                    width: $angle-o;
                    height: $angle-o;
                  }
                } }           
                div.parentMap{
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    background-color: blue;
                }
                .programsList {
                    display: none;
                    width: 200px;
                    height: 100px;
                    margin: 1em;
                }  
                .programDefinition {
                    display: inline-block;
                    width: 1200px;
                    height: 300px;
                    margin: 1em;
                }    
                .card {
                    margin: 24px;
                    padding: 16px;
                    color: #757575;
                    border-radius: 5px;
                    background-color: #fff;
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                }  
                p.tableTitle{
                    margin-top: 0px;
                    margin-bottom: 3px;
                    color: #4285f4;
                    font-size:30px;
                }            
            </style>
            <env-monit-elements id="myElements" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements>
             <!-- {{selectedProgram.name}}
             <vaadin-button on-click="editModeToggle"  class="button" value="{{editMode}}">
                Edit
            </vaadin-button>  -->
            <div>
                <p class="tableTitle">{{labelValue(selectedLanguage, tableTitle)}} {{selectedProgram.name}}</p>
            </div>

             <div style="display:flex">
                <vaadingrid-multiselect style="width:450px;" id="mygridid" headerfields="{{samplePointsTableHeaderFields}}" 
                    rowcontainer="{{selectedProgram.sample_points}}"            
                    selected-object="{{selectedObject}}"></vaadingrid-multiselect>             
                <!-- <template is="dom-repeat" index="{{index}}" items="{{selectedProgram.sample_points}}" as="item">
                    <div class="card">                         
                            <p><b>Location Name:</b> {{item.location_name}}<p>
                            <p><b>Description:</b> {{item.description_en}}<p>
                            <p><b>Descripcion:</b> {{item.description_es}}<p>
                    </div>                                
                </template> -->
                
                <div name="programs" class="programsList"> 
                <template is="dom-repeat" index="{{index}}" items="{{selectedProgram.sample_points}}" as="currentfield">
                    <field-text on-field-list-value-changed="programSelected" 
                        name="{{currentfield.name}}" procedure="{{procedure}}" on-field-tree-list-clicked="onButtonClicked"
                        field="{{currentfield}}" value="{{currentfield}}">
                    </field-text>
                </template>             
                </div>

                <div class="parentMap"  on-click="mapClick"
                style="position: relative; overflow: hidden; text-align:center; height: 850px; width: 709px; background-image: url({{selectedProgram.map_image}});">
                    <template is="dom-repeat" items="{{selectedProgram.sample_points}}" as="currSamplePoint">
                    <div name="SP_{{currSamplePoint.name}}" id="{{{{currSamplePoint.name}}}}" title="{{currSamplePoint.description_es}}"
                    style="position: absolute; top:{{currSamplePoint.map_icon_top}}; left:{{currSamplePoint.map_icon_left}};"
                    >
                        <img on-mouseover="pointClicked" on-click="pointClicked" card-form="{{currSamplePoint.card_info}}" src="[[currSamplePoint.map_icon]]" height="[[currSamplePoint.map_icon_h]]" width="{{currSamplePoint.map_icon_w}}"> 
                    </div>                                
                    </template>                                         
                </div>
                <paper-dialog id="pointCard">
                    <card-form form-fields="{{selectedSamplingPoint}}" buttons="{{cardFormButtons}}" 
                    on-field-button-clicked="sampleLogButtonClicked"
                    on-dialog-button-clicked="dialogClosedpointCard"> </card-form>
                </paper-dialog>
            </div>
        `}itemSelected(){}mapClick(e){console.log("mapClick","click",this.source);var posicXInit=e.offsetX,posicYInit=e.offsetY;console.log("posicXInit",posicXInit,"posicYInit",posicYInit);//this.shadowRoot.getElementById(e.currentTarget.posicIndex+'content').style.zIndex=1000;                       
}/*    fieldButtonClickedTemp(e){
        console.log('fieldButtonClickedTemp', 'selectedSamplingPoint', this.selectedSamplingPoint);
        this.fieldButtonClicked(e.detail.buttonName,'tal vez', 'adios');
    }
*/ /*    fieldButtonClicked(e){
        console.log('em-demo-a-prog-points-map >> fieldButtonClicked', 'e.detail.buttonName', e.detail.buttonName, this.selectedSamplingPoint);
        switch (e.detail.buttonName){
            case 'logSample':
                var fieldsStringNames = '';
                var fieldsStringValues = '';
                fieldsStringNames=fieldsStringNames+'program_name';
                fieldsStringValues=fieldsStringValues+this.selectedSamplingPoint[0].value+'*String';
                fieldsStringNames=fieldsStringNames+'|location_name';
                fieldsStringValues=fieldsStringValues+'|'+this.selectedSamplingPoint[1].value+'*String';
                var actionName="LOGSAMPLE";
                var row = [];
                row.sampleTemplate=this.selectedProgram.sample_config_code; 
                row.sampleTemplateVersion=this.selectedProgram.sample_config_code_version;
                row.fieldName=fieldsStringNames; row.fieldValue=fieldsStringValues; row.numSamplesToLog=1;
                //row.eSignToVerify="Mala";
                var tabInfo={
                    currTabEsignRequired: this.currTabEsignRequired,
                    currTabConfirmUserRequired: this.currTabConfirmUserRequired};
        //console.log('process-us-sample-login >> onButtonClicked >> tabInfo = ', tabInfo);            
                this.EmDemoAapiEnvMonitSample(this.schemaPrefix, this.finalToken, actionName, row, tabInfo, null);                 
                return;
            default:

                return;
        }
    }
*/pointClicked(e){_store.store.dispatch((0,_emDemoA_actions.setSelectedSamplingPoint)(e.currentTarget.cardForm));//this.selectedPointCardForm=e.currentTarget.cardForm;
console.log("em-demo-a-prog-points-map >> pointClicked",this.selectedSamplingPoint);this.$.pointCard.open()}openDialog(e){console.log(e)}dialogClosedpointCard(){console.log("dialogClosedpointCard triggered in vain!")}editModeToggle(){return!editMode;console.log("editMode",editMode)}constructor(){super()}ready(){super.ready()}stateChanged(state){this.selectedLanguage=state.app.user.appLanguage;this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.selectedSamplingPoint=state.emDemoA.selectedSamplingPoint;this.selectedProgram=state.emDemoA.selectedProgram;//this.unReceivedSamples= state.processUs.unReceivedSamples;
}this.schemaPrefix=_configProcess.schema_name}}customElements.define("em-demo-a-prog-points-map",EmDemoAProgPointsMap)});