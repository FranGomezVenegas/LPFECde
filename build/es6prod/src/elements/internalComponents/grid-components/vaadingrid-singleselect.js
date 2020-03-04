define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../app/app-functions/fields-methods.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js","../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js","../../../../node_modules/@vaadin/vaadin-checkbox/vaadin-checkbox.js","../../../../node_modules/@polymer/paper-button/paper-button.js","../../modules/process-us/03config/config-icons.js"],function(_polymerElement,_connectMixin,_store,_fieldsMethods,_vaadinGrid,_vaadinGridSelectionColumn,_vaadinGridSortColumn,_vaadinGridFilter,_vaadinCheckbox,_paperButton,_configIcons){"use strict";//import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle'; 
//import '@vaadin/vaadin-grid/vaadin-grid-tree-column'; 
class VaadingridSingleselect extends(0,_configIcons.SampleIcons)((0,_fieldsMethods.FieldsMethods)((0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement))){stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{selectedObject:{type:String,notify:!0},addSelectionColumn:{type:Boolean,value:!1},detailsOpened:{type:Boolean,value:!1},detailsOpenedTwo:{type:Boolean,value:!1},sampleAnalysisFieldsNames:{type:Array,value:["status","test_id","analysis","method_name","method_version"]},sampleAnalysisResultFieldsNames:{type:Array,value:["status","result_id","param_name","raw_value"]}}}static get template(){return _polymerElement.html`
        <style>        
            vaadin-grid{
                    height: 360px;
                    width: 95%;
                    color: blue;
                    background-image: url('./images/hexagon-white-blue-light.jpg');
                    background-repeat: no-repeat;
                    background-size: cover;                  
                }
        </style>

        <vaadin-grid id="gridLevel1" items="{{rowcontainer}}" on-active-item-changed="itemSelected"
        selected-object="{{selectedObject}}" theme="column-borders" column-reordering-allowed multi-sort>  
            <!-- <template is="dom-if" if="{{addSelectionColumn}}"> -->
                <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
            <!-- </template> -->
            <template name="sampleAnalysis" class="row-details">
                <div class="details">
                    <vaadin-grid id="gridLevel2" name="sampleAnalysisGrid" items="[[item.sample_analysis]]" active-item="{{activeItem}}">
                        
                        <template name="sampleAnalysisResult" class="row-details">
                            <div class="details">
                                <vaadin-grid id="gridLevel3" name="sampleAnalysisGrid" items="[[item.sample_analysis_result]]" active-item="{{activeItem}}">
                                    <template is="dom-repeat" items="{{sampleAnalysisResultFieldsNames}}" as="fldLevel3">                      
                                        <template is="dom-if" if="{{isStatus(fldLevel3)}}">          
                                            <vaadin-grid-column style="width: 30px;">
                                                <template style="width: 51px;" class="header">{{labelValue(selectedLanguage, fldLevel3)}}</template>
                                                <template>
                                                    <img style="height:24px; width: 24px;" src="{{getSampleAnalysisResultStatusIcon(item.status)}}"> 
                                                    <!--"./images/app-login/LabPLANET.png"> -->
                                                </template>
                                            </vaadin-grid-column>
                                        </template>                    
                                        <template is="dom-if" if="{{!isStatus(fldLevel3)}}"> 
                                            <vaadin-grid-column path="{{fldLevel3}}" header="{{fldLevel3}}" editing="false"></vaadin-grid-column> -->
                                        </template>  
                                    </template>  
                                </vaadin-grid>                                      
                            </div> 
                        </template>                   
                        <template is="dom-repeat" items="{{sampleAnalysisFieldsNames}}" as="fldLevel2">   
                            <template is="dom-if" if="{{isStatus(fldLevel2)}}">          
                                <vaadin-grid-column style="width: 30px;">
                                    <template style="width: 51px;" class="header">{{labelValue(selectedLanguage, fldLevel2)}}</template>
                                    <template>
                                        <vaadin-checkbox aria-label$="Ver Detalle" unchecked checked="{{detailsOpened}}">
                                            <img style="height:24px; width: 24px;" src="{{getSampleAnalysisStatusIcon(item.status)}}"> 
                                        </vaadin-checkbox>
                                    </template>
                                </vaadin-grid-column>
                            </template>                    
                            <template is="dom-if" if="{{!isStatus(fldLevel2)}}"> 
                                <vaadin-grid-column path="{{fldLevel2}}" header="{{fldLevel2}}" editing="false"></vaadin-grid-column> -->
                            </template>  
                        </template>  
                    </vaadin-grid>  
                </div> 
            </template>

            <template is="dom-repeat" items="{{headerfields}}" as="fld">
                <template is="dom-if" if="{{isStatus(fld.name)}}">          
                    <vaadin-grid-column style="width: 30px;">
                        <template style="width: 51px;" class="header">{{labelValue(selectedLanguage, fld)}}</template>
                        <template>
                            <vaadin-checkbox aria-label$="Ver Detalle" unchecked checked="{{detailsOpened}}">
                                <img style="height:24px; width: 12px;" src="{{getSampleStatusIcon(item.status)}}"> 
                            </vaadin-checkbox>
                        </template>
                    </vaadin-grid-column>
                </template>                    
                <template is="dom-if" if="{{!isStatus(fld.name)}}">
                    <template is="dom-if" if="{{fld.filter}}"> 
                        <vaadin-grid-filter-column width="{{fld.width}}" resizable style="color: blue;" path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-filter-column>
                    </template>
                    <template is="dom-if" if="{{fld.sort}}"> 
                        <vaadin-grid-sort-column path="{{fld.name}}" resizable  header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-sort-column>
                    </template>
                </template>                   
            </template>
        </vaadin-grid>  
    
    
    <!--    <vaadin-grid id="gridLevel1" items="{{rowcontainer}}" on-selected-items-changed="itemSelected" 
            selected-object="{{selectedObject}}">  
            
        <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
        <template is="dom-repeat" items="{{headerfields}}" as="fld">
            <vaadin-grid-sort-column path="{{fld}}" header="{{fld}}"></vaadin-grid-sort-column>
        </template>
        </vaadin-grid>       
-->        
        `}isStatus(fldName){//console.log('isStatus', 'fldName', fldName);
return"status"==fldName}// itemSelected(e) {  
//     if (e.detail.value.length==0){return;}
//     if (e.detail.value.indexSplices==null){return;}
//     this.selectedObject=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1].sample_id;
//     this.selectedObjectLevel='SAMPLE';
//     this.selectedRow=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1];
//     console.log('Object selected', this.selectedObject, this.selectedObjectLevel);    
// }  
itemSelected(e){this.selectedObject=e.detail.value;this.$.gridLevel1.selectedObject=this.selectedObject;if(null==this.selectedObject){return}//console.log('vaadingrid-singleselect >> itemSelected', this.selectedObject);
if(null==e.detail.value){this.selectedSample=null;return}//if (this.selectedSample==e.detail.value.sample_id){this.selectedSample=null; return;}
//this.selectedObject=e.detail.value.sample_id;         
const item=e.detail.value;this.$.gridLevel1.selectedItems=item?[item]:[];this.selectedObject=item;this.$.gridLevel1.selectedObject=item;// this.dispatchEvent(new CustomEvent('field-list-value-changed', {
//     bubbles: true,
//     composed: true,
//     detail: {
//       'name': this.field.name,
//       'value_no_index': newValNoIndex,
//       'value': this.selectedObject,
//       'index': newValInt, //index,
//       //'thisindex': this.field.index
//     }
//   }));
}}customElements.define("vaadingrid-singleselect",VaadingridSingleselect)});