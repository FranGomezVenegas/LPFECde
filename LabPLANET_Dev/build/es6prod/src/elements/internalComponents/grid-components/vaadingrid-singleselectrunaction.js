define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../app/app-functions/fields-methods.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js","../../modules/process-us/03config/config-icons.js"],function(_polymerElement,_connectMixin,_store,_fieldsMethods,_vaadinGrid,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinGridFilterColumn,_configIcons){"use strict";class VaadingridSingleselectrunaction extends(0,_configIcons.SampleIcons)((0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{addSelectionColumn:{type:Boolean,value:!1},selectedObject:{type:String,notify:!0},actionCode:Object}}static get template(){return _polymerElement.html`
        <style>
            vaadin-grid{
                height: 360px;
                width: 95%;
            }
        </style>

        <vaadin-grid id="mygridid" items="{{rowcontainer}}" 
        on-active-item-changed="rowItemSelected"
        selected-object="{{selectedObject}}"> 

            <template is="dom-if" if="{{addSelectionColumn}}">
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
            </template>                                


            <template is="dom-repeat" items="{{headerfields}}" as="fld">  

                <template is="dom-if" if="{{isStatus(fld.name)}}">          
                    <vaadin-grid-column style="width: 30px;">
                        <template style="width: 51px;" class="header">{{labelValue(selectedLanguage, fld)}}</template>
                        <template>
                            <img style="height:24px; width: 24px;" src="{{getSampleStatusIcon(item.status)}}"> 
                            <!--"./images/app-login/LabPLANET.png"> -->
                        </template>
                    </vaadin-grid-column>
                </template>               

                <template is="dom-if" if="{{!isStatus(fld.name)}}">          
                    <template is="dom-if" if="{{fld.filter}}"> 
                        <vaadin-grid-filter-column path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-filter-column>
                    </template>
                    <template is="dom-if" if="{{fld.sort}}"> 
                        <vaadin-grid-sort-column path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-sort-column>
                    </template>
                </template>
    <!--                    <template is="dom-if" if="{{fld.sort}}{{fld.filter}}"> 
                    <vaadin-grid-column path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-column>
                </template>                    
    -->                    
            </template>
        </vaadin-grid>  
        `}isStatus(fldName){return"status"==fldName}itemSelected(e){console.log("itemSelected")}// itemSelected(e) {  
//     if (e.detail.value.length==0){return;}
//     if (e.detail.value.indexSplices==null){return;}
//     this.selectedObject=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1].sample_id;
//     this.selectedObjectLevel='SAMPLE';
//     this.selectedRow=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1];
//     console.log('Object selected', this.selectedObject, this.selectedObjectLevel);    
// }  
rowItemSelected(e){if(null==e.detail.value){this.selectedSample=null;return}if(this.selectedSample==e.detail.value.sample_id){this.selectedSample=null;return}//this.selectedObject=e.detail.value.sample_id;
const item=e.detail.value;this.$.mygridid.selectedItems=item?[item]:[];//this.selectedObject=e.detail.value;
let selectedObjectLocal=e.detail.value;this.selectedObject=selectedObjectLocal;console.log("rowItemSelected >> Object selected",this.selectedObject)}}customElements.define("vaadingrid-singleselectrunaction",VaadingridSingleselectrunaction)});