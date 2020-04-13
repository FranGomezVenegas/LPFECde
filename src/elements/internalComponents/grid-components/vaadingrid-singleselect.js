import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';
import {FieldsMethods} from '../../app/app-functions/fields-methods.js';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
//import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle'; 
//import '@vaadin/vaadin-grid/vaadin-grid-tree-column'; 

import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@polymer/paper-button/paper-button';

import {SampleIcons} from '../../modules/process-us/03config/config-icons';

class VaadingridSingleselect extends SampleIcons(FieldsMethods(connect(store)(PolymerElement))) {
    stateChanged(state) {
        this.selectedLanguage = state.app.user.appLanguage;        
      }         
    static get properties() {
        return {
            selectedObject: {type: Object, notify: true},
            addSelectionColumn:{type: Boolean, value: false},
            detailsOpened:{type: Boolean, value: false},detailsOpenedTwo:{type: Boolean, value: false},            
            sampleAnalysisFieldsNames:{type: Array, value:['status', 'test_id', 'analysis', 'method_name', 'method_version']},
            sampleAnalysisResultFieldsNames:{type: Array, value:['status', 'result_id', 'param_name', 'raw_value']},
        }
    }

    static get template() {
        return html`
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
                        <vaadin-grid-filter-column width="{{fld.width}}" resizable style="color: blue;" path="{{fld.name}}" header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-filter-column>
                    </template>
                    <template is="dom-if" if="{{isSort(fld)}}"> 
                        <vaadin-grid-sort-column path="{{fld.name}}" width="{{fld.width}}" resizable  header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-sort-column>
                    </template>
                    <template is="dom-if" if="{{isNormal(fld)}}"> 
                        <vaadin-grid-column path="{{fld.name}}" width="{{fld.width}}" resizable  header="{{labelValue(selectedLanguage, fld)}}"></vaadin-grid-column>
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
        `;
    }
    isStatus(fldName){
        //console.log('isStatus', 'fldName', fldName);
        return fldName=='status';
    }
    itemSelected(e) {       
console.log('itemSelected', e.detail.value);
        this.selectedObject=e.detail.value; 
        if (this.selectedObject==null){return;}
        this.$.gridLevel1.selectedObject=this.selectedObject;
        this.$.gridLevel1.selectedItems=[];
    }  
    isSort(item){
        if (item.sort) return true;
        else return false;
    }   
    isFilter(item){
        if (item.filter) return true;
        else return false;
    }  
    isNormal(item){
        if (item.sort) return false;
        if (item.filter) return false;
        return true;
    }           
}

customElements.define('vaadingrid-singleselect', VaadingridSingleselect);