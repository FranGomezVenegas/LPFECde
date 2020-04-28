import { LitElement, html, css } from 'lit-element';
import { store } from './../../../../../store';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { appProcedureListFake } from '../../03config/fakejson';
class ProceduresList  extends connect(store)(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <p>${appProcedureListFake.map(item => html`
      ${item.name}
      <field-controller id="${item.name}" .field=${item} @field-list-value-changed=${this.onListChange}></field-controller>`)}</p>
    `;
  }

  stateChanged(state) {      
  }
  onListChange(e){
    var selProcedure=e.detail.value;
    selProcedure=selProcedure.replace('__','');
    console.log('onListChange', e.detail.value, selProcedure);
  }
}

customElements.define('procedures-list', ProceduresList);