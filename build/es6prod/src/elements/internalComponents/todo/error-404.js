define(["../../../../node_modules/@polymer/polymer/polymer-element.js"],function(_polymerElement){"use strict";/**
 * `error-404` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */class Error404 extends _polymerElement.PolymerElement{static get properties(){return{}}static get template(){return _polymerElement.html`
      <vaadin-item>
      <iron-icon icon="icons:error"></iron-icon>
      <span>
        Página no encontrada
      </span>
      <vaadin-item>
    `}/**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */constructor(){super()}/**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */ready(){super.ready()}}customElements.define("error-404",Error404)});