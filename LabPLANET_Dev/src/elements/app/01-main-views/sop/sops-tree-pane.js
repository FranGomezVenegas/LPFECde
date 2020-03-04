import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store';

import '@polymer/iron-selector/iron-selector';
import '@polymer/iron-collapse/iron-collapse';
import '@polymer/paper-badge/paper-badge';

import {FrontendSopUser} from '../../mixin/frontend-sopuser';
import {addTab, closeTab, setCurrentTab} from '../../Redux/actions/tabs_actions';

class SopsTreePane extends FrontendSopUser(connect(store)(PolymerElement)) {
    static get properties() {
        return {
            horizontal: {type: Boolean},
            openedSOPs: {type: Boolean, value: false, reflectToAttribute: true},
            noAnimation: {type: Boolean},       
            SOPList: Object,
            finalToken: {type: String, observer: 'onFinalTokenFilled'},                     
        }
    }
    stateChanged(state) {        
        this.finalToken = state.app.user.finalToken; 
    }   
    toggleSOP() {
        this.$.SOP.toggle();
    }    
    _getTextSOP(openedSOPs) {
        return openedSOPs ? 'SOPs (Cerrar)' : 'SOPs (Abrir)';
    }
    ajaxAppSopPaneParams(finalToken) {
        return {finalToken: finalToken};        
    }    
    crearTab(e) {
        e.stopPropagation();
        store.dispatch(addTab({
            lp_frontend_page_name: e.detail.procEvent.lp_frontend_page_name,
            tabName: e.detail.procedure.name+'-'+e.detail.procEvent.lp_frontend_page_name,
            tabLabel_en: e.detail.procedure.label_en+'-'+e.detail.procEvent.label_en,
            tabLabel_es: e.detail.procedure.label_es+'-'+e.detail.procEvent.label_es,
            procedure: e.detail.procedure, tabEsignRequired: false, tabConfirmUserRequired: false
        }));
        var curTab = [];
        curTab.tabName = e.detail.procedure.name+'-'+e.detail.procEvent.lp_frontend_page_name;
        store.dispatch(setCurrentTab(curTab));        
    }
    static get template() {
        return html`
            <vaadin-button id="triggerSOP" hidden="{{openedSOPs}}" on-click="toggleSOP" aria-expanded\$="[[openedSOPs]]" aria-controls="collapse">[[_getTextSOP(openedSOPs)]]</vaadin-button>
            <vaadin-button id="triggerSOP" hidden="{{!openedSOPs}}" on-click="toggleSOP" aria-expanded\$="[[openedSOPs]]" aria-controls="collapse">[[_getTextSOP(openedSOPs)]]</vaadin-button>
            <iron-collapse id="SOP" opened="{{openedSOPs}}" horizontal="[[horizontal]]" no-animation="[[noAnimation]]" tabindex="1">
                <template is="dom-repeat" items="{{SOPList}}" as="currsop">                      
                    <template is="dom-repeat"  items="{{currsop.definition}}" as="currentfield">                    
                        <field-controller id="{{currentfield.name}}" on-field-tree-list-clicked="crearTab" tab-index="{{index}}" field="{{currentfield}}" procedure="{{currsop}}"></field-controller>                                    
                    </template>            
                </template> 
            </iron-collapse>

        `;
    }
    onFinalTokenFilled(){
        //console.log('onFinalTokenFilled', this.finalToken);
        this.getSopPane({
            finalToken:this.finalToken
          });            
    }    
}
customElements.define('sops-tree-pane', SopsTreePane);