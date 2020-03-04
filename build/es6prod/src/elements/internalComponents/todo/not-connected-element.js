define(["../../../../node_modules/@polymer/polymer/polymer-element.js"],function(_polymerElement){"use strict";/**
 * `not-connected-element` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class NotConnectedElement extends _polymerElement.PolymerElement{static get properties(){return{filtro:String}}static get template(){return _polymerElement.html`
      <h3>Esto es un elemento "no conectado" al store</h3>
      <p>El filtro actual es [[filtro]]</p>
    `}}customElements.define("not-connected-element",NotConnectedElement)});