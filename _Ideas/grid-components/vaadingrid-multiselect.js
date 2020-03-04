import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter'; 
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'; 
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import {FieldsMethods} from '../form-fields/fields-methods.js';
import '../grid-components/grid-content/grid-icon';
import '@polymer/paper-icon-button/paper-icon-button';
/**
 * `VaadingridMultiselect` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class VaadingridMultiselect extends FieldsMethods(connect(store)(PolymerElement)) {
  stateChanged(state) {
    this.selectedLanguage = state.app.user.appLanguage;        
  }       
    static get properties() {
        return {
            selectedObject: {type: String, notify:true},
            source:{type: String, value:'./images/HexagonBright.jpg'}
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

      
             <!-- <grid-icon>       </grid-icon>    -->
              
        <vaadin-grid id="mygridid" items="{{rowcontainer}}" on-selected-items-changed="itemSelected" 
            selected-object="{{selectedObject}}">  
            
            <vaadin-grid-selection-column  auto-select></vaadin-grid-selection-column>
       
            <template is="dom-repeat" items="{{headerfields}}" as="fld">     
                <!-- <template is="dom-if" if="{{!fld.is_icon}}">    labelValue(selectedLanguage, fld) -->
                    <template>
                        <vaadin-grid-sort-column path="{{fld.name}}" header="{{fld.is_icon}}"></vaadin-grid-sort-column>
                    </template>          
                <!-- </template>                  -->
                <!-- <template is="dom-if" if="{{fld.is_icon}}">  
                    <vaadin-grid-column>
                        <template class="header">{{labelValue(selectedLanguage, fld)}}</template>
                            <template>
                                <img width="[[item.map_icon_w]]" height="[[item.map_icon_h]]" src="[[item.map_icon]]">
                            </template>
                        </template>   
                    </vaadin-grid-column>
                </template> -->

 
            </template> 
        </vaadin-grid>       
        `;
    }
    myicon(e){
        console.log(e.detail.index);
        return this.source;
    }
    itemSelected(e) {  
        if (e.detail.value.length==0){return;}
        if (e.detail.value.indexSplices==null){return;}
        
        this.selectedObject=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1].sample_id;
        this.selectedObjectLevel='SAMPLE';
        this.selectedRow=e.detail.value.indexSplices[0].object[e.detail.value.indexSplices[0].object.length-1];
        console.log('Object selected', this.selectedObject, this.selectedObjectLevel);    
    }  
}

customElements.define('vaadingrid-multiselect', VaadingridMultiselect);