define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js"],function(_polymerElement,_connectMixin,_store){"use strict";/**
 * `connected-element` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class ConnectedElement extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){static get properties(){return{_todos:Array}}static get template(){return _polymerElement.html`
      <h3>IDs encontrados de Todos</h3>
      <template is="dom-repeat" items="[[_todos]]">
      [[item.id]], 
      </template>
    `}stateChanged(state){console.log("stateChanged conneted element",state);this._todos=state.todoApp.todos}}customElements.define("connected-element",ConnectedElement)});