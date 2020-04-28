import { LitElement, html, css } from 'lit-element';
import { store } from '../../../../store';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { appProcedureListFake } from '../03config/fakejson';
import '../../../internalComponents/form-fields/field-controller';
import './components/procedures-list';
class ProcedureManagement  extends connect(store)(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      apiProceduresList: {type: Array},
    };
  }
  firstUpdated(){
    
  }
  constructor() {
    super();
    this.apiProceduresList= appProcedureListFake;
  }
  render() {
    return html`
    <div>
      <procedures-list></procedures-list>
    </div>    
    `;
  }

  stateChanged(state) {    
  }
}

customElements.define('procedure-management', ProcedureManagement);