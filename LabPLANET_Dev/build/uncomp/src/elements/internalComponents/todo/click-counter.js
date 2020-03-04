import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";import{connect}from"../../../../node_modules/pwa-helpers/connect-mixin.js";import{store}from"../../../store.js";import{increaseCounter,decreaseCounter}from"../../../actions/counter_actions";import counterReducer from"../../../reducers/counter_reducers";store.addReducers({counter:counterReducer});/**
 * `click-counter` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class ClickCounter extends connect(store)(PolymerElement){static get properties(){return{_counter:{type:Number}}}static get template(){return html`
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
this._counter=state.counter.value;this._clicks=state.counter.clicks}incrementar(){store.dispatch(increaseCounter())}decrementar(){store.dispatch(decreaseCounter())}}customElements.define("click-counter",ClickCounter);