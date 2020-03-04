import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../store.js';
import {appNewIncident_formFields} from '../../../../config/app-config.js';
import './../../../../config/styles/div-style.js';
import './../../../../config/styles/img-style.js'; 
import '../../../internalComponents/form-fields/field-controller';
import {FrontendIncidents} from '../../mixin/frontend-incidents.js';
import {ApiIncidents} from '../../mixin/api-incidents';
/**
 * `new-incident` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class NewIncident extends ApiIncidents(FrontendIncidents(connect(store)(PolymerElement))) {
    static get properties() {
        return {
            formFields: {type: Array, notify: true, bubble: true, value: appNewIncident_formFields},
            finalToken: {type: String},
        }
    }
    stateChanged(state) {
        this.finalToken = state.app.user.finalToken; 
        //this.allMySops = state.SOPS.userAllSop;
        //console.log('my-sops', 'this.allMySops', this.allMySops);
    }    

    static get template() {
        return html`
        <style include="div-style"></style>
        <style include="img-style"></style>
        <paper-spinner-lite alt="Authenticating user and password" width="6px" active="[[loading]]"></paper-spinner-lite>
        
        <template is="dom-repeat" items="{{formFields}}" as="currentfield">       
          <field-controller on-keydown="keyPressed" on-field-button-clicked="fieldButtonClickedForIncidents" on-field-list-value-changed="onListChange" id="{{currentfield.name}}"  field="{{currentfield}}"></field-controller>
        </template>       

        `;
    }
    keyPressed(){}

}

customElements.define('new-incident', NewIncident);