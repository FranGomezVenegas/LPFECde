import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';
/**
 * `connected-element` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ConnectedElement extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      _todos: Array
    }
  }

  static get template() {
    return html`
      <h3>IDs encontrados de Todos</h3>
      <template is="dom-repeat" items="[[_todos]]">
      [[item.id]], 
      </template>
    `;
  }

  stateChanged(state) {
    console.log('stateChanged conneted element', state);
    this._todos = state.todoApp.todos;
  }


}

customElements.define('connected-element', ConnectedElement);