import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";//import '../../../internalComponents/grid-components/vaadingrid-lit-singleselect.js';
import"../../../internalComponents/grid-components/vaadingrid-singleselect.js";import"./shared-styles.js";import"../01moduleFunctionality/env-monit-elements.js";import{FrontendEnvMonit}from"../01moduleFunctionality/frontend-env-monit.js";import{EmDemoAapiEnvMonit}from"../01moduleFunctionality/api-env-monit.js";import{schema_name,productionLot_FieldToRetrieve,productionLot_FieldToDisplay,productionLot_WhereFieldsName,productionLot_WhereFieldsValue,productionLot_FieldToSort,productionLot_buttons}from"../03config/config-process.js";class emDemoAProductionLot extends EmDemoAapiEnvMonit(FrontendEnvMonit(connect(store)(PolymerElement))){static get properties(){return{callBackRefreshWindow:Object,finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},currTabEsignRequired:Boolean,currTabConfirmUserRequired:Boolean,selectedSample:{type:Number},sampleFieldToDisplay:{type:Array,value:productionLot_FieldToDisplay},samplesWhereFieldsName:{type:String,value:productionLot_WhereFieldsName},samplesWhereFieldsValue:{type:String,value:productionLot_WhereFieldsValue},selectedObject:{type:Object,notify:!0},buttons:{type:Array,value:productionLot_buttons},activeProductionLots:{type:Array}}}refreshWindow(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);if(!this.finalToken||!this.schemaPrefix){return}this.getActiveProductionLotsList({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"GET_ACTIVE_PRODUCTION_LOTS"})}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.activeProductionLots=state.emDemoA.activeProductionLots}if(0!=this.tabIndex){//this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
this.currTabEsignRequired=state.tabs.currTabEsignRequired;this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired}this.schemaPrefix=schema_name}static get template(){return html`
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
            <env-monit-elements id="myElements" call-back-function-env-monit-elem="{{callBackRefreshWindow}}"></env-monit-elements>
            <vaadin-button on-click="refreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 

            <div name="Buttons1" class="buttonGroup">
                <template is="dom-repeat" items="{{buttons}}" as="currentfield">       
                    <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                    on-field-button-clicked="prodLotFieldButtonClicked" on-field-list-value-changed="onListChange"> 
                    </field-controller>
                </template>  
            </div>            
            <vaadingrid-singleselect class="vaadin-grid" id="mygridid" headerfields="{{sampleFieldToDisplay}}" rowcontainer="{{activeProductionLots}}"            
            selected-object="{{selectedObject}}" actionname="{{actionName}}">
            </vaadingrid-singleselect>
        `}}customElements.define("em-demo-a-production-lot",emDemoAProductionLot);