define(["../../../../node_modules/@polymer/polymer/polymer-element.js","../../../../node_modules/pwa-helpers/connect-mixin.js","../../../store.js","../../../actions/counter_actions","../../../reducers/counter_reducers"],function(_polymerElement,_connectMixin,_store,_counter_actions,_counter_reducers){"use strict";_counter_reducers=babelHelpers.interopRequireDefault(_counter_reducers);_store.store.addReducers({counter:_counter_reducers.default});/**
 * `click-counter` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class ClickCounter extends(0,_connectMixin.connect)(_store.store)(_polymerElement.PolymerElement){static get properties(){return{_counter:{type:Number}}}static get template(){return _polymerElement.html`
      <style>
      h1 span {
        font-size: 50%;
      }
      </style>
      <h1>[[_counter]] <span>(en [[_clicks]] clics)</span></h1> 
      <p>
        <vaadin-button on-click="incrementar"><iron-icon icon="add"></iron-icon> Incrementar</vaadin-button>
        <vaadin-button on-click="decrementar"><iron-icon icon="remove"></iron-icon> Decrementar</vaadin-button>
      </p>
    `}stateChanged(state){//console.log('stateChanged click-counter', state);
this._counter=state.counter.value;this._clicks=state.counter.clicks}incrementar(){_store.store.dispatch((0,_counter_actions.increaseCounter)())}decrementar(){_store.store.dispatch((0,_counter_actions.decreaseCounter)())}}customElements.define("click-counter",ClickCounter)});