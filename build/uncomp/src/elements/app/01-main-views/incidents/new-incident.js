import{PolymerElement,html}from"../../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../../store.js";import{appNewIncident_formFields}from"../../../../config/app-config.js";import"../../../../config/styles/div-style.js";import"../../../../config/styles/img-style.js";import"../../../internalComponents/form-fields/field-controller.js";import"../../../internalComponents/grid-components/vaadingrid-singleselect.js";import{FrontendIncidents}from"../../mixin/frontend-incidents.js";import"../../mixin/frontend-incidents-elements.js";import{ApiIncidents}from"../../mixin/api-incidents.js";import{isTabOpn}from"../../app-functions/tabs-methods.js";import{incidents_userOpenIncidentsFieldToDisplay,incidents_userOpenIncidentsButtons}from"../../../../config/app-config.js";import{setCurrentTab}from"../../Redux/actions/tabs_actions.js";/**
 * `new-incident` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class NewIncident extends ApiIncidents(FrontendIncidents(connect(store)(PolymerElement))){static get properties(){return{formFields:{type:Array,notify:!0,bubble:!0,value:appNewIncident_formFields},finalToken:{type:String},appOpenTabs:{type:String,observer:"onFinalTokenFilled"},userOpenIncidents:{type:String},selectedUserIncidentDetail:{type:Array},thisTabName:{type:String,value:"new-incident"},userOpenIncidentsieldToDisplay:{type:Array,value:incidents_userOpenIncidentsFieldToDisplay},userOpenIncidentsuttons:{type:Array,value:incidents_userOpenIncidentsButtons},selectedItem:{type:Object}}}stateChanged(state){this.finalToken=state.app.user.finalToken;this.userOpenIncidents=state.incidents.userOpenIncidents;this.selectedUserIncidentDetail=state.incidents.selectedUserIncidentDetail;//if (this.selectedUserIncidentDetail){
//    console.log('this.selectedUserIncidentDetail', this.selectedUserIncidentDetail);}
if(null!=state.tabs.tabs){this.appOpenTabs=state.tabs.tabs}}static get template(){return html`
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
                <frontend-incidents-elements id="myElements" call-back-function-incident-elem="{{onFinalTokenFilled}}" selected-incident="{{selectedObject}}"></frontend-incidents-elements>
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
        `}keyPressed(){}incidentSelected(e){console.log("incidentSelected","this.selectedItem",this.selectedItem);//if (!this.selectedItem) return;                        
if(!e||!e.detail||!e.detail.value){this.getSelectedUserIncidentDetail({finalToken:this.finalToken,incidentId:""});return}//if (!e.detail) { this.getSelectedUserIncidentDetail({finalToken: this.finalToken, incidentId: ''}); return;}
//if (!e.detail.value) { this.getSelectedUserIncidentDetail({finalToken: this.finalToken, incidentId: ''}); return;}
this.selectedItem=e.detail.value;//this.getSelectedUserIncidentDetail({finalToken: this.finalToken, incidentId: e.detail.value.id});
this.getSelectedUserIncidentDetail({finalToken:this.finalToken,incidentId:this.selectedItem.id});return}callBackRefreshWindow(){this.onFinalTokenFilled()}onFinalTokenFilled(){console.log("onFinalTokenFilled",this.thisTabName);if(!this.thisTabName){return}if(isTabOpn(this.appOpenTabs,this.thisTabName)){this.getUserOpenIncidents({finalToken:this.finalToken})}// var curTab={
//     lp_frontend_page_name: 'incidents/new-incident.js',        
//     tabName: 'new-incident',
//     tabLabel_en: 'New Issue',
//     tabLabel_es: 'Nueva Incidencia',
//     procedure:'incident',
//     tabEsignRequired: false, tabConfirmUserRequired: false
//   }
//store.dispatch(setCurrentTab(curTab)); 
if(this.selectedItem){//     //console.log('onFinalTokenFilled', 'item', this.selectedItem, 'object'this.selectedObject);
//     //this.selectedObject=this.selectedItem;
//     //this.$.mygridid.selectedItems=[];
//     //this.$.mygridid.itemSelected=this.selectedItem;
//     var mye={detail:{value:this.selectedItem}};            
//     this.$.mygridid.changeItemSelected(this.selectedItem.value.id);
//     //this.$.mygridid.changeItemSelected(this.selectedItem);
//     //this.$.mygridid.selectedObject=this.selectedItem;
//     //this.$.mygridid.selectedItems = [this.selectedItem];
//    this.getSelectedUserIncidentDetail({finalToken: this.finalToken, incidentId: this.selectedItem.id});
this.incidentSelected()}}}customElements.define("new-incident",NewIncident);