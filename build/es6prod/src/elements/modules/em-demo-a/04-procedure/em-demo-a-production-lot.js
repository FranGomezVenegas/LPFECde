define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../internalComponents/grid-components/vaadingrid-singleselect.js","./shared-styles.js","../01moduleFunctionality/env-monit-elements.js","../01moduleFunctionality/frontend-env-monit.js","../01moduleFunctionality/api-env-monit.js","../03config/config-process.js"],function(_polymerElement,_connectMixin,_store,_vaadingridSingleselect,_sharedStyles,_envMonitElements,_frontendEnvMonit,_apiEnvMonit,_configProcess){"use strict";//import '../../../internalComponents/grid-components/vaadingrid-lit-singleselect.js';
class emDemoAProductionLot extends(0,_apiEnvMonit.EmDemoAapiEnvMonit)((0,_frontendEnvMonit.FrontendEnvMonit)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){static get properties(){return{callBackRefreshWindow:Object,finalToken:String,schemaPrefix:{type:String,observer:"onFinalTokenFilled"},currTabEsignRequired:Boolean,currTabConfirmUserRequired:Boolean,selectedSample:{type:Number},sampleFieldToDisplay:{type:Array,value:_configProcess.productionLot_FieldToDisplay},samplesWhereFieldsName:{type:String,value:_configProcess.productionLot_WhereFieldsName},samplesWhereFieldsValue:{type:String,value:_configProcess.productionLot_WhereFieldsValue},selectedObject:{type:Object,notify:!0},buttons:{type:Array,value:_configProcess.productionLot_buttons},activeProductionLots:{type:Array}}}refreshWindow(){this.onFinalTokenFilled();//this.$.mygridid.clearCache();
}onFinalTokenFilled(){this.callBackRefreshWindow=this.refreshWindow.bind(this);if(!this.finalToken||!this.schemaPrefix){return}this.getActiveProductionLotsList({finalToken:this.finalToken,schemaPrefix:this.schemaPrefix,actionName:"GET_ACTIVE_PRODUCTION_LOTS"})}stateChanged(state){this.finalToken=state.app.user.finalToken;if(null!=state.emDemoA){this.activeProductionLots=state.emDemoA.activeProductionLots}if(0!=this.tabIndex){//this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;
this.currTabEsignRequired=state.tabs.currTabEsignRequired;this.currTabConfirmUserRequired=state.tabs.currTabConfirmUserRequired}this.schemaPrefix=_configProcess.schema_name}static get template(){return _polymerElement.html`
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
        `}}customElements.define("em-demo-a-production-lot",emDemoAProductionLot)});