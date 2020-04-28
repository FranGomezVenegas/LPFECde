import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../store.js";import{FieldsMethods}from"../../app/app-functions/fields-methods.js";import"../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid.js";import"../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js";import"../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js";import"../../../../node_modules/@vaadin/vaadin-grid/vaadin-grid-filter.js";//import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle'; 
//import '@vaadin/vaadin-grid/vaadin-grid-tree-column'; 
import"../../../../node_modules/@vaadin/vaadin-checkbox/vaadin-checkbox.js";import"../../../../node_modules/@polymer/paper-button/paper-button.js";import{SampleIcons}from"../../modules/process-us/03config/config-icons.js";class VaadingridSingleselect extends SampleIcons(FieldsMethods(connect(store)(PolymerElement))){stateChanged(state){this.selectedLanguage=state.app.user.appLanguage}static get properties(){return{selectedObject:{type:Object,notify:!0},addSelectionColumn:{type:Boolean,value:!1},detailsOpened:{type:Boolean,value:!1},detailsOpenedTwo:{type:Boolean,value:!1},sampleAnalysisFieldsNames:{type:Array,value:["status","test_id","analysis","method_name","method_version"]},sampleAnalysisResultFieldsNames:{type:Array,value:["status","result_id","param_name","raw_value"]}}}static get template(){return html`
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
        selected-object="{{selectedObject}}"  column-reordering-allowed multi-sort>  
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
                    <template is="dom-if" if="{{isFilter(fld)}}"> 
                        <vaadin-grid-filter-column min-width="{{fld.min_width}}" width="{{fld.width}}" resizable style="color: blue;" path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-filter-column>
                    </template>
                    <template is="dom-if" if="{{isSort(fld)}}"> 
                        <vaadin-grid-sort-column path="{{fld.name}}" min-width="{{fld.min_width}}" width="{{fld.width}}" resizable  header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-sort-column>
                    </template>
                    <template is="dom-if" if="{{isNormal(fld)}}"> 
                        <vaadin-grid-column path="{{fld.name}}" min-width="{{fld.min_width}}" width="{{fld.width}}" resizable  header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-column>
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
        `}changeItemSelected(itemToSelect){console.log("changeItemSelected");////this.selectedObject=itemToSelect;
////this.$.gridLevel1.selectedItems=[];
this.$.gridLevel1.selectItem(itemToSelect);//this.$.gridLevel1.selectedItems = itemToSelect ? [itemToSelect] : [];
}isStatus(fldName){//console.log('isStatus', 'fldName', fldName);
return"status"==fldName}itemSelected(e){//console.log('itemSelected', e.detail.value);
this.selectedObject=e.detail.value;if(null==this.selectedObject){return}this.$.gridLevel1.selectedObject=this.selectedObject;this.$.gridLevel1.selectedItems=[]}isSort(item){if(item.sort)return!0;else return!1}isFilter(item){if(item.filter)return!0;else return!1}isNormal(item){if(item.sort)return!1;if(item.filter)return!1;return!0}}customElements.define("vaadingrid-singleselect",VaadingridSingleselect);