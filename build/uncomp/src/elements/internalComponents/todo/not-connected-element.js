import{PolymerElement,html}from"../../../../node_modules/@polymer/polymer/polymer-element.js";/**
 * `not-connected-element` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class NotConnectedElement extends PolymerElement{static get properties(){return{filtro:String}}static get template(){return html`
      <h3>Esto es un elemento "no conectado" al store</h3>
      <p>El filtro actual es [[filtro]]</p>
    `}}customElements.define("not-connected-element",NotConnectedElement);