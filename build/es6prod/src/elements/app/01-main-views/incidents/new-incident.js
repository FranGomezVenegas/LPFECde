define(["../../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../../node_modules/pwa-helpers/connect-mixin.js","../../../../store.js","../../../../config/app-config.js","../../../../config/styles/div-style.js","../../../../config/styles/img-style.js","../../../internalComponents/form-fields/field-controller.js","../../../internalComponents/grid-components/vaadingrid-singleselect.js","../../mixin/frontend-incidents.js","../../mixin/frontend-incidents-elements.js","../../mixin/api-incidents.js","../../app-functions/tabs-methods.js","../../Redux/actions/tabs_actions.js"],function(_polymerElement,_connectMixin,_store,_appConfig,_divStyle,_imgStyle,_fieldController,_vaadingridSingleselect,_frontendIncidents,_frontendIncidentsElements,_apiIncidents,_tabsMethods,_tabs_actions){"use strict";/**
 * `new-incident` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class NewIncident extends(0,_apiIncidents.ApiIncidents)((0,_frontendIncidents.FrontendIncidents)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){static get properties(){return{formFields:{type:Array,notify:!0,bubble:!0,value:_appConfig.appNewIncident_formFields},finalToken:{type:String},appOpenTabs:{type:String,observer:"onFinalTokenFilled"},userOpenIncidents:{type:String},selectedUserIncidentDetail:{type:Array},thisTabName:{type:String,value:"new-incident"},userOpenIncidentsieldToDisplay:{type:Array,value:_appConfig.incidents_userOpenIncidentsFieldToDisplay},userOpenIncidentsuttons:{type:Array,value:_appConfig.incidents_userOpenIncidentsButtons},selectedItem:{type:Object}}}stateChanged(state){this.finalToken=state.app.user.finalToken;this.userOpenIncidents=state.incidents.userOpenIncidents;this.selectedUserIncidentDetail=state.incidents.selectedUserIncidentDetail;//if (this.selectedUserIncidentDetail){
//    console.log('this.selectedUserIncidentDetail', this.selectedUserIncidentDetail);}
if(null!=state.tabs.tabs){this.appOpenTabs=state.tabs.tabs}}static get template(){return _polymerElement.html`
        <style include="div-style"></style>
        <style include="img-style"></style>
        <paper-spinner-lite alt="Authenticating user and password" width="6px" active="[[loading]]"></paper-spinner-lite>        
        <div style="display: flex;">        
            <div>
                <template is="dom-repeat" items="{{formFields}}" as="currentfield">       
                <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClickedForIncidents" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
                </template>       
            </div>
            <div style="width: 622px; display: block;">
                <frontend-incidents-elements id="myElements" call-back-function-incident-elem="{{callBackRefreshWindow}}" selected-incident="{{selectedObject}}"></frontend-incidents-elements>
                <vaadin-button on-click="callBackRefreshWindow"><iron-icon icon="refresh"></iron-icon></vaadin-button> 
                <div name="batches-list" class="buttonGroup" style="width: 222px; display: inline-flex;">
                    <template is="dom-repeat" items="{{userOpenIncidentsuttons}}" as="currentfield">       
                        <field-controller id="{{currentfield.name}}"  field="{{currentfield}}"
                        on-field-button-clicked="fieldButtonClickedForIncidents" on-field-list-value-changed="onListChange"> 
                        </field-controller>
                    </template>  
                </div>    
                <vaadingrid-singleselect class="vaadin-grid" id="mygridid" on-selected-object-changed="incidentSelected" selected-object="{{selectedObject}}"
                    headerfields="{{userOpenIncidentsieldToDisplay}}" rowcontainer="{{userOpenIncidents}}">
                </vaadingrid-singleselect>

                <div name="batches-list" class="buttonGroup" style="width: 622px; display: inline-flex;">
                </div>
            </div>
            <div>
                <p><b>{{selectedBatchLabel(selectedBatch)}}</p>                
                <template is="dom-repeat" items="{{selectedUserIncidentDetail}}" as="currentfield"> 
                    <div class="cardMySops"> 
                        {{currentfield.date}} - {{currentfield.note}} 
                    </div>
                </template>
            </div> 
        </div>
        `}keyPressed(){}incidentSelected(e){if(!e.detail.value)return;//this.selectedItem=this.$.mygridid.selectedObject;
//console.log('incidentSelected', 'this.$.mygridid.selectedObject', this.$.mygridid.selectedObject);
this.getSelectedUserIncidentDetail({finalToken:this.finalToken,incidentId:e.detail.value.id});return}callBackRefreshWindow(){this.onFinalTokenFilled()}onFinalTokenFilled(){//console.log(this.thisTabName, 'onFinalTokenFilled');
if((0,_tabsMethods.isTabOpn)(this.appOpenTabs,this.thisTabName)){this.getUserOpenIncidents({finalToken:this.finalToken})}var curTab={lp_frontend_page_name:"incidents/new-incident.js",tabName:"new-incident",tabLabel_en:"New Issue",tabLabel_es:"Nueva Incidencia",procedure:"incident",tabEsignRequired:!1,tabConfirmUserRequired:!1};_store.store.dispatch((0,_tabs_actions.setCurrentTab)(curTab));if(this.selectedItem){console.log("onFinalTokenFilled",this.selectedItem);this.selectedObject=this.selectedItem;//this.$.mygridid.selectedItems=[];
//this.$.mygridid.itemSelected=this.selectedItem;
//this.$.mygridid.selectedObject=this.selectedItem;
//this.$.mygridid.selectedItems = [this.selectedItem];
this.getSelectedUserIncidentDetail({finalToken:this.finalToken,incidentId:this.selectedItem.id})}}}customElements.define("new-incident",NewIncident)});