import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';
import {FieldsMethods} from '../../app/app-functions/fields-methods';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 

import {SampleIcons} from '../../modules/process-us/03config/config-icons';

class VaadingridSingleselectrunaction extends SampleIcons(FieldsMethods(connect(store)(PolymerElement))) {
    stateChanged(state) {
        this.selectedLanguage = state.app.user.appLanguage;        
      }       
    static get properties() {
        return {
            addSelectionColumn:{type: Boolean, value: false},
            selectedObject: {type: String, notify:true},
            actionCode: Object,
        }
    }

    static get template() {
        return html`
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
        `;
    }

    isStatus(fldName){
        return fldName=='status';
    }    
    itemSelected(e){
        console.log('itemSelected');
    }
    // itemSelected(e) {  
    //     if (e.detail.value.length==0){return;}
    //     if (e.detail.value.indexSplices==null){return;}
        
    //     this.selectedObject=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1].sample_id;
    //     this.selectedObjectLevel='SAMPLE';
    //     this.selectedRow=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1];
    //     console.log('Object selected', this.selectedObject, this.selectedObjectLevel);    
    // }  

    rowItemSelected(e) {        
        if (e.detail.value==null){this.selectedSample=null; return;}
        if (this.selectedSample==e.detail.value.sample_id){this.selectedSample=null; return;}
        //this.selectedObject=e.detail.value.sample_id;
        const item = e.detail.value;
        this.$.mygridid.selectedItems = item ? [item] : [];  
        
        //this.selectedObject=e.detail.value;
        let selectedObjectLocal = e.detail.value;
        this.selectedObject=selectedObjectLocal;
        console.log('rowItemSelected >> Object selected', this.selectedObject); 
    }            
}

customElements.define('vaadingrid-singleselectrunaction', VaadingridSingleselectrunaction);