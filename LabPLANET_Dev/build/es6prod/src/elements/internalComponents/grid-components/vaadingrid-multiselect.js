define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-column.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js","../../../../node_modules/@vaadin/vaadin-button/vaadin-button.js","../../../../node_modules/@vaadin/vaadin-checkbox/vaadin-checkbox.js","../../app/app-functions/fields-methods.js","./grid-content/grid-icon.js","../../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js","../../modules/process-us/03config/config-icons.js"],function(_polymerElement,_connectMixin,_store,_vaadinGrid,_vaadinGridColumn,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinGridFilterColumn,_vaadinButton,_vaadinCheckbox,_fieldsMethods,_gridIcon,_paperIconButton,_configIcons){"use strict";/**
 * `VaadingridMultiselect` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class VaadingridMultiselect extends(0,_configIcons.SampleIcons)((0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{selectedObject:{type:String,notify:!0},source:{type:String,value:"./images/HexagonBright.jpg"}}}static get template(){return _polymerElement.html`
        <style>
            vaadin-grid{
                height: 360px;
                width: 95%;
            }
        </style>  
        <vaadin-grid id="mygridid" items="{{rowcontainer}}" on-selected-items-changed="itemSelected" 
            selected-object="{{selectedObject}}">  
            
            <template is="dom-if" if="addSelectionColumn">
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
            </template>
            
            <template is="dom-repeat" items="{{headerfields}}" as="fld">
                <template is="dom-if" if="{{isStatus(fld.name)}}">          
                    <vaadin-grid-column style="width: 30px;">
                        <template style="width: 51px;" class="header">{{labelValue(selectedLanguage, fld)}}</template>
                        <template>
                            <!-- <vaadin-checkbox aria-label$="Ver Detalle" unchecked checked="{{detailsOpened}}"> -->
                                <img style="height:24px; width: 24px;" src="{{getSampleAnalysisStatusIcon(item.status)}}"> 
                            <!-- </vaadin-checkbox> -->
                        </template>
                    </vaadin-grid-column>
                </template>                    
                <template is="dom-if" if="{{!isStatus(fld.name)}}">
                    <template is="dom-if" if="{{fld.filter}}"> 
                        <vaadin-grid-filter-column style="color: blue;" path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-filter-column>
                    </template>
                    <template is="dom-if" if="{{fld.sort}}"> 
                        <vaadin-grid-sort-column path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-sort-column>
                    </template>
                </template>                   
            </template>       
        </vaadin-grid>       
        `}isStatus(fldName){//console.log('isStatus', 'fldName', fldName);
return"status"==fldName}itemSelected(e){if(null==e.detail.value){this.selectedSample=null;return}//if (this.selectedSample==e.detail.value.sample_id){this.selectedSample=null; return;}
//this.selectedObject=e.detail.value.sample_id;
//console.log('Object selected', this.selectedObject); 
const item=e.detail.value;//this.$.mygridid.selectedItems = item ? [item] : [];
this.selectedObject=e.detail.value;this.$.mygridid.selectedObject=this.selectedObject}}customElements.define("vaadingrid-multiselect",VaadingridMultiselect)});