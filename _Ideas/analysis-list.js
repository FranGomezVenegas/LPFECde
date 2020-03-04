import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

class AnalysisList extends connect(store)(PolymerElement) {
    static get properties() {
        return {
            actionName: String
        }
    }
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        if (this.tabIndex!=0){
            this.schemaPrefix = state.tabs.tabs[this.tabIndex-1].procedure.schemaPrefix;}
    }      
    _ajaxAnalysisListgetParams(schemaPrefix, finalToken) {
        console.log('_ajaxAnalysisListgetParams', this.schemaPrefix);
    }

    static get template() {
        return html`
            <iron-ajax id="ajaxGetSamplesInProgressList"            
            url="http://localhost:8080/LabPLANETAPI/frontEnd/sampleAPIfrontEnd"  
                      
            params='{{_ajaxAnalysisListgetParams(schemaPrefix, finalToken)}}'            
            handle-as="json" contentType="application/json"
            last-response="{{allUnreceivedSamples}}"
            ></iron-ajax>  
            {{schemaPrefix}}
        `;
    }

}

customElements.define('analysis-list', AnalysisList);