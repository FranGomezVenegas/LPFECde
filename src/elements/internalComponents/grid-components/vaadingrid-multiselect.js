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
import {FieldsMethods} from '../../app/app-functions/fields-methods.js';
import '../grid-components/grid-content/grid-icon';
import '@polymer/paper-icon-button/paper-icon-button';
import {SampleIcons} from '../../modules/process-us/03config/config-icons';
/**
 * `VaadingridMultiselect` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class VaadingridMultiselect extends SampleIcons(FieldsMethods(connect(store)(PolymerElement))) {
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
        `;
    }
    isStatus(fldName){
        //console.log('isStatus', 'fldName', fldName);
        return fldName=='status';
    }
    itemSelected(e) {        
        if (e.detail.value==null){this.selectedSample=null; return;}
        //if (this.selectedSample==e.detail.value.sample_id){this.selectedSample=null; return;}
        //this.selectedObject=e.detail.value.sample_id;
        //console.log('Object selected', this.selectedObject); 
        const item = e.detail.value;
        //this.$.mygridid.selectedItems = item ? [item] : [];
        this.selectedObject=e.detail.value;
        this.$.mygridid.selectedObject=this.selectedObject;        
    }     
}

customElements.define('vaadingrid-multiselect', VaadingridMultiselect);